import IconX from '@/components/icon/icon-x';
import ComponentsFormsFileUploadMulti from '../../Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '../../Reusable/file-upload/components-forms-file-upload-single';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import ComponentsFormDatePickerBasic from './components-form-date-picker-basic';
import ComponentsFormDatePickerTime from './components-form-date-picker-time';
import TableLayout from '@/components/layouts/table-layout';
import { useEffect, useState, ChangeEvent } from 'react';
import AddNote from '@/components/popup/LeadListAddNote';
import IconUserPlus from '@/components/icon/icon-user-plus';
import PaginationTable from '@/components/Reusable/Table/PaginationTable';
import { showMessage } from '@/utils/notification';
import { isValidEmail, isValidPhoneNumber } from '@/utils/validator';
import { render } from '@headlessui/react/dist/utils/render';
import { useGetCountriesQuery } from '@/services/api/cms/countrySlice';
import { Country } from '@/entities/country.entity';
import { useGetCountryVisaTypesQuery } from '@/services/api/cms/countryVisaTypeSlice';
import { CountryVisaType } from '@/entities/country-visa-type.entity';
import { VisaType } from '@/entities/visa-type.entity';
import LeadActionModal from './LeadEmailSendModal';
import LeadEmailSendModal from './LeadEmailSendModal';

interface LeadManagementActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
    isEdit?: any;
    setIsEdit?: any;
    // followUps?: any;
    // setFollowUps?: any;
}
const LeadManagementActionModal: React.FC<LeadManagementActionModalProps> = ({ isEdit, setIsEdit, isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData }) => {
    // const { data: countries, isLoading, isFetching, isError, error } = useGetCountriesQuery({ page: 0, limit: 0 });

    const { data: countryVisaTypes } = useGetCountryVisaTypesQuery({ page: 0, limit: 0 });

    // console.log('country: ', countryVisaTypes);

    const [visaTypes, setVisaTypes] = useState([]);
    const [isMailOpen, setIsMailOpen] = useState(false);

    const [isOpenAddNote, setIsOpenAddNote] = useState(false);
    const [setMail, setSetEmail] = useState<string>();
    const [docPickup, setDocPickup] = useState(false);
    const [leadNote, setLeadNote] = useState<any>(''); // Add state for the textarea
    const [leadNotes, setLeadNotes] = useState<any[]>(addData.lead_note || []); // State for storing
    const [modalTitle, setModalTitle] = useState<string>('Add Note');
    const [actionButtonText, setActionButtonText] = useState<string>('Add Note');
    const [currentIndex, setCurrentIndex] = useState<number | null>(null); // Track index for editing
    const [nextFollowUp, setNextFollowUp] = useState<any>([]);
    const [isOpenNextFollowup, setIsOpenNextFollowup] = useState(false);
    const [addNextFollowUpData, setAddNextFollowUpData] = useState<any>({});
    const [followUps, setFollowUps] = useState(addData?.followups || []);

    useEffect(() => {
        setLeadNotes(addData.lead_note || []);
    }, [addData?.lead_note]);

    useEffect(() => {
        setFollowUps(addData.followups || []);
    }, [addData?.followups]);

    useEffect(() => {
        if (addData.email) {
            setSetEmail(addData.email || '');
        }
        if (addData.docpickupdate) {
            //setDocPickup(true)
        }
    }, [addData]);

    useEffect(() => {
        if (countryVisaTypes?.items && addData?.country?.id) {
            // const res = countryVisaTypes?.items.filter((item: any) => item?.id === addData?.country?.id).map((item: any) => item?.country_visa_types);
            const res = countryVisaTypes?.items
                .filter((item: any) => item?.id === addData.country.id)
                .map((item: any) => item?.country_visa_types)
                .flat(); // Flatten the array of arrays into a single array

            console.log('res', res);
            setVisaTypes(res);
        }
    }, [addData]);

    // const initialFollowUps = [
    //     {
    //         interactionType: 'Call',
    //         status: 'Open',
    //         nextFollowUp: '2024-07-01',
    //         remarks: 'First follow-up call',
    //         createdDate: '2024-06-01',
    //     },
    //     {
    //         interactionType: 'Email',
    //         status: 'In-progress',
    //         nextFollowUp: '2024-07-05',
    //         remarks: 'Sent email for document submission',
    //         createdDate: '2024-06-05',
    //     },
    // ];

    console.log('addData', addData, leadNotes, 'leadNote', leadNote);

    const tableColumnsFollowUp = [
        {
            accessor: 'followup_id',
            textAlign: 'left',
            title: 'S.NO',
            render: (row: any) => {
                return row.followup_id;
            },
        },
        { accessor: '', textAlign: 'left', title: 'Next FollowUp Date & Time', render: (row: any) => `${row.next_followup}, ${row.followup_time}` },
        // { accessor: 'followuptime', textAlign: 'left', title: 'Time' },
        {
            accessor: 'interaction',
            textAlign: 'left',
            title: 'Interaction Type',
            render: (row: any) => {
                return row.interaction;
            },
        },
        {
            accessor: 'remark',
            textAlign: 'left',
            title: 'Remark',
            render: (row: any) => {
                return row.followup_remark;
            },
        },
    ];

    const handleLeadNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setLeadNote({ ...leadNote, note: event.target.value });
    };
    const handleNextFollowUpChange = (e: any) => {
        const { value, id } = e.target;

        setAddNextFollowUpData({ ...addNextFollowUpData, [id]: value });
    };

    const handleEdit = (object: any) => {
        // setIsEdit(true);
        console.log('object', object);
        setIsOpenNextFollowup(true);
        setAddNextFollowUpData(object);
    };

    const handleFollowUpSave = (value: any) => {
        if (addNextFollowUpData.next_followup == '' || addNextFollowUpData.next_followup == null) {
            showMessage('Select Date  ', 'error');
            return false;
        }
        if (addNextFollowUpData.followup_time == '' || addNextFollowUpData.followup_time == null) {
            showMessage('Select Time ', 'error');
            return false;
        }
        if (addNextFollowUpData.interaction == '' || addNextFollowUpData.interaction == null) {
            showMessage('Select Interation ', 'error');
            return false;
        }

        if (addNextFollowUpData.followup_id) {
            //update user
            const updatedData = followUps.map((d: any) => (d.followup_id === addNextFollowUpData.followup_id ? { ...d, ...addNextFollowUpData } : d));
            setFollowUps(updatedData);
            setAddData({ ...addData, followups: updatedData });
            setIsOpenNextFollowup(false);
            setAddNextFollowUpData({});
            // return updatedData;
        } else {
            const maxUserId = followUps.length ? Math.max(...followUps.map((d: any) => d.followup_id)) : 0;

            const newFollowup = {
                ...addNextFollowUpData,
                followup_id: +maxUserId + 1,
            };
            setFollowUps([...followUps, newFollowup]);
            setAddData({
                ...addData,
                followups: addData.followups ? [...addData.followups, newFollowup] : [newFollowup],
            });
            setIsOpenNextFollowup(false);
            setAddNextFollowUpData({});
        }

        // setAddData({ ...addData });
        // setAddContactModal(false);
        // setIsEdit(false);
    };

    const handleButtonClickShowAddNote = () => {
        setIsOpenAddNote(true);
        setModalTitle('Add Note');
        setActionButtonText('Add Note');
        setLeadNote('');

        setCurrentIndex(null); // Reset index when adding a new note
    };

    const handleEditNoteClick = (index: number) => {
        setIsOpenAddNote(true);
        setModalTitle('Edit Note');
        setActionButtonText('Save');
        setLeadNote(leadNotes[index]);
        setCurrentIndex(index); // Set index for editing
    };

    const handleDeleteNote = (index: number) => {
        const updatedNotes = [...leadNotes];
        updatedNotes.splice(index, 1);
        setLeadNotes(updatedNotes);
    };

    const handleCloseModal = () => {
        setIsOpenAddNote(false);
        setModalTitle('Add Note');
        setActionButtonText('Add Note');
        setLeadNote('');
        setCurrentIndex(null); // Reset index when closing modal
    };

    const handleNoteAction = () => {
        if (modalTitle === 'Edit Note' && currentIndex !== null) {
            const updatedNotes = [...leadNotes];
            updatedNotes[currentIndex] = leadNote;
            setLeadNotes(updatedNotes);
            setAddData({ ...addData, lead_note: updatedNotes });
        } else {
            const updatedNotes = [...leadNotes, leadNote];
            setLeadNotes(updatedNotes);
            setAddData({ ...addData, lead_note: updatedNotes });
        }
        handleCloseModal();
    };

    return (
        <>
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-5xl">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">{isEdit ? 'Edit' : 'Add'} Lead</h5>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            setAddData({});
                            setIsEdit(false);
                        }}
                        type="button"
                        className="text-white-dark hover:text-dark"
                    >
                        <IconX />
                    </button>
                </div>

                <div className="p-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-5">
                            <ComponentsFormDatePickerBasic label="Create Date" id={'create_date'} isEdit={isEdit} setAddData={setAddData} addData={addData} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="name">Applicant Name </label>
                            <input id="name" type="text" onChange={(e) => handleInputChange(e)} value={addData?.name} placeholder="Enter Applicant Name" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="phone">Mobile Number </label>
                            <input id="phone" value={addData?.phone} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter Mobile Number" className="form-input" />
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="email">Email </label>
                            <input id="email" value={addData?.email} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter Email" className="form-input" />
                        </div>
                        <div className="dropdown mb-5">
                            <label htmlFor="country">Country</label>
                            <select
                                className="form-input"
                                defaultValue=""
                                id="country"
                                value={addData?.country}
                                onChange={(e) => {
                                    // console.log('e', e.target.value);
                                    const { items } = countryVisaTypes;
                                    // console.log('cou', items);
                                    const index = items.findIndex((cv: any) => cv.id == e.target.value);
                                    // console.log('countryVisaType[index]', items[index]);
                                    setVisaTypes(items[index].country_visa_types);
                                    handleInputChange(e);
                                }}
                            >
                                <option value="" disabled={true}>
                                    Country
                                </option>
                                {/* <option value="Canada">Canada</option>
                                <option value="India">India</option>
                                <option value="Usa">Usa</option> */}
                                {countryVisaTypes?.items.map((countryVisaType: any) => (
                                    <option
                                        key={countryVisaType.id}
                                        value={countryVisaType.id}
                                        // onClick={() => {
                                        //     console.log('hi', countryVisaType);
                                        //     setVisaTypes(countryVisaType.country_visa_types);
                                        // }}
                                    >
                                        {countryVisaType.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown mb-5">
                            <label htmlFor="residence_state">State of Residence</label>
                            <select className="form-input" defaultValue="" id="residence_state" value={addData?.residence_state} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Select State
                                </option>
                                <option value="Canada">Tamil Nadu</option>
                                <option value="India">Kernataka</option>
                                <option value="Usa">AP</option>
                            </select>
                        </div>
                        <div className="dropdown mb-5">
                            <label htmlFor="visa_type">Visa Type</label>
                            <select className="form-input" defaultValue="" id="visa_type" value={addData?.visa_type?.id} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Visa Type
                                </option>
                                {/* <option value="Business Type">Business Visa</option>
                                <option value="Vistor Visa">Vistor Visa</option> */}
                                {visaTypes.map((visaType: VisaType) => (
                                    <option key={visaType.id} value={visaType.id}>
                                        {visaType.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="number_of_applicants">No of Applicants</label>
                            <input
                                id="number_of_applicants"
                                value={addData?.number_of_applicants}
                                onChange={(e) => handleInputChange(e)}
                                type="text"
                                placeholder="Enter No of Applicants "
                                className="form-input"
                            />
                        </div>
                        <div className="mb-5">
                            <ComponentsFormDatePickerBasic label="Travel Date" id={'traveldate'} isEdit={isEdit} setAddData={setAddData} addData={addData} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown mb-5">
                            <label htmlFor="leadtype">Lead Type</label>
                            <select className="form-input" defaultValue="" id="leadtype" value={addData?.leadtype} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Lead Type
                                </option>
                                <option value="cold">Cold</option>
                                <option value="warm">Warm</option>
                                <option value="hot">Hot</option>
                            </select>
                        </div>

                        <div className="dropdown mb-5">
                            <label htmlFor="source">Source</label>
                            <select className="form-input" defaultValue="" id="source" value={addData?.source} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Source
                                </option>
                                <option value="Google">Google</option>
                                <option value="Website">Website</option>
                                <option value="Previous customer">Previous Customer</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div className="dropdown mb-5">
                            <label htmlFor="source">Assignee</label>
                            <select className="form-input" defaultValue="" id="assignee" value={addData?.assignee} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Assignee
                                </option>
                                <option value="Sanjay">Sanjay</option>
                                <option value="Bujji">Bujji</option>
                                <option value="raji">raji</option>
                                <option value="santhosh">Santhosh</option>
                            </select>
                        </div>
                    </div>

                    {isEdit && (
                        <>
                            {' '}
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                <div className="dropdown mb-5">
                                    <label htmlFor="stage">Stage</label>
                                    <select
                                        className="form-input"
                                        defaultValue=""
                                        id="stage"
                                        value={addData?.stage}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            if (e.target.value == 'Doc pick up') {
                                                setDocPickup(true);
                                            }
                                        }}
                                    >
                                        <option value="" disabled={true}>
                                            Stage
                                        </option>
                                        <option value="Fresh">Fresh</option>
                                        <option value="Attempted">Attempted</option>
                                        <option value="Interested">Interested</option>
                                        <option value="Not interested">Not interested</option>
                                        <option value="Doc pick up">Doc pick up</option>
                                        <option value="Doc picked up">Doc picked up</option>
                                    </select>
                                </div>
                                <div className="dropdown mb-5">
                                    <label htmlFor="status">Status</label>
                                    <select className="form-input" defaultValue="" id="status" value={addData?.status} onChange={(e) => handleInputChange(e)}>
                                        <option value="Status" disabled={true}>
                                            Status
                                        </option>
                                        <option value="open">Open</option>
                                        <option value="In-progress">In-progress</option>
                                        <option value="Closed">Closed</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>
                            </div>
                            {docPickup && (
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                    <div className="mb-5">
                                        <ComponentsFormDatePickerBasic label="Document pickup Date" id={'docpickupdate'} isEdit={isEdit} setAddData={setAddData} addData={addData} />
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="docpickupremarks">Remarks</label>
                                        <textarea
                                            id="docpickupremarks"
                                            rows={1}
                                            value={addData?.docpickupremarks}
                                            onChange={(e) => handleInputChange(e)}
                                            placeholder="Enter Remarks"
                                            className="form-textarea min-h-[10px] resize-none"
                                        ></textarea>
                                    </div>
                                </div>
                            )}
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                <div className="mb-5">
                                    <label htmlFor="mail">Email</label>
                                    <div className="flex">
                                        <input
                                            id="mail"
                                            type="text"
                                            placeholder="Enter Email"
                                            value={setMail}
                                            onChange={(e) => setSetEmail(e.target.value)}
                                            className="form-input ltr:rounded-r-none rtl:rounded-l-none"
                                        />
                                        <button type="button" onClick={() => setIsMailOpen(true)} className="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none">
                                            Send
                                        </button>
                                        {/*  */}
                                    </div>
                                </div>
                                {/* <div className="dropdown mb-5">
                                    <label htmlFor="leadmanage">Lead Managed by</label>
                                    <select className="form-input" defaultValue="" id="assignee" value={addData?.assignee} onChange={(e) => handleInputChange(e)}>
                                        <option value="" disabled={true}>
                                            Select Assignee
                                        </option>
                                        <option value="Sanjay">Sanjay</option>
                                        <option value="Bujji">Bujji</option>
                                        <option value="raji">raji</option>
                                        <option value="santhosh">Santhosh</option>
                                    </select>
                                </div> */}
                            </div>
                            <button
                                // onClick={handleSave}
                                type="button"
                                className="btn btn-primary mb-5 ltr:ml-4 rtl:mr-4"
                                onClick={() => setIsOpenNextFollowup(true)}
                            >
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Create Next Follow Up
                            </button>
                            <ActionModal isOpen={isOpenNextFollowup} setIsOpen={setIsOpenNextFollowup} handleSave={handleSave} width="max-w-2xl">
                                <div className="flex  items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <h5 className="text-lg font-bold">Add Next FollowUp</h5>
                                    <button
                                        onClick={() => {
                                            setIsOpenNextFollowup(false);
                                            setAddNextFollowUpData({});
                                            // setIsEdit(false);
                                        }}
                                        type="button"
                                        className="text-white-dark hover:text-dark"
                                    >
                                        <IconX />
                                    </button>
                                </div>
                                <div className="m-5 grid grid-cols-1 gap-5  md:grid-cols-2 ">
                                    <div className=" ">
                                        <ComponentsFormDatePickerBasic
                                            label="Next Follow-up Date "
                                            id={'next_followup'}
                                            isEdit={isEdit}
                                            setAddData={setAddNextFollowUpData}
                                            addData={addNextFollowUpData}
                                        />
                                    </div>
                                    <div className="">
                                        <ComponentsFormDatePickerTime id={'followup_time'} isEdit={isEdit} setAddData={setAddNextFollowUpData} addData={addNextFollowUpData} />
                                    </div>
                                </div>
                                <div className="m-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div className="dropdown mb-5">
                                        <label htmlFor="interaction">Type of Interaction*</label>
                                        <select className="form-input" defaultValue="" id="interaction" value={addNextFollowUpData?.interaction} onChange={(e) => handleNextFollowUpChange(e)}>
                                            <option value="" disabled={true}>
                                                Type of Interaction
                                            </option>
                                            <option value="SMS">SMS</option>
                                            <option value="Call">Call</option>
                                            <option value="Email">Email</option>
                                            <option value="Whatapp">Whatapp</option>
                                        </select>
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="followupremark">Followup Remarks</label>
                                        <textarea
                                            id="followup_remark"
                                            rows={1}
                                            value={addNextFollowUpData?.followup_remark}
                                            onChange={(e) => handleNextFollowUpChange(e)}
                                            placeholder="Enter FollowUp Remarks"
                                            className="form-textarea
                                min-h-[10px] resize-none"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className=" float-end m-3 flex items-center justify-end">
                                    <button
                                        onClick={() => {
                                            setIsOpenNextFollowup(false);
                                            setAddNextFollowUpData({});
                                            // setIsEdit(false);
                                        }}
                                        type="button"
                                        className="btn btn-outline-danger"
                                    >
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleFollowUpSave}>
                                        Save
                                    </button>
                                </div>
                            </ActionModal>
                            {followUps?.length !== 0 && (
                                <PaginationTable data={followUps} tableColumns={tableColumnsFollowUp} handleEdit={handleEdit} handleDelete={handleDeleteNote} title="Customer Details" />
                            )}
                            {/* Add the table here */}
                            {/* <div className="mt-8">
                                <h5 className="mb-4 text-lg font-bold">Follow Up History</h5>
                                <table className="min-w-full border bg-white">
                                    <thead>
                                        <tr>
                                            <th className="border-b px-4 py-2">Follow Up No</th>
                                            <th className="border-b px-4 py-2">Interaction Type</th>
                                            <th className="border-b px-4 py-2">Status</th>
                                            <th className="border-b px-4 py-2">Next Follow Up</th>
                                            <th className="border-b px-4 py-2">Remarks</th>
                                            <th className="border-b px-4 py-2">Created Date</th>
                                            <th className="border-b px-4 py-2">Assignee</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        Render follow-up details here
                                        {followUps.map((followUp, index) => (
                                            <tr key={index}>
                                                <td className="border-b px-4 py-2">{index + 1}</td>
                                                <td className="border-b px-4 py-2">{followUp.interactionType}</td>
                                                <td className="border-b px-4 py-2">{followUp.status}</td>
                                                <td className="border-b px-4 py-2">{followUp.nextFollowUp}</td>
                                                <td className="border-b px-4 py-2">{followUp.remarks}</td>
                                                <td className="border-b px-4 py-2">{followUp.createdDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> */}
                            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-1">
                                <div className="mb-5">
                                    <label htmlFor="leadnote" style={{ display: 'inline-block' }}>
                                        Lead Note
                                    </label>
                                    <button className="btn btn-primary ml-5" style={{ marginLeft: '20px', display: 'inline-block' }} onClick={handleButtonClickShowAddNote}>
                                        Add Note
                                    </button>

                                    <div className="mt-3">
                                        {leadNotes?.map((item: any, index: number) => (
                                            <div key={index} className="mt-2 flex items-center justify-between rounded border p-2">
                                                <div>{item?.note}</div>
                                                <div className="flex items-center">
                                                    <button className="btn btn-outline-primary btn-sm mr-2" onClick={() => handleEditNoteClick(index)}>
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteNote(index)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <ActionModal isOpen={isOpenAddNote} setIsOpen={setIsOpenAddNote} handleSave={handleNoteAction} width="max-w-2xl">
                                        <div>
                                            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                                <h5 className="text-lg font-bold">{modalTitle}</h5>
                                                <button onClick={handleCloseModal} type="button" className="text-white-dark hover:text-dark">
                                                    <IconX />
                                                </button>
                                            </div>
                                            <div className="p-5">
                                                <textarea
                                                    id="leadNote"
                                                    onChange={handleLeadNoteChange}
                                                    value={leadNote?.note}
                                                    placeholder="Enter your note here"
                                                    className="min-h-[150px] w-full rounded-lg border p-2 outline-none"
                                                />
                                                <div className="mt-3">
                                                    <button onClick={handleNoteAction} className="btn btn-primary">
                                                        {actionButtonText}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </ActionModal>
                                </div>

                                {/* <textarea
                                        id="leadnote"
                                        rows={3}
                                        value={addData?.leadnote}
                                        onChange={(e) => handleInputChange(e)}
                                        placeholder="Enter Lead Note"
                                        className="form-textarea
                                min-h-[80px] resize-none"
                                    ></textarea> */}
                            </div>
                        </>
                    )}
                    <div className="mt-8 flex items-center justify-end">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setAddData({});
                                setIsEdit(false);
                            }}
                            type="button"
                            className="btn btn-outline-danger"
                        >
                            Cancel
                        </button>
                        <button onClick={handleSave} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                            Save
                        </button>
                    </div>
                </div>
            </ActionModal>
            <LeadEmailSendModal isOpen={isMailOpen} setIsOpen={setIsMailOpen} handleSave={handleSave} handleInputChange={handleInputChange} setAddData={setAddData} />
        </>
    );
};

export default LeadManagementActionModal;
