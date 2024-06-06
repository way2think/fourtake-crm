'use client';
import { useState } from 'react';
import Table from '../Reusable/Table/Table';
import IconSearch from '../icon/icon-search';
import IconUserPlus from '../icon/icon-user-plus';
import { exportToExcel } from '../Reusable/ExportExcel/exportToExcel';
import PaginationTable from '../CMS/PaginationTable';

const TableLayout = ({ title, data, totalPages, tableColumns, actionModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [search, setSearch] = useState('');

    const handleEdit = (object: any) => {
        console.log('object: ', object);
        setIsOpen(true);
        setEditData(object);
    };

    const handleExport = () => {
        const columns = ['id', 'firstname', 'lastname', 'email'];
        const fileName = `${title}.xlsx`;
        exportToExcel(data, columns, fileName);
    };

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">{title}</h2>
                <div className="flex w-full  flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => setIsOpen(true)}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Add {title}
                            </button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-outline-primary" onClick={handleExport}>
                                Export to Excel
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder={`Search ${title}`} className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="panel mt-5 overflow-hidden border-0 p-0">
                <div className="table-responsive">
                    <PaginationTable data={data} tableColumns={tableColumns} handleEdit={handleEdit} />
                    {/* <Table data={data} /> */}
                    {/* <div className="pagination">
                        {[...Array(totalPages)].map((_, index) => (
                            <button key={index}>{index + 1}</button>
                        ))}
                    </div> */}
                </div>
            </div>
            {/* {actionModal && actionModal(editData)} */}
        </>
    );
};

export default TableLayout;
