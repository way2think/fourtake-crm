'use client';

import './paginationTable.css';
import { useState, useMemo } from 'react';
import { ActionIcon } from '@mantine/core';
import IconEye from '../../icon/icon-eye';
import IconEdit from '../../icon/icon-edit';
import IconTrash from '../../icon/icon-trash';
import IconCaretDown from '@/components/icon/icon-caret-down';

interface PaginationTableProps {
  data: any[];
  tableColumns: any[];
  handleEdit?: (row: any) => void;
  handleDelete?: (row: any) => void;
  title?: string;
  ReuseActionModalShow?: (row: any) => void;
}

interface Row {
  [key: string]: any;
}

const PaginationTable: React.FC<PaginationTableProps> = ({ data, tableColumns, handleEdit, handleDelete, title, ReuseActionModalShow }) => {
  const PAGE_SIZES = [10, 15, 20];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = useMemo(() => data.slice(startIndex, endIndex), [data, startIndex, endIndex]);

  const columns = useMemo(() => [
    ...tableColumns,
    {
      accessor: 'actions',
      title: <div style={{ marginRight: '6px' }}>Actions</div>,
      textAlign: 'right',
      render: (row: Row) => (
        <td style={{ display: 'flex', justifyContent: 'flex-end', gap: '2px' }}>
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
        </td>
      ),
    },
  ], [tableColumns, handleEdit, handleDelete, ReuseActionModalShow, title]);

  const handlePageChange = (pageNum: number) => {
    setPage(pageNum);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    const middlePage = Math.ceil(maxPagesToShow / 2);

    if (page <= middlePage) {
      for (let i = 1; i <= Math.min(maxPagesToShow, totalPages); i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            style={{
              marginRight: '8px',
              backgroundColor: i === page ? '#ddd' : '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '0px 4px'
            }}
          >
            {i}
          </button>
        );
      }
    } else if (page > totalPages - middlePage) {
      for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            style={{
              marginRight: '8px',
              backgroundColor: i === page ? '#ddd' : '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '0px 4px'
            }}
          >
            {i}
          </button>
        );
      }
    } else {
      for (let i = page - 1; i <= page + 1; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            style={{
              marginRight: '8px',
              backgroundColor: i === page ? '#ddd' : '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '0px 4px'
            }}
          >
            {i}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="datatables bg-[#]">
      {/* <h5 className="underline-text">Our Process</h5> */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={{ textAlign: column.textAlign || 'left', paddingRight: '16px' }}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} style={{ paddingRight: '16px' }}>
                  {column.render ? column.render(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          {PAGE_SIZES.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}
            style={{
                marginRight: '8px',
                cursor: 'pointer'
              }}
            >
            {'<'}
          </button>
          {renderPageNumbers()}
          <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationTable;
