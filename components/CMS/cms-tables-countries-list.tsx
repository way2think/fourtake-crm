'use client';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import IconPencil from '@/components/icon/icon-pencil';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import ComponentsModalOptionalSizes from '../Reusable/Modal/components-modal-optional-sizes';
import IconMenuDocumentation from '../icon/menu/icon-menu-documentation';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        action: (
            <div>
                <Tippy content="Edit">
                    <button type="button">
                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                    </button>
                </Tippy>
                <Tippy content="Delete">
                    <button type="button">
                        <IconTrashLines />
                    </button>
                </Tippy>
            </div>
        ),
    },
    {
        id: 2,
        firstName: 'Celeste',
        action: (
            <div>
                <Tippy content="Edit">
                    <button type="button">
                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                    </button>
                </Tippy>
                <Tippy content="Delete">
                    <button type="button">
                        <IconTrashLines />
                    </button>
                </Tippy>
            </div>
        ),
    },
    {
        id: 3,
        firstName: 'Tillman',
        action: (
            <div>
                <Tippy content="Edit">
                    <button type="button">
                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                    </button>
                </Tippy>
                <Tippy content="Delete">
                    <button type="button">
                        <IconTrashLines />
                    </button>
                </Tippy>
            </div>
        ),
    },
    {
        id: 4,
        firstName: 'Daisy',
        action: (
            <div>
                <Tippy content="Edit">
                    <button type="button">
                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                    </button>
                </Tippy>
                <Tippy content="Delete">
                    <button type="button">
                        <IconTrashLines />
                    </button>
                </Tippy>
            </div>
        ),
    },
    {
        id: 5,
        firstName: 'Weber',
        action: (
            <div>
                <Tippy content="Edit">
                    <button type="button">
                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                    </button>
                </Tippy>
                <Tippy content="Delete">
                    <button type="button">
                        <IconTrashLines />
                    </button>
                </Tippy>
            </div>
        ),
    },
];

interface CmsTablesCountriesListProps {
    title: string;
}

const CmsTablesCountriesList = ({ title }: CmsTablesCountriesListProps) => {
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return item.id.toString().includes(search.toLowerCase()) || item.firstName.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    return (
        <>
            <div className="panel mt-6">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                    <h5 className="text-lg font-semibold dark:text-white-light">{title}</h5>
                    <div className="mb-0 flex items-start justify-center ltr:ml-auto rtl:mr-auto">
                        <ComponentsModalOptionalSizes />
                        <button type="button" className="btn btn-primary mr-2">
                            <IconMenuDocumentation className="mr-2" /> Export to excell
                        </button>
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        // noRecordsText="No results match your search query"
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'ID' },
                            { accessor: 'firstName', title: 'Counties List' },
                            { accessor: 'action', title: 'Actions' },
                        ]}

                        // totalRecords={initialRecords.length}
                        // recordsPerPage={pageSize}
                        // page={page}
                        // onPageChange={(p) => setPage(p)}
                        // recordsPerPageOptions={PAGE_SIZES}
                        // onRecordsPerPageChange={setPageSize}
                        // sortStatus={sortStatus}
                        // onSortStatusChange={setSortStatus}
                        // minHeight={200}
                        // paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
                {/* <div className="flex items-center gap-4">
                    <button
                        disabled
                        className="flex select-none items-center gap-2 rounded-lg px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                        </svg>
                        Previous
                    </button>
                    <div className="flex items-center gap-2">
                        <button
                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">1</span>
                        </button>
                        <button
                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">2</span>
                        </button>
                        <button
                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">3</span>
                        </button>
                        <button
                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">4</span>
                        </button>
                        <button
                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">5</span>
                        </button>
                    </div>
                    <button
                        className="flex select-none items-center gap-2 rounded-lg px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                        </svg>
                    </button>
                </div> */}
            </div>
        </>
    );
};

export default CmsTablesCountriesList;
