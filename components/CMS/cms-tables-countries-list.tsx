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
                            // { accessor: 'email', sortable: true },
                            // { accessor: 'phone', sortable: true },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </>
    );
};

export default CmsTablesCountriesList;
