'use client';
import React, { useState } from 'react';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './paginationTable.css';

import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';
import { ActionIcon, Box, Group, Table } from '@mantine/core';
import IconEye from '../../icon/icon-eye';
import IconEdit from '../../icon/icon-edit';
import IconTrash from '../../icon/icon-trash';
import IconCaretsDown from '../../icon/icon-carets-down';
import IconCaretDown from '../../icon/icon-caret-down';

interface PaginationExpandProps {
    data: any;
    tableColumns: any;
    handleEdit?: (row: any) => void;
    handleDelete?: (row: any) => void;
    title?: string;
    getSubData?: any; // Function to fetch sub-table data
}

const PaginationExpand: React.FC<PaginationExpandProps> = ({ data, tableColumns, handleEdit, handleDelete, title, getSubData }) => {
    const PAGE_SIZES = [10, 15, 20];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
    const [page, setPage] = useState(1);
    const recordsPerPage = pageSize;

    // Calculate the start and end index for the current page
    const startIndex = (page - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginatedData = data?.slice(startIndex, endIndex);

    const [expandedRows, setExpandedRows] = useState<any>([]);

    const toggleRow = (id: number) => {
        setExpandedRows((prevExpandedRows: any) => (prevExpandedRows.includes(id) ? prevExpandedRows.filter((rowId: any) => rowId !== id) : [...prevExpandedRows, id]));
    };

    return (
        <div className="datatables bg-[#]">
            <DataTable
                backgroundColor="#fff"
                shadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                withTableBorder
                borderRadius="sm"
                withColumnBorders
                striped
                className="table-hover whitespace-nowrap"
                highlightOnHover
                records={paginatedData}
                columns={[
                    // {
                    //     accessor: 'expander',
                    //     title: '',
                    //     render: (row) => (
                    //         <ActionIcon size="sm" onClick={() => toggleRow(row.id)}>
                    //             {expandedRows.includes(row.id) ? <IconArrowBackward size={16} /> : <IconArrowForward size={16} />}
                    //         </ActionIcon>
                    //     ),
                    // },
                    ...tableColumns,
                    {
                        accessor: 'actions',
                        title: <Box mr={6}>Actions</Box>,
                        textAlign: 'right',
                        render: (row: any) => (
                            <Group gap={4} justify="right" wrap="nowrap">
                                <ActionIcon size="sm" onClick={() => toggleRow(row?.id)}>
                                    {expandedRows.includes(row?.id) ? <IconCaretDown className="-rotate-0 rtl:rotate-0" size={16} /> : <IconCaretDown className="-rotate-90 rtl:rotate-90" size={16} />}
                                </ActionIcon>
                                <ActionIcon size="sm" variant="subtle" color="blue" onClick={() => handleEdit && handleEdit(row)}>
                                    <IconEdit size={16} />
                                </ActionIcon>
                                {title !== 'dashboard' && (
                                    <ActionIcon size="sm" variant="subtle" color="red" onClick={() => handleDelete && handleDelete(row)}>
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                )}
                            </Group>
                        ),
                    },
                ]}
                totalRecords={data?.length}
                paginationActiveBackgroundColor="grape"
                recordsPerPage={pageSize}
                recordsPerPageOptions={PAGE_SIZES}
                onRecordsPerPageChange={setPageSize}
                page={page}
                onPageChange={setPage}
                rowExpansion={{
                    isExpanded: (row: any) => expandedRows.includes(row.id),
                    content: ({ record }) => {
                        return (
                            <div>
                                <Table>
                                    <tbody>
                                        {getSubData?.map((subRow: any, index: number) => (
                                            <tr key={index}>
                                                {tableColumns.map((column: any, colIndex: number) => (
                                                    <td className="p-2" key={colIndex}>
                                                        {subRow[column.accessor]}
                                                    </td>
                                                ))}

                                                <Group gap={1} className="mt-2 flex items-center justify-center">
                                                    <ActionIcon size="sm" variant="subtle" color="blue" onClick={() => handleEdit && handleEdit(subRow)}>
                                                        <IconEdit size={16} />
                                                    </ActionIcon>
                                                    {title !== 'dashboard' && (
                                                        <ActionIcon size="sm" variant="subtle" color="red" onClick={() => handleDelete && handleDelete(subRow)}>
                                                            <IconTrash size={16} />
                                                        </ActionIcon>
                                                    )}
                                                </Group>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        );
                    },
                }}
            />
        </div>
    );
};

export default PaginationExpand;
