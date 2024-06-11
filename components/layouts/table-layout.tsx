'use client';
import { useState } from 'react';
import IconSearch from '../icon/icon-search';
import IconUserPlus from '../icon/icon-user-plus';
import { exportToExcel } from '../Reusable/ExportExcel/exportToExcel';
import PaginationTable from '../Reusable/Table/PaginationTable';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useMemo } from 'react';
import ComponentsFormsFileUploadSingle from '../Reusable/file-upload/components-forms-file-upload-single';
import ComponentsFormsFileUploadMulti from '../Reusable/file-upload/components-forms-file-upload-multi';
import IconX from '../icon/icon-x';
// import ActionModal from '../Reusable/Modal/ActionModal';
import CountryActionModal from '../CMS/countries/CountryActionModal';

interface TableLayoutProps {
    title: string;
    data: object[];
    totalPages: number;
    tableColumns: object[];
    ActionModal: any;
    handleSubmit?: any;
    exportColumns?: string[];
    handleDelete: any;
    setData: any;
    filterby: string;
}

const TableLayout: React.FC<TableLayoutProps> = ({ title, filterby, data, setData, totalPages, handleDelete, handleSubmit, tableColumns, ActionModal, exportColumns }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [search, setSearch] = useState('');
    const [search1, setSearch1] = useState('');
    const [filterItem, setFilterItem] = useState(data);
    const [addData, setAddData] = useState({});
    console.log('data', data);
    useEffect(() => {
        setFilterItem(data.filter((item: any) => item[filterby]?.toLowerCase().includes(search.toLowerCase())));
    }, [search, data]);

    {
        title === 'Embassy/Vfs' &&
            useEffect(() => {
                setFilterItem(data.filter((item: any) => item?.country?.toLowerCase().includes(search1?.toLowerCase())));
            }, [search1]);
    }

    const handleEdit = (object: any) => {
        console.log('object: ', object);
        setIsOpen(true);
        setAddData(object);
    };

    const handleInputChange = (e: any) => {
        const { value, id } = e.target;

        setAddData({ ...addData, [id]: value });
        console.log('addData', addData);
    };

    const handleExport = () => {
        // const columns = ['id', 'firstname', 'lastname', 'email'];
        const fileName = `${title}.xlsx`;
        exportToExcel(data, exportColumns, fileName);
    };

    const handleSave = () => {
        if (handleSubmit(addData)) {
            setIsOpen(false);
            setAddData({});
        }
    };

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">{title}</h2>
                <div className="flex w-full  flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        {title !== 'Country Visa Types' && (
                            <div>
                                <button type="button" className="btn btn-primary" onClick={() => setIsOpen(true)}>
                                    <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                    Add {title}
                                </button>
                            </div>
                        )}
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
                    {title === 'Embassy/Vfs' && (
                        <div className="relative">
                            <input type="text" placeholder={`Search Country `} className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search1} onChange={(e) => setSearch1(e.target.value)} />
                            <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                                <IconSearch className="mx-auto" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="panel mt-5 overflow-hidden border-0 p-0">
                <div className="table-responsive">
                    <PaginationTable data={filterItem} tableColumns={tableColumns} handleDelete={handleDelete} handleEdit={handleEdit} />
                </div>
            </div>

            <ActionModal isOpen={isOpen} setAddData={setAddData} handleInputChange={handleInputChange} setIsOpen={setIsOpen} handleSave={handleSave} addData={addData} />
        </>
    );
};

export default TableLayout;
