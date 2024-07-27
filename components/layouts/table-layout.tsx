'use client';
import { useRef, useState } from 'react';
import IconSearch from '../icon/icon-search';
import IconUserPlus from '../icon/icon-user-plus';
import * as XLSX from 'xlsx';
import { exportToExcel } from '../Reusable/ExportExcel/exportToExcel';
import PaginationTable from '../Reusable/Table/PaginationTable';
import React, { Fragment, useEffect, useMemo } from 'react';
import IconX from '../icon/icon-x';
import IconFile from '../icon/icon-zip-file';
import PasswordActionModal from '../user-management/PasswordActionModal';
import ReuseActionModal from '../Reusable/Modal/ActionModal';
import { useRouter } from 'next/navigation';
import ImportExcel from '../Reusable/import-excel/ImportExcel';
import { PaginationMeta } from '@/types/pagination';

interface TableLayoutProps {
    title: string;
    data: object[];
    meta?: PaginationMeta;
    tableColumns: object[];
    ActionModal: any;
    Filtersetting?: any;
    handleSubmit?: any;
    exportColumns?: string[];
    handleDelete: any;
    filterby: any;
    ActionModalListLine?: any;
    setSearch: Function;
    filter?: string;
    setFilter?: Function;
    setPage: Function;
    setLimit: Function;
}
interface AddDataProps {
    refno?: any;
    status?: any;
}
const TableLayout: React.FC<TableLayoutProps> = ({
    title,
    filterby,
    data,
    meta,
    handleDelete,
    handleSubmit,
    tableColumns,
    ActionModal,
    exportColumns,
    Filtersetting,
    ActionModalListLine,
    setSearch: updateSearch,
    filter,
    setFilter: updateFilter,
    setPage,
    setLimit,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [isOpenAddNote, setIsOpenAddNote] = useState(false);
    const [isEditAddNote, setIsEditAddNote] = useState(false);

    const [isOpenlistLine, setIsOpenListLine] = useState(false);

    const [search, setSearch] = useState('');
    const [filterItem, setFilterItem] = useState(data);
    const [addData, setAddData] = useState<AddDataProps>({});
    const [assignPasswordValue, setAssignPasswordValue] = useState<any>();
    const [assignPassword, setAssignPassword] = useState<boolean>(false);
    const [showCustomizer, setShowCustomizer] = useState(false);
    const [filterTitle, setFilterTitle] = useState('Filter');
    const [track, setTrack] = useState({
        url: '',
        other: '',
    });

    const [isImportOpen, setIsImportOpen] = useState(false);
    const [isOpenTrack, setIsOpenTrack] = useState(false);
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            // setError(null);
        }
    };

    // useEffect(() => {
    //     let filterItems;

    //     if (Array.isArray(filterby)) {
    //         filterItems = data.filter((item: any) =>
    //             filterby.some((filter: any) => {
    //                 const itemValue = item[filter];
    //                 // Ensure itemValue is a string before calling toLowerCase
    //                 return typeof itemValue === 'string' && itemValue.toLowerCase().includes(search.toLowerCase());
    //             })
    //         );
    //     } else {
    //         // filterItems = data.filter((item: any) => item[filterby]?.toLowerCase().includes(search.toLowerCase()));
    //         filterItems = data.filter((item: any) => {
    //             const keys = filterby.split('.');
    //             let value = item;

    //             for (const key of keys) {
    //                 value = value?.[key];
    //             }

    //             return value?.toString().toLowerCase().includes(search.toLowerCase());
    //         });
    //     }

    //     setFilterItem(filterItems);
    // }, [search, data, filterby]);

    useEffect(() => {
        setFilterItem(data);
    }, [data]);

    const handleEdit = (object: any) => {
        if (title == 'List Visa Application') {
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

    const handleTracking = (object: any) => {
        setAddData(object);
        setIsOpenTrack(true);
    };

    const handleTrackInputChange = (e: any) => {
        const { value, id } = e.target;

        setTrack({ ...track, [id]: value });
    };

    const handleInputChange = (e: any) => {
        const { value, id, options } = e.target;

        // console.log('handleInputChange: ', id, value);

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

    const handleSave = async () => {
        // debugger;
        // this is to send only object with value, so null values are filtered out
        const filteredObj = Object.fromEntries(Object.entries(addData).filter(([key, value]) => value !== null && value !== '' && value !== undefined));

        // console.log('fil: ', filteredObj);
        // passing addData, without removing null values, because during update we will be emptying some fields
        const isSuccess = await handleSubmit(addData);

        if (isSuccess) {
            setIsOpen(false);
            setAddData({ refno: '', status: '' });

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

    const handleFileUpload = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const fileReader = event.target as FileReader;
            const arrayBuffer = fileReader.result as ArrayBuffer;
            const uint8Array = new Uint8Array(arrayBuffer);
            const binaryString = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
            const workbook = XLSX.read(binaryString, { type: 'binary' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const parsedData = XLSX.utils.sheet_to_json(worksheet);
            // setData(parsedData);
            console.log('import data', parsedData);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleButtonClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xlsx, .xls';
        input.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            if (target && target.files && target.files[0]) {
                const file = target.files[0];
                handleFileUpload(file);
            }
        };
        input.click();
    };

    const handleTrackSave = () => {
        setAddData({ ...addData, ...track });
        setIsOpenTrack(false);
        setTrack({ url: '', other: '' });
    };

    const handleFilter = () => {
        setShowCustomizer(true);
        setFilterTitle('Filter Applied');
    };

    const handleListLine = (object: any) => {
        // Implement the logic to handle the deletion of the row
        // console.log('Deleting row:', object);
        setIsOpenListLine(true);
        // You can add your deletion logic here, e.g., updating the state, making an API call, etc.
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

                        {title === 'Embassy/Vfs' && (
                            <div className="dropdown">
                                <select
                                    className="form-input"
                                    defaultValue=""
                                    id="type"
                                    value={filter}
                                    onChange={(e) => {
                                        // console.log('e.target', e.target.value);
                                        if (updateFilter) {
                                            updateFilter(e.target.value);
                                        }
                                    }}
                                >
                                    <option value="all">All</option>
                                    <option value="embassy">Embassy</option>
                                    <option value="vfs">VFS</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <input type="text" placeholder={`Search`} className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]" onClick={() => updateSearch(search)}>
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
                        <button type="button" className="btn btn-primary" onClick={() => updateSearch(search)}>
                            Search
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-outline-primary" onClick={handleExport}>
                            Export to Excel
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={handleButtonClick}>
                            Import
                        </button>
                    </div>
                </div>
            </div>
            <div className="panel mt-5 overflow-hidden border-0 p-0">
                <div className="table-responsive">
                    <PaginationTable
                        title={title}
                        data={data}
                        meta={meta}
                        tableColumns={tableColumns}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleRestore={handleRestore}
                        handleListLine={handleListLine}
                        handleTracking={handleTracking}
                        setPage={setPage}
                        setLimit={setLimit}
                    />
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
            />

            {/* Modal for tracking Url */}
            <ReuseActionModal isOpen={isOpenTrack} setIsOpen={setIsOpenTrack} handleSave={handleTrackSave} width="max-w-2xl">
                <div className="flex  items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">Tracking Details</h5>
                    <button
                        onClick={() => {
                            setIsOpenTrack(false);
                            setTrack({ url: '', other: '' });
                            // setIsEdit(false);
                        }}
                        type="button"
                        className="text-white-dark hover:text-dark"
                    >
                        <IconX />
                    </button>
                </div>

                <div className="m-5 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="refno">Ref No</label>
                            <input id="refno" type="text" disabled={true} value={addData?.refno && addData.refno} placeholder="Ref No" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="url">Tracking URL </label>
                            <input id="url" value={track?.url} onChange={(e) => handleTrackInputChange(e)} type="text" placeholder="Enter Mobile Number" className="form-input" />
                        </div>
                    </div>
                </div>
                <div className="m-5 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="other">Others</label>
                            <input id="other" type="text" onChange={(e) => handleTrackInputChange(e)} value={track?.other} placeholder="Other Details" className="form-input" />
                        </div>
                    </div>
                </div>
                <div className=" float-end m-3 flex items-center justify-end">
                    <button
                        onClick={() => {
                            setIsOpenTrack(false);
                            setTrack({ url: '', other: '' });
                            // setIsEdit(false);
                        }}
                        type="button"
                        className="btn btn-outline-danger"
                    >
                        Cancel
                    </button>
                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleTrackSave}>
                        Save
                    </button>
                </div>
            </ReuseActionModal>

            {title == 'List Visa Application' && <ActionModalListLine isOpen={isOpenlistLine} setIsOpen={setIsOpenListLine} />}

            {/* {isImportOpen && <ImportExcel isOpen={isImportOpen} setIsOpen={setIsImportOpen} />} */}
            {/* <ReuseActionModal isOpen={isOpenAddNote} setIsOpen={setIsOpenAddNote} width="">
                <AddNote isOpen={isOpenAddNote} setIsOpen={setIsOpenAddNote} />
            </ReuseActionModal>  */}
        </>
    );
};

export default TableLayout;
