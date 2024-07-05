'use client';

import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './paginationTable.css';

import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';
import { ActionIcon, Box, Group } from '@mantine/core';
import IconPencil from '@/components/icon/icon-pencil';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import IconEye from '../../icon/icon-eye';
import IconEdit from '../../icon/icon-edit';
import IconTrash from '../../icon/icon-trash';

interface PaginationTableProps {
    data: any[];
    tableColumns: any[];
    handleEdit?: (row: any) => void;
    handleDelete?: (row: any) => void;
    title?: string;
    ReuseActionModalShow?: (row: any) => void;
    showActions?: boolean;
}

interface Row {
    [key: string]: any;
}

const PaginationTable: React.FC<PaginationTableProps> = ({ data, tableColumns, handleEdit, handleDelete, title, ReuseActionModalShow, showActions }) => {
    const PAGE_SIZES = [10, 15, 20];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
    const [page, setPage] = useState(1);
    const recordsPerPage = 10; // Customize as needed

    // Calculate the start and end index for the current page
    const startIndex = (page - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginatedData = data?.slice(startIndex, endIndex);

    const columns = [
        ...tableColumns,
        ...(!showActions
            ? [
                  {
                      accessor: 'actions',
                      title: <Box mr={6}>Actions</Box>,
                      textAlign: 'right',
                      render: (row: Row) => (
                          <Group gap={4} justify="right" wrap="nowrap">
                              {title === 'Status Wise Report' && (
                                  <ActionIcon size="sm" variant="subtle" color="green" onClick={() => ReuseActionModalShow?.(row)}>
                                      <IconEye size={20} />
                                  </ActionIcon>
                              )}
                              <ActionIcon size="sm" variant="subtle" color="blue" onClick={() => handleEdit?.(row)}>
                                  <IconEdit size={16} />
                              </ActionIcon>
                              {title !== 'dashboard' && (
                                  <ActionIcon size="sm" variant="subtle" color="red" onClick={() => handleDelete?.(row)}>
                                      <IconTrash size={16} />
                                  </ActionIcon>
                              )}
                          </Group>
                      ),
                  },
              ]
            : []),
    ];

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
                columns={columns}
                totalRecords={data?.length}
                paginationActiveBackgroundColor="grape"
                recordsPerPage={pageSize}
                recordsPerPageOptions={PAGE_SIZES}
                onRecordsPerPageChange={setPageSize}
                page={page}
                onPageChange={setPage}
            />
        </div>
    );
};

export default PaginationTable;
