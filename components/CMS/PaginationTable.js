'use client';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './paginationTable.css';

import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';
import IconPencil from '@/components/icon/icon-pencil';
import IconTrashLines from '@/components/icon/icon-trash-lines';

export default function PaginationTable({ data }) {
    //columns & data -props
    const [page, setPage] = useState(1);
    const recordsPerPage = 10; // Customize as needed

    // Calculate the start and end index for the current page
    const startIndex = (page - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    return (
        <div className="datatables">
            <DataTable
                withTableBorder
                borderRadius="sm"
                withColumnBorders
                striped
                className="table-hover whitespace-nowrap"
                highlightOnHover
                records={paginatedData}
                columns={[
                    {
                        accessor: 'id',
                        // Custom title
                        title: 'SNo',
                        // Right-align column
                        textAlign: 'left',
                    },
                    { accessor: 'name' },
                    { accessor: 'action', title: 'Actions' },
                ]}
                // Execute this callback when a row is clicked
                onRowClick={({ record: { name } }) =>
                    showNotification({
                        title: `Clicked on ${name}`,
                        message: `You clicked on ${name} `,
                        withBorder: true,
                    })
                }
                // Pagination properties
                totalRecords={data.length}
                recordsPerPage={recordsPerPage}
                page={page}
                onPageChange={setPage}
            />
        </div>
    );
}
