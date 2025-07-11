import { useState, useMemo } from 'react';
import { ActionIcon } from '@mantine/core';
import IconEye from '../../icon/icon-eye';
import IconEdit from '../../icon/icon-edit';
import IconTrash from '../../icon/icon-trash';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconRestore from '@/components/icon/icon-restore';
import IconTxtFile from '@/components/icon/icon-txt-file';
import IconVerify from '@/components/icon/menu/icon-verify';
import IconUnVerified from '@/components/icon/icon-unverified';
import IconList from '@/components/icon/icon-list';
import IconTrendingUp from '@/components/icon/icon-trending-up';
import './paginationtable.css';
import { usePagination } from '@/hooks/usePagination';
import { PaginationMeta } from '@/types/pagination';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface PaginationTableProps {
    title?: string;
    data?: any;
    meta?: PaginationMeta;
    tableColumns: any[];
    actionhide?: boolean;
    handleEdit?: (row: any) => void;
    handleDelete?: (row: any) => void;
    ReuseActionModalShow?: (row: any) => void;
    handleRestore?: (row: any) => void;
    handleListLine?: (row: any) => void;
    handleTracking?: (row: any) => void;
    setPage?: Function;
    setLimit?: Function;
    handleDocChecklist?: Function;
}

interface Row {
    [key: string]: any;
}

const PaginationTable: React.FC<PaginationTableProps> = ({
    data,
    meta,
    tableColumns,
    handleEdit,
    handleDelete,
    title,
    ReuseActionModalShow,
    actionhide,
    handleRestore,
    handleTracking,
    handleListLine,
    setPage: updatePage,
    setLimit: updatePageLimit,
    handleDocChecklist,
}) => {
    const PAGE_SIZES = [10, 15, 20];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(meta?.currentPage || 1);

    const paginationPages = usePagination(meta ? { currentPage: page, pageSize: meta?.itemsPerPage, totalCount: meta?.totalItems } : { currentPage: 1, pageSize: 10, totalCount: 1 }); // to generate page numbers

    console.log('data', data);

    // console.log('paginationPages: ', paginationPages, meta?.totalItems);

    // const totalPages = useMemo(() => Math.ceil(data.length / pageSize), [data.length, pageSize]);
    const totalPages = 100;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = useMemo(() => data?.slice(startIndex, endIndex), [data, startIndex, endIndex]);

    const handleMouseEnter: React.MouseEventHandler<HTMLElement> = (event) => {
        const svgElement = event.currentTarget.querySelector('svg title');
        if (svgElement) {
            svgElement.textContent = 'Multiple Passport';
        }
    };

    const columns = useMemo(() => {
        const baseColumns = [...tableColumns];

        if (!(actionhide === true && title !== 'Status Wise Report')) {
            baseColumns.push({
                accessor: 'actions',
                title: <div style={{ marginRight: '6px' }}>Actions</div>,
                textAlign: 'right',
                render: (row: Row, i: number) => (
                    <td style={{ display: 'flex', justifyContent: 'flex-end', gap: '3px' }}>
                        {title === 'Status Wise Report' ? (
                            <>
                                <ActionIcon
                                    size="sm"
                                    className="transition duration-200 hover:bg-blue-700 active:bg-blue-700"
                                    variant="subtle"
                                    color="green"
                                    onClick={() => ReuseActionModalShow?.(row)}
                                >
                                    <IconEye size={20} />
                                </ActionIcon>
                            </>
                        ) : title === 'Deleted Application' ? (
                            <>
                                <ActionIcon size="sm" className="transition duration-200 hover:bg-blue-700 active:bg-blue-700" variant="subtle" color="yellow" onClick={() => handleRestore?.(row)}>
                                    <IconRestore size={20} />
                                </ActionIcon>
                            </>
                        ) : (
                            <>
                                {title !== 'Deleted Visa Application' && (
                                    <Tippy content="Edit">
                                        <ActionIcon size="sm" className="transition duration-200 hover:bg-blue-700 active:bg-blue-700" variant="subtle" color="blue" onClick={() => handleEdit?.(row)}>
                                            <IconEdit size={16} />
                                        </ActionIcon>
                                    </Tippy>
                                )}

                                {title === 'List Visa Application' && (
                                    <>
                                        <Tippy content="Text File">
                                            <ActionIcon
                                                size="sm"
                                                variant="subtle"
                                                className="transition duration-200 hover:bg-blue-700 active:bg-blue-700"
                                                color="red"
                                                onClick={() => handleDocChecklist?.(row)}
                                            >
                                                <IconTxtFile className={`size:"16"`} />
                                            </ActionIcon>
                                        </Tippy>

                                        {row.visa_status === 'verified' && (
                                            <ActionIcon
                                                size="sm"
                                                variant="subtle"
                                                color="red"
                                                className="transition duration-200 hover:bg-blue-700 active:bg-blue-700"
                                                //  onClick={() => handleDelete?.(row)}
                                            >
                                                <IconVerify />
                                            </ActionIcon>
                                        )}
                                        {row.visa_status === 'unverified' && (
                                            <ActionIcon
                                                size="sm"
                                                variant="subtle"
                                                color="red"
                                                className="transition duration-200 hover:bg-blue-700 active:bg-blue-700"
                                                //  onClick={() => handleDelete?.(row)}
                                            >
                                                <IconUnVerified />
                                            </ActionIcon>
                                        )}
                                        <Tippy content="Multiple Passport">
                                            <ActionIcon
                                                size="sm"
                                                className="transition duration-200 hover:bg-blue-700 active:bg-blue-700"
                                                variant="subtle"
                                                color="red"
                                                onClick={() => handleListLine?.(row)}
                                            >
                                                <IconList />
                                            </ActionIcon>
                                        </Tippy>
                                        <span>({row?.multiple_passports?.length || 0})</span>
                                        <Tippy content="Application Tracking">
                                            <ActionIcon
                                                size="sm"
                                                className="transition duration-200 hover:bg-blue-700 active:bg-blue-700"
                                                variant="subtle"
                                                color="red"
                                                onClick={() => handleTracking?.(row)}
                                            >
                                                <IconTrendingUp />
                                            </ActionIcon>
                                        </Tippy>
                                    </>
                                )}
                                {title !== 'dashboard' && title !== 'Country Visa Types' && title !== 'Deleted Visa Application' && (
                                    <Tippy content="Delete">
                                        <ActionIcon size="sm" className="transition duration-200 hover:bg-blue-700 active:bg-blue-700" variant="subtle" color="red" onClick={() => handleDelete?.(row)}>
                                            <IconTrash size={16} />
                                        </ActionIcon>
                                    </Tippy>
                                )}

                                {title === 'Deleted Visa Application' && (
                                    <ActionIcon size="sm" className="transition duration-200 hover:bg-blue-700 active:bg-blue-700" variant="subtle" color="red" onClick={() => handleRestore?.(row)}>
                                        <IconRestore size={16} />
                                    </ActionIcon>
                                )}
                            </>
                        )}
                    </td>
                ),
            });
        }

        return baseColumns;
    }, [title, tableColumns, handleEdit, handleDelete, ReuseActionModalShow, handleListLine]);

    const handlePageChange = (pageNum: number) => {
        setPage(pageNum);
        if (updatePage) {
            updatePage(pageNum);
        }
    };

    const handlePageSizeChange = (size: number) => {
        const newTotalPages = Math.ceil((meta?.totalItems ?? data?.length ?? 0) / size);
        if (page > newTotalPages) {
            setPage(newTotalPages);
            if (updatePage) {
                updatePage(newTotalPages);
            }
        }
        setPageSize(size);
        if (updatePageLimit) {
            updatePageLimit(size);
        }
    };

    const lastPage = paginationPages?.[paginationPages.length - 1] ?? null;

    // const renderPageNumbers = () => {
    //     const pageNumbers = [];
    //     const maxPagesToShow = 5;
    //     const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    //     let startPage = Math.max(1, page - halfPagesToShow);
    //     let endPage = Math.min(totalPages, page + halfPagesToShow);

    //     if (endPage - startPage < maxPagesToShow - 1) {
    //         if (startPage === 1) {
    //             endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    //         } else {
    //             startPage = Math.max(1, endPage - maxPagesToShow + 1);
    //         }
    //     }

    //     for (let i = startPage; i <= endPage; i++) {
    //         pageNumbers.push(
    //             <button
    //                 key={i}
    //                 onClick={() => handlePageChange(i)}
    //                 style={{
    //                     marginRight: '8px',
    //                     backgroundColor: i === page ? '#ddd' : '#fff',
    //                     border: '1px solid #ccc',
    //                     borderRadius: '4px',
    //                     padding: '0px 4px',
    //                 }}
    //             >
    //                 {i}
    //             </button>
    //         );
    //     }

    //     return pageNumbers;
    // };

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
                        {data?.length > 0 ? (
                            data?.map((row: any, rowIndex: any) => (
                                <tr key={rowIndex}>
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex}>{column.render ? column.render(row, rowIndex) : row[column.accessor]}</td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="py-5 text-center">
                                    <p className="text-lg font-semibold text-gray-500">No Data Available</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingLeft: '10px' }}>
                <select className="table-number-dropdwon" value={pageSize} onChange={(e) => handlePageSizeChange(Number(e.target.value))}>
                    <option value={10}>10</option>
                    <option value={15} disabled={meta && meta.totalItems < 10}>
                        15
                    </option>
                    <option value={20} disabled={meta && meta.totalItems < 15}>
                        20
                    </option>
                </select>
                <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '10px' }}>
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        style={{
                            marginRight: '8px',
                            cursor: 'pointer',
                        }}
                    >
                        <IconCaretDown className="rotate-90 rtl:-rotate-90" size={16} />
                    </button>
                    {/* {renderPageNumbers()} */}
                    {paginationPages?.map((page) => (
                        <button
                            key={page}
                            onClick={page !== '...' ? () => handlePageChange(page) : undefined}
                            style={{
                                marginRight: '8px',
                                backgroundColor: meta?.currentPage === page ? '#ddd' : '#fff',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                padding: '0px 4px',
                            }}
                        >
                            {page}
                        </button>
                    ))}

                    {
                        <button
                            onClick={page === lastPage ? undefined : () => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            style={{
                                marginRight: '8px',
                                cursor: 'pointer',
                            }}
                        >
                            <IconCaretDown className="-rotate-90 rtl:rotate-90" size={16} />
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default PaginationTable;
