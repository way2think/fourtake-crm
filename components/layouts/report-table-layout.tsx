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
                <div className="flex w-full  flex-col gap-4  sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    {/* <div className="flex gap-3">
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
                    {title === 'Lead List' && (
                        <div>
                            <button type="button" className="btn btn-primary" onClick={handleFilter}>
                                <IconFile className="ltr:mr-2 rtl:ml-2" />
                                Filter
                            </button>
                        </div>
                    )} */}
                </div>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
                <div className="mt-5 ">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 ">
                        {title !== 'Finance Report' && title !== 'Payment Report' && (
                            <div className="mb-5">
                                <div className="dropdown">
                                    <label htmlFor="leadStatus">Select User</label>
                                    <select className="form-input">
                                        <option value="">[-Select-]</option>
                                        <option value="hot">Hot</option>
                                        <option value="cold">Cold</option>
                                        <option value="warm">Warm</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        <div className="mb-5">
                            <div className="dropdown">
                                <label htmlFor="leadStatus">Select Center </label>
                                <select className="form-input">
                                    <option value="">[-Select-]</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="New Delhi">New Delhi</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Bangaluru">Bangaluru</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                </select>
                            </div>
                        </div>
                        {title !== 'Finance Report' && title !== 'Daily Report' && title !== 'Payment Report' && (
                            <div className="mb-5">
                                <div className="dropdown">
                                    <label htmlFor="employee">Select Employee </label>
                                    <select className="form-input">
                                        <option value="">[-Employee-]</option>
                                        <option value="Chennai">Sanjay</option>
                                        <option value="New Delhi">Jagadish</option>
                                        <option value="Mumbai">Raji</option>
                                        <option value="Bangaluru">Akhil</option>
                                        <option value="Hyderabad">Franklin</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <ComponentsFormDatePickerRange />
                        </div>
                        <div className="flex items-center">
                            <div>
                                <button type="button" className="btn btn-primary mr-5">
                                    Submit
                                </button>
                            </div>
                            <div>
                                <button type="button" className="btn btn-outline-primary mr-5" onClick={handleExport}>
                                    Export to Excel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel mt-5 overflow-hidden border-0 p-0">
                    <div className="table-responsive">
                        <PaginationTable data={filterItem} tableColumns={tableColumns} handleDelete={handleDelete} handleEdit={handleEdit} />
                    </div>
                </div>
            </div>

            {title == 'Lead List' && <Filtersetting showCustomizer={showCustomizer} setShowCustomizer={setShowCustomizer} />}
        </>
    );
};

export default ReportTableLayout;
