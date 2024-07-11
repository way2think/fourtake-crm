import './paginationtable.css';
import { useState, useMemo } from 'react';
import { ActionIcon } from '@mantine/core';
import IconEye from '../../icon/icon-eye';
import IconEdit from '../../icon/icon-edit';
import IconTrash from '../../icon/icon-trash';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconRestore from '@/components/icon/icon-restore';

interface PaginationTableProps {
  title?: string;
  data: any[];
  tableColumns: any[];
  actionhide?: boolean;
  handleEdit?: (row: any) => void;
  handleDelete?: (row: any) => void;
  ReuseActionModalShow?: (row: any) => void;
  handleRestore?: (row: any) => void;
}

interface Row {
  [key: string]: any;
}

const PaginationTable: React.FC<PaginationTableProps> = ({ data, tableColumns, handleEdit, handleDelete, title, ReuseActionModalShow, actionhide, handleRestore }) => {
  const PAGE_SIZES = [10, 15, 20];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => Math.ceil(data.length / pageSize), [data.length, pageSize]);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = useMemo(() => data.slice(startIndex, endIndex), [data, startIndex, endIndex]);

  const columns = useMemo(() => {
    const baseColumns = [...tableColumns];

    if (!(actionhide === true && title !== 'Status Wise Report')) {
      baseColumns.push({
        accessor: 'actions',
        title: <div style={{ marginRight: '6px' }}>Actions</div>,
        textAlign: 'right',
        render: (row: Row) => (
          <td style={{ display: 'flex', justifyContent: 'flex-end', gap: '3px' }}>
            {title === 'Status Wise Report' ? (
              <>
                <ActionIcon size="sm" variant="subtle" color="green" onClick={() => ReuseActionModalShow?.(row)}>
                  <IconEye size={20} />
                </ActionIcon>
              </>
            ) : title === 'Deleted Application' ? (
              <>
                <ActionIcon size="sm" variant="subtle" color="yellow" onClick={() => handleRestore?.(row)}>
                  <IconRestore size={20} />
                </ActionIcon>
              </>
            ) : (
              <>
                <ActionIcon size="sm" variant="subtle" color="blue" onClick={() => handleEdit?.(row)}>
                  <IconEdit size={16} />
                </ActionIcon>
                {title !== 'dashboard' && (
                  <ActionIcon size="sm" variant="subtle" color="red" onClick={() => handleDelete?.(row)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                )}
              </>
            )}
          </td>
        ),
      });
    }

    return baseColumns;
  }, [tableColumns, handleEdit, handleDelete, ReuseActionModalShow, title]);

  const handlePageChange = (pageNum: number) => {
    setPage(pageNum);
  };

  const handlePageSizeChange = (size: number) => {
    const newTotalPages = Math.ceil(data.length / size);
    if (page > newTotalPages) {
      setPage(newTotalPages);
    }
    setPageSize(size);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, page - halfPagesToShow);
    let endPage = Math.min(totalPages, page + halfPagesToShow);

    if (endPage - startPage < maxPagesToShow - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      } else {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
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

    return pageNumbers;
  };

  return (
    <div className="datatables">
      <div className="table-container-paginationtable">
        <table className="table-paginationtable">
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
                  <td key={colIndex}>
                    {column.render ? column.render(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingLeft: '10px' }}>
        <select className='table-number-dropdwon' value={pageSize} onChange={(e) => handlePageSizeChange(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={15} disabled={data.length < 10}>15</option>
          <option value={20} disabled={data.length < 15}>20</option>
        </select>
        <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '10px' }}>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            style={{
              marginRight: '8px',
              cursor: 'pointer'
            }}
          >
            <IconCaretDown className="rotate-90 rtl:-rotate-90" size={16} />
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            style={{
              marginRight: '8px',
              cursor: 'pointer'
            }}
          >
            <IconCaretDown className="-rotate-90 rtl:rotate-90" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationTable;
