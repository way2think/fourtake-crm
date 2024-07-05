'use client';

import './paginationTable.css';
import { useState, useMemo } from 'react';

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
        <td style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          {title === 'Status Wise Report' && (
            <button style={{ marginRight: '8px', color: 'green' }} onClick={() => ReuseActionModalShow?.(row)}>
              View
            </button>
          )}
          <button style={{ marginRight: '8px', color: 'blue' }} onClick={() => handleEdit?.(row)}>
            Edit
          </button>
          {title !== 'dashboard' && (
            <button style={{ color: 'red' }} onClick={() => handleDelete?.(row)}>
              Delete
            </button>
          )}
        </td>
      ),
    },
  ], [tableColumns, handleEdit, handleDelete, ReuseActionModalShow, title]);

  return (
    <div className="datatables bg-[#]">
      <h5 className="underline-text">Our Process</h5>
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
      <div>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          {PAGE_SIZES.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)} disabled={endIndex >= data.length}>Next</button>
      </div>
    </div>
  );
};

export default PaginationTable;
