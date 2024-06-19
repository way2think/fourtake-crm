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
    formData: {
        input1: string;
        input2: string;
        input3: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface AddData {
    [key: string]: string;
}

const ReportTableLayout: React.FC<ReportTableLayoutProps> = ({ title, data, totalPages, handleDelete, handleSubmit, tableColumns, exportColumns, Filtersetting, formData, handleChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [search, setSearch] = useState('');
    const [filterItem, setFilterItem] = useState<any>(data);
    const [addData, setAddData] = useState<AddData>({});
    const [showCustomizer, setShowCustomizer] = useState(false);
    const [dateFilter, setDateFilter] = useState<any>();

    useEffect(() => {
        console.log('datefi', dateFilter);
        if (dateFilter && Object.keys(addData).length === 0) {
            setFilterItem(dateFilter);
        }
    }, [dateFilter]);

    const handleEdit = (object: any) => {
        setIsEdit(true);
        setIsOpen(true);
        setAddData(object);
    };

    const handleInputChange = (e: any) => {
        const { value, id } = e.target;

        setAddData({ ...addData, [id]: value });
        console.log(value);
        console.log(addData);
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
    console.log('filter item', filterItem, addData);
    const handleSubmitReport = () => {
        //debugger;

        let requiredFields: string[] = [];
        let dataFilter = data;

        if (title == 'Daily Report') {
            requiredFields = ['user', 'center'];
        }
        if (title == 'Finance Report' || title == 'Payment Report') {
            requiredFields = ['Select_Center'];
        }
        if (title == 'Status Wise Report') {
            requiredFields = ['Select_User', 'Select_Center', 'Select_Employee'];
        }
        if (title == 'Out Scan' || title == 'In Scan') {
            requiredFields = [];
        }

        //const requiredFields = ['Select_User', 'Select_Center', 'Select_Employee'];
        /*
        let allFieldsInvalid = true;
        for (let field of requiredFields) {
            if (addData[field] && addData[field].length > 1) {
                allFieldsInvalid = false;
                break;

            }
        }

        if (allFieldsInvalid) {
            const formattedField = requiredFields.map(field => field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())).join(' or ');
            alert(`${formattedField} Is Required`);
            return;
        }
        */

        if (addData?.center) {
            dataFilter = dataFilter.filter((item: any) => item.center === addData.center);
        }

        if (addData?.user) {
            dataFilter = dataFilter.filter((item: any) => item.consultantname === addData.user);
        }

        if (dateFilter) {
            dataFilter = dataFilter.filter((item: any) => {
                return dateFilter.some((dateItem: any) => dateItem.id === item.id);
            });
        }

        //console.log("dataFiler", dataFilter)

        setFilterItem(dataFilter);




        // Proceed with form submission or other logic
        //console.log('Form data is valid:', addData);
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
                        {title !== 'Finance Report' && title !== 'Payment Report' && title !== 'Out Scan' && title !== 'In Scan' && (
                            <div className="mb-5">
                                <div className="dropdown">
                                    <label htmlFor="leadStatus">Select User</label>
                                    <select id="user" className="form-input" onChange={(e) => handleInputChange(e)}>
                                        <option value="">Select User</option>
                                        <option value="sanjay">Sanjay</option>
                                        <option value="jagan">Jagan</option>
                                        <option value="raji">Raji</option>
                                        <option value="santhosh">Santhosh</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        {title !== 'Out Scan' && title !== 'In Scan' && (
                            <div className="mb-5">
                                <div className="dropdown">
                                    <label htmlFor="leadStatus">Select Center </label>
                                    <select id="center" className="form-input" onChange={handleInputChange}>
                                        <option value="">Select Center</option>
                                        <option value="Chennai">Chennai</option>
                                        <option value="New Delhi">New Delhi</option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Bangaluru">Bangaluru</option>
                                        <option value="Hyderabad">Hyderabad</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        {/* {title !== 'Finance Report' && title !== 'Daily Report' && title !== 'Payment Report' && title !== 'Out Scan' && title !== 'In Scan' && (
                            <div className="mb-5">
                                <div className="dropdown">
                                    <label htmlFor="employee">Select Employee </label>
                                    <select id="consultantname" className="form-input" onChange={handleInputChange}>
                                        <option value="">[-Employee-]</option>
                                        <option value="Sanjay">Sanjay</option>
                                        <option value="Jagadish Delhi">Jagadish</option>
                                        <option value="Raji">Raji</option>
                                        <option value="Akhil">Akhil</option>
                                        <option value="Franklin">Franklin</option>
                                    </select>
                                </div>
                            </div>
                        )} */}
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        {title !== 'Out Scan' && title !== 'In Scan' && (
                            <>
                                <div className="mb-5">
                                    <ComponentsFormDatePickerRange data={data} setDateFilter={setDateFilter} dateFilter={dateFilter} />
                                </div>
                                <div className="flex items-center">
                                    <div>
                                        <button type="button" className="btn btn-primary mr-5" onClick={handleSubmitReport}>
                                            Submit
                                        </button>
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-outline-primary mr-5" onClick={handleExport}>
                                            Export to Excel
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
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
