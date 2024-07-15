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
import PasswordActionModal from '../user-management/PasswordActionModal';
import ReuseActionModal from '../Reusable/Modal/ActionModal';
import AddNote from '../popup/LeadListAddNote';
import { useRouter } from 'next/navigation';
import IconTxtFile from '../icon/icon-txt-file';

interface TableLayoutProps {
    title: string;
    data: object[];
    totalPages: number;
    tableColumns: object[];
    ActionModal: any;
    Filtersetting?: any;
    handleSubmit?: any;
    exportColumns?: string[];
    handleDelete: any;
    setData: any;
    filterby: any;
}

const TableLayout: React.FC<TableLayoutProps> = ({ title, filterby, data, setData, totalPages, handleDelete, handleSubmit, tableColumns, ActionModal, exportColumns, Filtersetting }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [isOpenAddNote, setIsOpenAddNote] = useState(false);
    const [isEditAddNote, setIsEditAddNote] = useState(false);

    const [search, setSearch] = useState('');
    const [filterItem, setFilterItem] = useState(data);
    const [addData, setAddData] = useState({});
    const [assignPasswordValue, setAssignPasswordValue] = useState<any>();
    const [assignPassword, setAssignPassword] = useState<boolean>(false);
    const [showCustomizer, setShowCustomizer] = useState(false);
    const [filterTitle, setFilterTitle] = useState('Filter');
    const router = useRouter();

    useEffect(() => {
        let filterItems;

        if (Array.isArray(filterby)) {
            filterItems = data.filter((item: any) => filterby.some((filter: any) => item[filter]?.toLowerCase().includes(search.toLowerCase())));
        } else {
            filterItems = data.filter((item: any) => item[filterby]?.toLowerCase().includes(search.toLowerCase()));
        }

        setFilterItem(filterItems);
    }, [search, data, filterby]);

    useEffect(() => {
        setFilterItem(data);
    }, [data]);

    const handleEdit = (object: any) => {
        if (title == 'List Visa Application') {
            //router.push(`/manage-visa`);
            // const data = encodeURIComponent(JSON.stringify(object));
            // const url = `/manage-visa?data=${data}`;
            // router.push(url);

            // console.log(object);
            // sessionStorage.setItem('iseditmode', 'true');
            // sessionStorage.setItem('manageVisaData', JSON.stringify(object));
            router.push(`/manage-visa`);
        } else {
            setIsEdit(true);
            setIsOpen(true);
            setAddData(object);
        }
    };

    const handleRestore = (object: any) => {
        alert(object);
    };

    const handleInputChange = (e: any) => {
        const { value, id, options } = e.target;

        if (options) {
            // Handling multiple select options
            const selectedOptions = Array.from(options)
                .filter((option) => (option as HTMLOptionElement).selected)
                .map((option) => (option as HTMLOptionElement).value)
                .join(', '); // Join selected options with a comma

            setAddData((prevData) => ({
                ...prevData,
                [id]: selectedOptions,
            }));
        } else {
            setAddData({ ...addData, [id]: value });
        }
    };

    const handleExport = () => {
        const fileName = `${title}.xlsx`;
        exportToExcel(data, exportColumns, fileName);
    };

    const handleSave = () => {
        if (handleSubmit(addData)) {
            setIsOpen(false);
            setAddData({});

            //Navigate to Manage Visa Page
            //console.log(title)
            if (title == 'Lead List') {
                //alert("Navigate")
                //console.log(addData)
                if ((addData as { status: string }).status === 'Done') {
                    router.push(`/manage-visa`);
                }
            }
        }
    };

    const handleFilter = () => {
        setShowCustomizer(true);
        setFilterTitle('Filter Applied');
    };

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">{title}</h2>
                <div className="flex w-full  flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        {title !== 'Country Visa Types' && title !== 'Deleted Application' && title !== 'List Visa Application' && (
                            <div>
                                <button type="button" className="btn btn-primary" onClick={() => setIsOpen(true)}>
                                    <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                    Add {title}
                                </button>
                            </div>
                        )}

                        {title === 'List Visa Application' && (
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        router.push('/manage-visa');
                                    }}
                                >
                                    <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                    Add {title}
                                </button>
                            </div>
                        )}

                        {title === 'User' && (
                            <div>
                                <button type="button" className="btn btn-primary" onClick={() => setAssignPassword(true)}>
                                    <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                    Assign Password
                                </button>

                                {assignPassword && (
                                    <PasswordActionModal
                                        assignPassword={assignPassword}
                                        setAssignPassword={setAssignPassword}
                                        assignPasswordValue={assignPasswordValue}
                                        setAssignPasswordValue={setAssignPasswordValue}
                                    />
                                )}
                            </div>
                        )}
                        <div>
                            <button type="button" className="btn btn-outline-primary" onClick={handleExport}>
                                Export to Excel
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder={`Search`} className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                    {title === 'Lead List' && (
                        <div>
                            <button type="button" className="btn btn-primary" onClick={handleFilter}>
                                <IconFile className="ltr:mr-2 rtl:ml-2" />
                                {filterTitle}
                            </button>
                        </div>
                    )}

                    <div>
                        <button type="button" className="btn btn-primary" onClick={handleFilter}>
                            <IconTxtFile className="ltr:mr-2 rtl:ml-2" />
                            {filterTitle}
                        </button>
                    </div>
                </div>
            </div>
            <div className="panel mt-5 overflow-hidden border-0 p-0">
                <div className="table-responsive">
                    <PaginationTable title={title} data={filterItem} tableColumns={tableColumns} handleDelete={handleDelete} handleEdit={handleEdit} handleRestore={handleRestore} />
                </div>
            </div>

            {title == 'Lead List' && <Filtersetting data={data} setFilterItem={setFilterItem} showCustomizer={showCustomizer} setFilterTitle={setFilterTitle} setShowCustomizer={setShowCustomizer} />}
            <ActionModal
                isOpen={isOpen}
                setAddData={setAddData}
                handleInputChange={handleInputChange}
                setIsOpen={setIsOpen}
                handleSave={handleSave}
                addData={addData}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                // followUps={followUps}
                // setFollowUps={setFollowUps}
            />

            <ReuseActionModal isOpen={isOpenAddNote} setIsOpen={setIsOpenAddNote} width="">
                <AddNote isOpen={isOpenAddNote} setIsOpen={setIsOpenAddNote} />
            </ReuseActionModal>
        </>
    );
};

export default TableLayout;
