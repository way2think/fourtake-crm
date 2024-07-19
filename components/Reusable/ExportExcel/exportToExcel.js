import { writeFile, utils, write } from 'xlsx';

export const exportToExcel = (data, columns, fileName = 'data.xlsx') => {
    const flattenedData = data.map((row) => ({
        ...row,
        ...(row?.country && { country: row.country.name }), // Flatten 'country.name' from 'country' object
    }));

    const filteredData = flattenedData.map((row) => {
        const filteredRow = {};
        columns.forEach((col) => {
            if (Array.isArray(row[col])) {
                // If the column value is an array, stringify it
                filteredRow[col] = row[col].join(', ');
            } else {
                filteredRow[col] = row[col];
            }
        });
        return filteredRow;
    });
    const ws = utils.json_to_sheet(filteredData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    writeFile(wb, fileName);
};
