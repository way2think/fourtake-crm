'use client';
import { useState } from 'react';
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
import { PaginationMeta } from '@/types/pagination';
import { useGetOneVisaApplicantGroupQuery, useRestoreApplicantMutation, useUpdateVisaApplicantGroupMutation, visaProcessSlice } from '@/services/api/visaProcessSlice';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { handleUpdate } from '@/utils/rtk-http';
import { useGetVisaRequirementsQuery } from '@/services/api/dashboardSlice';
import { RefreshCw } from 'lucide-react';
import RefreshButton from '../Reusable/RefreshButton';

interface TableLayoutProps {
    title: string;
    data: object[];
    meta: PaginationMeta;
    tableColumns: object[];
    ActionModal: any;
    Filtersetting?: any;
    handleSubmit?: any;
    exportColumns?: string[];
    handleDelete?: any;
    filterby: any;
    ActionModalListLine?: any;
    setSearch?: any;
    filter?: string;
    setFilter?: Function;
    setPage: Function;
    setLimit: Function;
    visaChecklistData?: any;
    handleRestore?: any;
}
interface AddDataProps {
    refno?: any;
    status?: any;
    id?: number;
    group_id: number;
}
const TableLayout: React.FC<TableLayoutProps> = ({
    title,
    data,
    meta,
    visaChecklistData,
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
    handleRestore,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [isOpenAddNote, setIsOpenAddNote] = useState(false);
    const [isEditAddNote, setIsEditAddNote] = useState(false);

    const [isOpenlistLine, setIsOpenListLine] = useState(false);

    const [search, setSearch] = useState<any>('');
    const [filterItem, setFilterItem] = useState(data);
    const [addData, setAddData] = useState<AddDataProps | any>({ state_of_residence: 'Karnataka' });
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

    const { data: oneVisaApplicantsGroup } = useGetOneVisaApplicantGroupQuery(encodeURIComponent(addData?.group_id), {
        skip: !addData?.group_id,
    });

    const { data: visaRequirements } = useGetVisaRequirementsQuery({
        countryId: String(addData?.country?.id),
        visaTypeId: String(addData?.visa_type?.id),
        stateOfResidence: addData?.state_of_residence,
    });

    const [updateVisaApplicant, {}] = useUpdateVisaApplicantGroupMutation();
    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

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

    useEffect(() => {
        if (addData.tracking_detail && addData.id) {
            setTrack(addData.tracking_detail);
        }
    }, [addData.tracking_detail]);

    const handleEdit = (object: any) => {
        if (title == 'List Visa Application') {
            router.push(`/manage-visa/${object.group_id}`);
        } else {
            setIsEdit(true);
            setIsOpen(true);
            setAddData(object);
        }
    };

    const handleTracking = (object: any) => {
        setAddData(object);
        setIsOpenTrack(true);
    };

    const handleDocChecklist = (row: any) => {
        router.push(`/check-requirements?countryId=${row.country.id}&visaTypeId=${row.visa_type.id}&stateOfResidence=${row.state_of_residence}`);

        // if (visaRequirements && visaRequirements.length > 0) {
        //     const checklist = visaRequirements[0]?.checklist || [];

        //     // Create a new jsPDF document
        //     const doc = new jsPDF('portrait', 'pt', 'a4');

        //     // Set font size and add title
        //     doc.setFontSize(16);
        //     doc.text('Visa Requirements Checklist', 40, 50);

        //     // Add checklist items
        //     doc.setFontSize(12);
        //     checklist.forEach((item: any, index: any) => {
        //         doc.text(`${index + 1}. ${item}`, 40, 80 + index * 20); // Adjust spacing as needed
        //     });

        //     // Save or display the PDF
        //     const pdfBlob = doc.output('blob');
        //     const pdfUrl = URL.createObjectURL(pdfBlob);
        //     window.open(pdfUrl, '_blank'); // Open the PDF in a new tab
        // }
    };

    const handleTrackInputChange = (e: any) => {
        const { value, id } = e.target;

        setTrack({ ...track, [id]: value });
    };

    const handleInputChange = (e: any) => {
        const { value, id, options } = e.target;

        if (options) {
            // Handling multiple select options - array
            // const selectedOptions = Array.from(options)
            //     .filter((option) => (option as HTMLOptionElement).selected)
            //     .map((option) => (option as HTMLOptionElement).value)
            //     .join(', '); // Join selected options with a comma

            // setAddData((prevData) => ({
            //     ...prevData,
            //     [id]: selectedOptions,
            // }));

            const selectedOptions = Array.from(options)
                .filter((option) => (option as HTMLOptionElement).selected)
                .map((option) => {
                    const id = (option as HTMLOptionElement).value; // Use value or id based on your needs
                    // Log each selected ID
                    return id;
                })
                .join(','); // Join IDs into a comma-separated string

            setAddData((prevData: any) => ({
                ...prevData,
                [id]: selectedOptions, // Store as a comma-separated string
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
        // const filteredObj = Object.fromEntries(Object.entries(addData).filter(([key, value]) => value !== null && value !== '' && value !== undefined));

        // passing addData, without removing null values, because during update we will be emptying some fields

        const isSuccess = await handleSubmit(addData);

        if (isSuccess) {
            setIsOpen(false);
            setAddData({ refno: '', status: '', service_type: title === 'Lead List' ? 'visa service' : '' });

            if (title == 'Lead List') {
                //alert("Navigate")

                // if (addData?.status === 'Done') {
                //     router.push({
                //         pathname: '/manage-visa',
                //         query: { addData: JSON.stringify(addData) },
                //     } as unknown as string);
                // }
                //Navigate to Manage Visa Page
                if (addData?.status === 'Done') {
                    router.push(`/manage-visa?addData=${encodeURIComponent(JSON.stringify(addData))}`);
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

        if (oneVisaApplicantsGroup) {
            const updatedData = {
                ...oneVisaApplicantsGroup,
                updated_time: new Date(),
                visa_applicants: oneVisaApplicantsGroup?.visa_applicants.map((applicant: any) => (applicant.id === addData?.id ? { ...applicant, tracking_detail: track } : applicant)),
            };

            return handleUpdate({
                updateMutation: updateVisaApplicant,
                value: updatedData,
                items: oneVisaApplicantsGroup,
                meta: {},
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaProcessSlice,
                endpoint: 'getVisaApplicants',
            });
        }
    };

    const handleFilter = () => {
        setShowCustomizer(true);
        setFilterTitle('Filter Applied');
    };

    const handleListLine = (object: any) => {
        // Implement the logic to handle the deletion of the row

        setIsOpenListLine(true);
        setAddData(object);
        // You can add your deletion logic here, e.g., updating the state, making an API call, etc.
    };

    const handleRestoreApplicant = (applicant: any) => {
        if (applicant.id) {
            const updatedData = filterItem.filter((item: any) => item.id !== applicant.id);
            setFilterItem(updatedData);
            handleRestore(applicant);
        }
    };

    console.log('AddData', addData);

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-extrabold">{title}</h2>
                <div className="flex w-full  flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <RefreshButton />
                        {title !== 'Country Visa Types' && title !== 'Deleted Application' && title !== 'List Visa Application' && title !== 'Deleted Visa Application' && (
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

                    <div>
                        <button type="button" className="btn btn-primary" onClick={() => updateSearch(search)}>
                            Search
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
                    {/* Export will be uncommented once the client has updated all the data, then will modify export all the columns to import to main db (prod)  */}
                    {/* <div>
                        <button type="button" className="btn btn-outline-primary" onClick={handleExport}>
                            Export to Excel
                        </button>
                    </div>  */}
                    {/* <div>
                        <button type="button" className="btn btn-primary" onClick={()=>setIsImportOpen(true)}>
                            Import
                        </button>
                    </div> */}
                </div>
            </div>
            <div className="panel mt-5 overflow-hidden border-0 p-0">
                <div className="table-responsive">
                    <PaginationTable
                        title={title}
                        data={filterItem}
                        meta={meta}
                        tableColumns={tableColumns}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleRestore={handleRestore}
                        handleListLine={handleListLine}
                        handleTracking={handleTracking}
                        setPage={setPage}
                        setLimit={setLimit}
                        handleDocChecklist={handleDocChecklist}
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
                visaChecklistData={visaChecklistData}
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
                            <input id="refno" type="text" disabled={true} value={addData?.id} placeholder="Ref No" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="url">Tracking URL </label>
                            {!addData?.tracking_detail?.url && (
                                <input id="url" value={track?.url} onChange={(e) => handleTrackInputChange(e)} type="text" placeholder="Enter Tracking URL" className="form-input" />
                            )}

                            {addData?.tracking_detail?.url && (
                                <a href={addData?.tracking_detail?.url} target="_blank" className="text-primary">
                                    {addData?.tracking_detail?.url}
                                </a>
                            )}
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

            {title == 'List Visa Application' && <ActionModalListLine isOpen={isOpenlistLine} setIsOpen={setIsOpenListLine} addData={addData} setAddData={setAddData} />}

            {/* {isImportOpen && <ImportExcel isOpen={isImportOpen} setIsOpen={setIsImportOpen} />} */}
            {/* <ReuseActionModal isOpen={isOpenAddNote} setIsOpen={setIsOpenAddNote} width="">
                <AddNote isOpen={isOpenAddNote} setIsOpen={setIsOpenAddNote} />
            </ReuseActionModal>  */}
        </>
    );
};

export default TableLayout;
