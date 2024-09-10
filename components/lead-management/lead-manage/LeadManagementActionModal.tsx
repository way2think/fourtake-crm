import IconX from '@/components/icon/icon-x';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import ComponentsFormDatePickerBasic from './components-form-date-picker-basic';
import ComponentsFormDatePickerTime from './components-form-date-picker-time';
import { useEffect, useState, ChangeEvent } from 'react';
import IconUserPlus from '@/components/icon/icon-user-plus';
import PaginationTable from '@/components/Reusable/Table/PaginationTable';
import { showMessage } from '@/utils/notification';
import { useGetCountryVisaTypesQuery } from '@/services/api/cms/countryVisaTypeSlice';
import { VisaType } from '@/entities/visa-type.entity';
import EmailSendModal from './EmailSendModal';
import { stateCityData } from '@/utils/constant';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user.store';
import { User } from '@/entities/user.entity';
import { useGetAllEmployeesQuery, useGetUsersQuery } from '@/services/api/userSlice';

interface LeadManagementActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
    isEdit?: any;
    setIsEdit?: any;
    visaChecklistData?: any;
    // followUps?: any;
    // setFollowUps?: any;
}
const LeadManagementActionModal: React.FC<LeadManagementActionModalProps> = ({ isEdit, setIsEdit, isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData, visaChecklistData }) => {
    // const { data: countries, isLoading, isFetching, isError, error } = useGetCountriesQuery({ page: 0, limit: 0 });

    const { data: countryVisaTypes } = useGetCountryVisaTypesQuery({ page: 0, limit: 0 });

    // console.log('country: ', countryVisaTypes?.items);

    const [visaTypes, setVisaTypes] = useState([]);
    const [isMailOpen, setIsMailOpen] = useState(false);
    const [states] = useState(Object.keys(stateCityData).sort());
    const [isOpenAddNote, setIsOpenAddNote] = useState(false);
    const [setMail, setSetEmail] = useState<string>();
    const [docPickup, setDocPickup] = useState(false);
    const [leadNote, setLeadNote] = useState<any>(''); // Add state for the textarea
    const [leadNotes, setLeadNotes] = useState<any[]>(addData.lead_note || []); // State for storing
    const [modalTitle, setModalTitle] = useState<string>('Add Note');
    const [actionButtonText, setActionButtonText] = useState<string>('Add Note');
    const [currentIndex, setCurrentIndex] = useState<number | null>(null); // Track index for editing
    const [isOpenNextFollowup, setIsOpenNextFollowup] = useState(false);
    const [addNextFollowUpData, setAddNextFollowUpData] = useState<any>({});
    const [followUps, setFollowUps] = useState(addData?.followups || []);

    // const { data: employeelist } = useGetAllEmployeesQuery({ page: 0, limit: 0 });
    const { data: assigneeList } = useGetUsersQuery({ page: 0, limit: 0, filterbyrole: 'employee, admin' });
    // console.log('employeelist', assigneeList?.items);
    const user = useSelector(selectUser) as User;

    const role = user?.role || 'guest';

    // console.log('user', user, role);

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
        if (addData.doc_pickup_date) {
            setDocPickup(true);
        }
    }, [addData]);

    useEffect(() => {
        if (countryVisaTypes?.items && addData?.country?.id) {
            // const res = countryVisaTypes?.items.filter((item: any) => item?.id === addData?.country?.id).map((item: any) => item?.country_visa_types);
            const res = countryVisaTypes?.items
                .filter((item: any) => item?.id === addData.country.id)
                .map((item: any) => item?.country_visa_types)
                .flat(); // Flatten the array of arrays into a single array
            setVisaTypes(res);
        }
    }, [addData]);

    // console.log('addData1', addData);

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
        setAddData({ ...addData, lead_note: updatedNotes });
    };

    const handleDeleteFollowUp = (data: any) => {
        let updatedFollowups = [...followUps];

        // Corrected filter logic to return a boolean value
        updatedFollowups = updatedFollowups.filter((item) => item.followup_id !== data.followup_id);

        setFollowUps(updatedFollowups);
        // console.log('index', data, followUps, updatedFollowups);

        // Assuming addData is an object with a followups property
        setAddData({ ...addData, followups: updatedFollowups });
    };

    const handleCloseModal = () => {
        setIsOpenAddNote(false);
        setModalTitle('Add Note');
        setActionButtonText('Add Note');
        setLeadNote('');
        setCurrentIndex(null); // Reset index when closing modal
    };

    {
        if (isMailOpen) {
            return <EmailSendModal addData={addData} isOpen={isMailOpen} setIsOpen={setIsMailOpen} setAddData={setAddData} visaChecklistData={visaChecklistData} />;
        }
    }

    const handleNoteAction = () => {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds

        if (modalTitle === 'Edit Note' && currentIndex !== null) {
            const updatedNotes = [...leadNotes];
            updatedNotes[currentIndex] = {
                ...leadNote,
                created_time: updatedNotes[currentIndex].created_time, // Retain the original created_time during edit
            };
            setLeadNotes(updatedNotes);
            setAddData({ ...addData, lead_note: updatedNotes });
        } else {
            const newNote = {
                ...leadNote,
                created_time: currentTimeInSeconds, // Set created_time in seconds when creating a new note
                created_by: user.username,
            };
            const updatedNotes = [...leadNotes, newNote];
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
                            <ComponentsFormDatePickerBasic label="Create Date" id={'create_date'} isEdit={isEdit} setAddData={setAddData} addData={addData} currentDate={new Date()} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="name">Applicant Name </label>
                            <input id="name" type="text" onChange={(e) => handleInputChange(e)} value={addData?.name} placeholder="Enter Applicant Name" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email">Email </label>
                            <input id="email" value={addData?.email} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter Email" className="form-input" />
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="phone">Mobile Number </label>
                            <input id="phone" value={addData?.phone} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter Mobile Number" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="other_phone">Other Mobile Number (Foreign) </label>
                            <input id="other_phone" value={addData?.other_phone} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter Other Mobile Number" className="form-input" />
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown mb-5">
                            <label htmlFor="country">Country</label>
                            <select
                                // disabled={role == 'employee' ? true : false}
                                className="form-input"
                                defaultValue=""
                                id="country"
                                value={addData?.country?.id}
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
                        <div className="dropdown mb-5">
                            <label htmlFor="visa_type">Visa Type</label>
                            <select
                                className="form-input"
                                defaultValue=""
                                id="visa_type"
                                value={addData?.visa_type?.id}
                                disabled={role == 'employee' ? true : false}
                                onChange={(e) => handleInputChange(e)}
                            >
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
                        <div className="dropdown mb-5">
                            <label htmlFor="residence_state">State of Residence</label>
                            <select
                                className="form-input"
                                defaultValue=""
                                id="residence_state"
                                value={addData?.residence_state}
                                onChange={(e) => handleInputChange(e)}
                                disabled={role == 'employee' ? true : false}
                            >
                                <option value="" disabled={true}>
                                    Select State
                                </option>

                                {states.map((state) => (
                                    <option value={state}>{state}</option>
                                ))}
                            </select>
                        </div>

                        <div className="dropdown mb-5">
                            <label htmlFor="source">Assignee</label>
                            <select
                                className="form-input"
                                defaultValue=""
                                id="assignee"
                                value={addData?.assignee?.id}
                                onChange={(e) => {
                                    setAddData((prev: any) => ({ ...prev, assignee: { id: e.target.value, username: e.target.options[e.target.selectedIndex].innerText } }));
                                }}
                            >
                                <option value="" disabled={true}>
                                    Assignee
                                </option>

                                {assigneeList?.items?.map((item: any) => (
                                    <option value={item.id}>{item.username}</option>
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
                                onChange={(e) => {
                                    setAddData({ ...addData, number_of_applicants: +e.target.value });
                                }}
                                type="text"
                                placeholder="Enter No of Applicants "
                                className="form-input"
                            />
                        </div>
                        <div className="mb-5">
                            <ComponentsFormDatePickerBasic label="Travel Date" id={'travel_date'} isEdit={isEdit} setAddData={setAddData} addData={addData} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown mb-5">
                            <label htmlFor="lead_type">Lead Type</label>
                            <select className="form-input" defaultValue="" id="lead_type" value={addData?.lead_type} onChange={(e) => handleInputChange(e)}>
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
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown mb-5">
                            <label htmlFor="service_type">Service Type</label>
                            <select
                                className="form-input"
                                defaultValue=""
                                id="service_type"
                                value={addData?.service_type}
                                onChange={(e) => {
                                    // handleInputChange(e);
                                    setAddData({ ...addData, service_type: e.target.value, other_service: '' });
                                }}
                            >
                                <option value="" disabled={true}>
                                    Service Type
                                </option>
                                <option value="visa service">Visa Service</option>
                                <option value="appointment/slot booking service">Appointment / Slot Booking Service</option>
                                <option value="attestation service">Attestation Service (HRD/MEA/DM)</option>
                                <option value="passport service">Passport Service</option>
                                <option value="forex service">Forex Service </option>
                                <option value="travel insurance">Travel Insurance</option>
                                <option value="flight itinerary">Flight Itinerary</option>
                                <option value="hotel itinerary">Hotel Itinerary</option>

                                <option value="others">Others</option>
                            </select>
                        </div>
                        {addData?.service_type == 'others' && (
                            <div className="mb-5">
                                <label htmlFor="other_service">Other Service </label>
                                <input
                                    id="other_service"
                                    type="text"
                                    onChange={(e) => handleInputChange(e)}
                                    value={addData?.other_service}
                                    placeholder="Enter Other Service Details"
                                    className="form-input"
                                />
                            </div>
                        )}
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
                                        <option value="Open">Open</option>
                                        <option value="In-progress">In-progress</option>
                                        <option value="Closed">Closed</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>
                            </div>
                            {docPickup && (
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                    <div className="mb-5">
                                        <ComponentsFormDatePickerBasic
                                            label="Document pickup Date"
                                            id={'doc_pickup_date'}
                                            isEdit={isEdit}
                                            setAddData={setAddData}
                                            addData={addData}
                                            disable={addData?.stage === 'Doc picked up'}
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="doc_pickup_remark">Document PickUp Remarks</label>
                                        <textarea
                                            id="doc_pickup_remark"
                                            rows={1}
                                            disabled={addData?.stage == 'Doc picked up' ? true : false}
                                            value={addData?.doc_pickup_remark}
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
                                            value={addData?.email}
                                            onChange={(e) => handleInputChange(e)}
                                            // onChange={(e) => setSetEmail(e.target.value)}
                                            className="form-input ltr:rounded-r-none rtl:rounded-l-none"
                                        />
                                        <button type="button" onClick={() => setIsMailOpen(true)} className="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none">
                                            Send
                                        </button>
                                    </div>
                                </div>
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
                                            <option value="Applicant visiting">Applicant visiting</option>
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
                                <PaginationTable data={followUps} tableColumns={tableColumnsFollowUp} handleEdit={handleEdit} handleDelete={handleDeleteFollowUp} title="Customer Details" />
                            )}
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
                                            // <div key={index} className="mt-2 flex items-center justify-between rounded border p-2">
                                            //     <div>{item?.note}</div>
                                            //     {(role === 'super_admin' || role === 'admin') && (
                                            //         <div className="flex items-center">
                                            //             <button className="btn btn-outline-primary btn-sm mr-2" onClick={() => handleEditNoteClick(index)}>
                                            //                 Edit
                                            //             </button>
                                            //             <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteNote(index)}>
                                            //                 Delete
                                            //             </button>
                                            //         </div>
                                            //     )}

                                            //     <div>Create Date: item.created_time, Created By: item.created_by</div>
                                            // </div>

                                            <div key={index} className="mt-2 flex flex-col rounded border p-2">
                                                <div className="flex items-center justify-between">
                                                    <div>{item?.note}</div>
                                                    {(role === 'super_admin' || role === 'admin') && (
                                                        <div className="flex items-center">
                                                            <button className="btn btn-outline-primary btn-sm mr-2" onClick={() => handleEditNoteClick(index)}>
                                                                Edit
                                                            </button>
                                                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteNote(index)}>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-2 text-right font-mono text-sm text-blue-500">
                                                    Created By: {item.created_by} - Created Date: {item.created_time}
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
                                                {leadNote.created_time && <p>Created Time: {new Date(leadNote.created_time * 1000).toLocaleString()}</p>}
                                                <br />

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
        </>
    );
};

export default LeadManagementActionModal;
