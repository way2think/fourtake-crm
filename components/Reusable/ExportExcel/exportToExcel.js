import { writeFile, utils, write } from 'xlsx';

export const exportToExcel = (data, columns, fileName = 'data.xlsx') => {
    const filteredData = data.map((row) => {
        const filteredRow = {};
        columns.forEach((col) => {
            filteredRow[col] = row[col];
        });
        return filteredRow;
    });
    const ws = utils.json_to_sheet(filteredData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    writeFile(wb, fileName);
};
