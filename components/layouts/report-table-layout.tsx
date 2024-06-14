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
//import ActionModal from '../Reusable/Modal/ActionModal';
import CountryActionModal from '../CMS/countries/CountryActionModal';
import IconFile from '../icon/icon-zip-file';
import ComponentsFormDatePickerTime from '../lead-management/lead-manage/components-form-date-picker-time';
import ComponentsFormDatePickerRange from '../lead-management/lead-manage/components-form-date-picker-range';

interface ReportTableLayoutProps {
    title: string;
    data: object[];
    totalPages: number;
    tableColumns: object[];
    //ActionModal: any;
    Filtersetting?: any;
    handleSubmit?: any;
    exportColumns?: string[];
    handleDelete: any;
    //setData: any;
    //filterby: string;
}

const ReportTableLayout: React.FC<ReportTableLayoutProps> = ({ title, data, totalPages, handleDelete, handleSubmit, tableColumns, exportColumns, Filtersetting }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [search, setSearch] = useState('');
    const [filterItem, setFilterItem] = useState(data);
    const [addData, setAddData] = useState({});
    const [showCustomizer, setShowCustomizer] = useState(false);

    // useEffect(() => {
    //     setFilterItem(data.filter((item: any) => item[filterby]?.toLowerCase().includes(search.toLowerCase())));
    // }, [search, data]);

    const handleEdit = (object: any) => {
        setIsEdit(true);
        setIsOpen(true);
        setAddData(object);
    };

    const handleInputChange = (e: any) => {
        const { value, id } = e.target;

        setAddData({ ...addData, [id]: value });
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

    const handleFilter = () => {
        setShowCustomizer(true);
    };

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">{title}</h2>
                <div className="flex w-full  flex-col gap-5 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex gap-3">
                        {/* {title !== 'Country Visa Types' && ( */}
                        <div>
                            <div className="dropdown">
                                <label htmlFor="leadStatus">Select User</label>
                                <select className="form-input">
                                    <option value="" disabled>
                                        {' '}
                                        Select User
                                    </option>
                                    <option value="hot">Kavitha N[Admin]</option>
                                    <option value="cold">Cold</option>
                                    <option value="warm">Warm</option>
                                </select>
                            </div>
                        </div>
                        {/* )} */}
                        <div className="dropdown">
                            <label htmlFor="leadStatus">Select Center </label>
                            <select className="form-input">
                                <option value="" disabled>
                                    Select Center
                                </option>
                                <option value="hot">Hot</option>
                                <option value="cold">Cold</option>
                                <option value="warm">Warm</option>
                            </select>
                        </div>
                        <div className="flex items-end justify-end">
                            <ComponentsFormDatePickerRange />
                        </div>

                        <div className="flex items-center justify-center">
                            <button type="button" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <div className="flex items-center justify-center">
                            <button type="button" className="btn btn-outline-primary" onClick={handleExport}>
                                Export to Excel
                            </button>
                        </div>
                    </div>
                    {/* <div className="relative">
                        <input type="text" placeholder={`Search ${title}`} className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div> */}
                    {/* {title === 'Lead List' && (
                        <div>
                            <button type="button" className="btn btn-primary" onClick={handleFilter}>
                                <IconFile className="ltr:mr-2 rtl:ml-2" />
                                Filter
                            </button>
                        </div>
                    )} */}
                </div>
            </div>

            <div className="panel mt-5 overflow-hidden border-0 p-0">
                <div className="table-responsive">{/* <PaginationTable data={filterItem} tableColumns={tableColumns} handleDelete={handleDelete} handleEdit={handleEdit} /> */}</div>
            </div>

            {title == 'Lead List' && <Filtersetting showCustomizer={showCustomizer} setShowCustomizer={setShowCustomizer} />}
        </>
    );
};

export default ReportTableLayout;
