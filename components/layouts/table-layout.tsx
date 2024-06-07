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
    handleSave?: any;
    exportColumns?: string[];
}

const TableLayout: React.FC<TableLayoutProps> = ({ title, data, totalPages, tableColumns, ActionModal, exportColumns }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [search, setSearch] = useState('');

    const handleEdit = (object: any) => {
        console.log('object: ', object);
        setIsOpen(true);
        setEditData(object);
    };

    const handleExport = () => {
        // const columns = ['id', 'firstname', 'lastname', 'email'];
        const fileName = `${title}.xlsx`;
        exportToExcel(data, exportColumns, fileName);
    };

    const handleSave = () => {
        console.log('HandleSave');
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

            {/* {actionModal === 'countryActionModel' ? (
                <CountryActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} />
            ) : (
                actionModal === 'visatype' && <VisaTypesActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} />
            )} */}

            {/* {actionModal && actionModal(isOpen, setIsOpen, handleSave)} */}
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} />

            {/* <VisaTypesActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} /> */}

            {/* {actionModal && <actionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave}/>} */}

            {/* <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 " />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel my-8 w-full max-w-5xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <h5 className="text-lg font-bold">Add Country</h5>
                                        <button onClick={() => setIsOpen(false)} type="button" className="text-white-dark hover:text-dark">
                                            <IconX />
                                        </button>
                                    </div>

                                    <div className="p-5">
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                            <div className="mb-5">
                                                <label htmlFor="countrysname">Country Name</label>
                                                <input id="countrysname" type="text" placeholder="Enter Country Name" className="form-input" />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="languages">Languages</label>
                                                <input id="languages" type="text" placeholder="Enter Languages" className="form-input" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                            <div className="mb-5">
                                                <label htmlFor="dailingcode">Dailing Code</label>
                                                <input id="dailingcode" type="tel" placeholder="Enter dailing Code" className="form-input" />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="capital">Capital</label>
                                                <input id="capital" type="text" placeholder="Enter Capital" className="form-input" />
                                            </div>
                                        </div>
                                        <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-1 ">
                                            <div className="dropdown">
                                                <label htmlFor="role">Cities</label>
                                                <select className="form-input" defaultValue="" id="role">
                                                    <option value="" disabled={true}>
                                                        Cities
                                                    </option>
                                                    <option value="Chennai">Chennai</option>
                                                    <option value="Vellore">Vellore</option>
                                                    <option value="Bengaluru">Bengaluru</option>
                                                    <option value="New Delhi">New Delhi</option>
                                                    <option value="Mangalore">Mangalore</option>
                                                    <option value="Mumbai">Mumbai</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                            <div className="mb-5">
                                                <label htmlFor="countrydetails">Country Details</label>
                                                <textarea id="countrydetails" rows={3} placeholder="Enter Country Details" className="form-textarea min-h-[80px] resize-none"></textarea>
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="climate">Climate</label>
                                                <textarea id="climate" rows={3} placeholder="Enter Climate" className="form-textarea min-h-[80px] resize-none"></textarea>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                            <div className="mb-5">
                                                <label htmlFor="currency">Currency</label>
                                                <input id="currency" type="tel" placeholder="Enter Currency" className="form-input" />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="timezone">Time Zone</label>
                                                <input id="timezone" type="text" placeholder="Enter Time Zone" className="form-input" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                                            <div className="mb-5">
                                                <label htmlFor="additionalinfo">Additional Info</label>
                                                <textarea id="additionalinfo" rows={3} placeholder="Enter Additional Info" className="form-textarea min-h-[80px] resize-none"></textarea>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                                            <div className="mb-5">
                                                <label htmlFor="website">Website</label>
                                                <input id="website" type="text" placeholder="Enter Website" className="form-input" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 ">
                                            <div className="mb-5">
                                                <label className="flex cursor-pointer items-center">
                                                    <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                                    <span className="text-white-dark">Is popular Country</span>
                                                </label>
                                            </div>
                                            <div className="mb-5">
                                                <label className="flex cursor-pointer items-center">
                                                    <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                                    <span className="text-white-dark">Enable outsource application center</span>
                                                </label>
                                            </div>
                                            <div className="mb-5">
                                                <label className="flex cursor-pointer items-center">
                                                    <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                                    <span className="text-white-dark">Enable Jurisdiction</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 ">
                                            <div className="mb-5">
                                                <ComponentsFormsFileUploadSingle />
                                            </div>
                                            <div className="mb-5">
                                                <ComponentsFormsFileUploadMulti />
                                            </div>
                                        </div>
                                        <div className="mt-8 flex items-center justify-end">
                                            <button onClick={() => setIsOpen(false)} type="button" className="btn btn-outline-danger">
                                                Cancel
                                            </button>
                                            <button onClick={handleSave} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition> */}
        </>
    );
};

export default TableLayout;
