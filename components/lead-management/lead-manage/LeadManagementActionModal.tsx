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
import { stateCityData, timeStampFormat } from '@/utils/constant';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user.store';
import { User } from '@/entities/user.entity';
import { useGetAllEmployeesQuery, useGetUsersQuery } from '@/services/api/userSlice';
import ComponentsFormDatePickerRange from './components-form-date-picker-range';
import ComponentsFormsSelectMultiselect from '@/components/Reusable/select/components-forms-select-multiselect';
import IconInfoCircle from '@/components/icon/icon-info-circle';
import { useLazyGetVisaApplicantsQuery } from '@/services/api/visaProcessSlice';
import { useRouter } from 'next/navigation';

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

interface OptionType {
    value: string;
    label: string;
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
    const [dateFilter, setDateFilter] = useState<any>();
    const [buttonContent, setButtonContent] = useState('');
    const [visaApplicationId, setVisaApplicationId] = useState<string | any>();

    // const { data: employeelist } = useGetAllEmployeesQuery({ page: 0, limit: 0 });
    const { data: assigneeList } = useGetUsersQuery({ page: 0, limit: 0, filterbyrole: 'employee, admin' });
    // console.log('employeelist', assigneeList?.items);
    const user = useSelector(selectUser) as User;
    const [getLeadIdByFilter, {}] = useLazyGetVisaApplicantsQuery();

    const role = user?.role || 'guest';
    const router = useRouter();

    useEffect(() => {
        if (!isEdit) {
            setAddData({ ...addData, service_type: 'visa service' });
        }
    }, []);

    const attestation_document_options: OptionType[] = [
        { value: 'education certificate ', label: 'Education Certificate ' },
        { value: 'marriage certificate', label: 'Marriage Certificate' },
        { value: 'PCC', label: 'PCC' },
        { value: 'birth certificate', label: 'Birth Certificate' },
        { value: 'product certificate ', label: 'Product Certificate ' },
        { value: 'POA ', label: 'POA' },
    ];

    const attestation_servicetype_options: OptionType[] = [
        { value: 'public notary', label: 'Public Notary' },
        { value: 'SDM', label: 'SDM (Sub Divisional Magistrate)' },
        { value: 'HRD', label: 'HRD Att.' },
        { value: 'MEA', label: 'MEA Att.' },
        { value: 'embassy att.', label: 'Embassy Att.' },
        { value: 'apostille', label: 'Apostille ' },
        { value: 'mosadaqa', label: 'Mosadaqa ' },
        { value: 'chambers of commerce letter ', label: 'Chambers of Commerce Letter' },
        { value: 'other services  ', label: 'Other Services ' },
    ];

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
        if (countryVisaTypes?.items && addData?.destination_country?.id) {
            // const res = countryVisaTypes?.items.filter((item: any) => item?.id === addData?.country?.id).map((item: any) => item?.country_visa_types);
            const res = countryVisaTypes?.items
                .filter((item: any) => item?.id === addData?.destination_country.id)
                .map((item: any) => item?.country_visa_types)
                .flat(); // Flatten the array of arrays into a single array
            setVisaTypes(res);
        }
    }, [addData]);

    useEffect(() => {
        const leadIdFilter = { filterByLeadid: addData?.id };
        console.log('leadIdFilter', leadIdFilter); //
        if (addData.status === 'Done') {
            getLeadIdByFilter(leadIdFilter)
                .unwrap()
                .then((response) => {
                    console.log('response', response);
                    if (response.items.length == 1) {
                        setButtonContent('Edit');
                        setVisaApplicationId(response.items[0].id);
                    }

                    if (response.items.length > 1) {
                        setButtonContent('Create');
                    }
                })
                .catch((error) => {
                    console.log('error', error);
                });
        }
    }, [addData.status, addData.id]);

    console.log('addData1', addData);

    const tableColumnsFollowUp = [
        {
            accessor: 'followup_id',
            textAlign: 'left',
            title: 'S.NO',
            render: (row: any) => {
                return row?.followup_id;
            },
        },
        { accessor: '', textAlign: 'left', title: 'Next FollowUp Date & Time', render: (row: any) => `${row?.next_followup}, ${row?.followup_time}` },
        // { accessor: 'followuptime', textAlign: 'left', title: 'Time' },
        {
            accessor: 'interaction',
            textAlign: 'left',
            title: 'Interaction Type',
            render: (row: any) => {
                return row?.interaction;
            },
        },
        {
            accessor: 'remark',
            textAlign: 'left',
            title: 'Remark',
            render: (row: any) => {
                return row?.followup_remark;
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

    const handleStatusButtonClick = () => {
        if (buttonContent == 'Create') {
            router.push('/manage-visa');
        }
        if (buttonContent == 'Edit') {
            router.push(`/manage-visa/${encodeURIComponent(visaApplicationId)}`);
        }
    };

    return (
        <>
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-5xl">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">{isEdit ? 'Edit' : 'Add'} Lead</h5>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            setAddData(() => {
                                return !isEdit && { service_type: 'visa service' };
                            });
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
                            <label htmlFor="name">Applicant Name* </label>
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

                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="dropdown mb-5">
                            <label htmlFor="service_type">Service Type</label>
                            <select
                                className="form-input"
                                // defaultValue="visa service"
                                id="service_type"
                                value={addData?.service_type}
                                onChange={(e) => {
                                    // handleInputChange(e);
                                    setAddData({ ...addData, service_type: e.target.value, other_service: '' });
                                }}
                            >
                                <option value="" disabled={true}>
                                    -- Select Service Type --
                                </option>
                                <option value="visa service">Visa Service</option>
                                <option value="appointment/slot booking service">Appointment / Slot Booking Service</option>
                                <option value="attestation service">Attestation Service (HRD/MEA/DM)</option>
                                <option value="passport service">Passport Service</option>
                                <option value="forex service">Forex Service </option>
                                <option value="travel insurance">Travel Insurance</option>
                                <option value="flight itinerary">Flight Itinerary</option>
                                <option value="hotel itinerary"> Hotel Itinerary </option>
                                <option value="photographs">Photographs</option>
                                <option value="courier">Courier </option>
                                <option value="passport collection">Passport Collection</option>
                                <option value="documents pickup & delivery">Documents Pickup & Delivery</option>
                                <option value="visa application submission & collection - applicants">Visa Application Submission & Collection - Applicants</option>
                                <option value="visa application submission & collection - associate partners B2B">Visa Application Submission & Collection - Associate Partners B2B</option>
                                <option value="DS-160 Form">DS-160 Form </option>

                                <option value="others">Others</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2">
                        {(addData.service_type == 'visa service' ||
                            addData.service_type == 'appointment/slot booking service' ||
                            addData.service_type == 'attestation service' ||
                            addData.service_type == 'forex service') && (
                            <div className="dropdown mb-5">
                                <label htmlFor="destination_country">{addData.service_type == 'forex service' ? ' Currency Required' : 'Destination Country'} </label>
                                <select
                                    // disabled={role == 'employee' ? true : false}
                                    className="form-input"
                                    defaultValue=""
                                    id="destination_country"
                                    value={addData?.destination_country?.id}
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
                                        -- Select Country --
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
                        )}
                        {(addData.service_type == 'visa service' || addData.service_type == 'appointment/slot booking service') && (
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
                                        -- Select Visa Type --
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
                        )}
                    </div>

                    {addData.service_type == 'visa service' && (
                        <>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                <div className="dropdown mb-5">
                                    <label htmlFor="state_of_residence">State of Residence</label>
                                    <select
                                        className="form-input"
                                        defaultValue=""
                                        id="state_of_residence"
                                        value={addData?.state_of_residence}
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
                        </>
                    )}

                    <div className="dropdown mb-5">
                        <label htmlFor="assigned_to">Assignee</label>
                        <select
                            className="form-input"
                            defaultValue=""
                            id="assigned_to"
                            value={addData?.assigned_to?.id}
                            onChange={(e) => {
                                setAddData((prev: any) => ({ ...prev, assigned_to: { id: e.target.value, username: e.target.options[e.target.selectedIndex].innerText } }));
                            }}
                        >
                            <option value="" disabled={true}>
                                Assigned to
                            </option>

                            {assigneeList?.items?.map((item: any) => (
                                <option value={item.id}>{item.username}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
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
                    {(addData.service_type == 'appointment/slot booking service' || addData.service_type == 'travel insurance') && (
                        <div className="mb-5">
                            <ComponentsFormDatePickerRange setAddData={setAddData} setDateFilter={setDateFilter} addData={addData} />
                        </div>
                    )}
                    {addData.service_type == 'appointment/slot booking service' && (
                        <>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                <div className="dropdown mb-5">
                                    <label htmlFor="location">Location</label>
                                    <select
                                        className="form-input"
                                        defaultValue=""
                                        id="location"
                                        value={addData?.location}
                                        onChange={(e) => {
                                            // handleInputChange(e);
                                            setAddData({ ...addData, location: e.target.value, other_service: '' });
                                        }}
                                    >
                                        <option value="" disabled={true}>
                                            Select Location
                                        </option>
                                        <option value="new delhi ">New Delhi </option>
                                        <option value="mumbai">Mumbai </option>
                                        <option value="kolkata">Kolkata </option>
                                        <option value="hyderabad">Hyderabad</option>
                                        <option value="chennai">Chennai </option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="mb-5">
                                    <label htmlFor="user_name">User Name </label>
                                    <input id="user_name" type="text" onChange={(e) => handleInputChange(e)} value={addData?.user_name} placeholder="Enter User Name" className="form-input" />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="password">Password</label>
                                    <input id="password" type="text" onChange={(e) => handleInputChange(e)} value={addData?.password} placeholder="Enter Passport" className="form-input" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="mb-5">
                                    <label htmlFor="security_question1">Security Question 1</label>
                                    <input
                                        id="security_question1"
                                        type="text"
                                        onChange={(e) => {
                                            setAddData({ ...addData, security_questions: { ...addData.security_questions, question1: e.target.value } });
                                            // handleInputChange(e);
                                        }}
                                        value={addData?.security_questions?.question1}
                                        placeholder="Enter Security Question 1"
                                        className="form-input"
                                    />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="security_question1_answer">Security Question 1 Answer</label>
                                    <input
                                        id=" "
                                        type="text"
                                        onChange={(e) => {
                                            setAddData({ ...addData, security_questions: { ...addData.security_questions, answer1: e.target.value } });
                                            //  handleInputChange(e)
                                        }}
                                        value={addData?.security_questions?.answer1}
                                        placeholder="Enter Security Answer 1"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="mb-5">
                                    <label htmlFor="security_question2">Security Question 2</label>
                                    <input
                                        id="security_question2"
                                        type="text"
                                        onChange={(e) => {
                                            setAddData({ ...addData, security_questions: { ...addData.security_questions, question2: e.target.value } });
                                            //  handleInputChange(e)
                                        }}
                                        value={addData?.security_questions?.question2}
                                        placeholder="Enter Security Question 2"
                                        className="form-input"
                                    />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="security_question2_answer">Security Question 2 Answer</label>
                                    <input
                                        id="security_question2_answer"
                                        type="text"
                                        onChange={(e) => {
                                            setAddData({ ...addData, security_questions: { ...addData.security_questions, answer2: e.target.value } });
                                            //  handleInputChange(e)
                                        }}
                                        value={addData?.security_questions?.answer2}
                                        placeholder="Enter Security Answer 2"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="mb-5">
                                    <label htmlFor="security_question3">Security Question 3</label>
                                    <input
                                        id="security_question3"
                                        type="text"
                                        onChange={(e) => {
                                            setAddData({ ...addData, security_questions: { ...addData.security_questions, question3: e.target.value } });
                                            //  handleInputChange(e)
                                        }}
                                        value={addData?.security_questions?.question3}
                                        placeholder="Enter Security Question 3"
                                        className="form-input"
                                    />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="security_question2_answer">Security Question 3 Answer</label>
                                    <input
                                        id="security_question3_answer"
                                        type="text"
                                        onChange={(e) => {
                                            setAddData({ ...addData, security_questions: { ...addData.security_questions, answer3: e.target.value } });
                                            //  handleInputChange(e)
                                        }}
                                        value={addData?.security_questions?.answer3}
                                        placeholder="Enter Security Answer 3"
                                        className="form-input"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {addData.service_type == 'attestation service' && (
                        <>
                            <div className="dropdown">
                                <label htmlFor="attestation_document">Attestation Document</label>
                                <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-1 ">
                                    <ComponentsFormsSelectMultiselect addData={addData} options={attestation_document_options} setAddData={setAddData} id={'attestation_document'} />
                                </div>
                            </div>
                            <div className="dropdown">
                                <label htmlFor="attestation_service_type">Attestation Service Type</label>
                                <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-1 ">
                                    <ComponentsFormsSelectMultiselect addData={addData} options={attestation_servicetype_options} setAddData={setAddData} id={'attestation_service_type'} />
                                </div>
                            </div>
                        </>
                    )}

                    {addData.service_type == 'passport service' && (
                        <>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                <div className="dropdown mb-5">
                                    <label htmlFor="passport_service_type">Passport Service Type</label>
                                    <select className="form-input" defaultValue="" id="passport_service_type" value={addData?.passport_service_type} onChange={(e) => handleInputChange(e)}>
                                        <option value="" disabled={true}>
                                            Select Option
                                        </option>
                                        <option value="normal">Normal</option>
                                        <option value="tatkal">Tatkal</option>
                                    </select>
                                </div>

                                <div className="dropdown mb-5">
                                    <label htmlFor="passport_service_category">Passport Service Category </label>
                                    <select className="form-input" defaultValue="" id="passport_service_category" value={addData?.passport_service_category} onChange={(e) => handleInputChange(e)}>
                                        <option value="" disabled={true}>
                                            Select Option
                                        </option>
                                        <option value="New passport ">New passport </option>
                                        <option value="Renewal Passport ">Renewal Passport </option>
                                        <option value="New Born Baby Passport">New Born Baby Passport</option>
                                        <option value="Lost Passport">Lost Passport</option>
                                        <option value="Damage Passport">Damage Passport</option>
                                        <option value="PCC">PCC </option>
                                    </select>
                                </div>
                            </div>

                            <div className="dropdown mb-5">
                                <label htmlFor="passport_size">Passport Size</label>
                                <select className="form-input" defaultValue="" id="passport_size" value={addData?.passport_size} onChange={(e) => handleInputChange(e)}>
                                    <option value="" disabled={true}>
                                        Select Option
                                    </option>
                                    <option value="36 pages">36 pages</option>
                                    <option value="64 pages">64 pages</option>
                                </select>
                            </div>

                            <div className="mb-3 grid grid-cols-1 gap-5 md:grid-cols-1">
                                <p className="rounded-lg border border-gray-300 p-3 ">
                                    <IconInfoCircle className="color inline text-blue-500" /> <span className="text-blue-500">Important Note:</span> Address change, Signature Change, Appearance
                                    Change, Name Correction, DOB Correction, Place of Birth Correction, Parents Name spelling corrections, Addition of Spouse Name, Deletion of Spouse Name and ECR to
                                    ECNR Conversion all these services will comes under passport renewal.
                                </p>
                            </div>
                        </>
                    )}

                    {addData.service_type == 'travel insurance' && (
                        <>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                <div className="dropdown mb-5">
                                    <label htmlFor="insurance_plan">Insurance Plan</label>
                                    <select className="form-input" defaultValue="" id="insurance_plan" value={addData?.insurance_plan} onChange={(e) => handleInputChange(e)}>
                                        <option value="" disabled={true}>
                                            Select Traveling to
                                        </option>
                                        <option value="asia">Asia</option>
                                        <option value="africa">Africa</option>
                                        <option value="ANZ">ANZ</option>
                                        <option value="Worldwide - silver">Worldwide - silver</option>
                                        <option value="WW excl US/CAN - Silver">WW excl US/CAN - Silver</option>
                                        <option value="europe">Europe</option>
                                        <option value="Worldwide - Gold ">Worldwide - Gold </option>
                                        <option value="WW excl US/CAN - Gold">WW excl US/CAN - Gold </option>
                                        <option value="canada">Canada</option>
                                        <option value="Worldwide - Platinum">Worldwide - Platinum</option>
                                        <option value="WW excl US/CAN - Platinum ">WW excl US/CAN - Platinum </option>
                                    </select>
                                </div>

                                <div className="dropdown mb-5">
                                    <label htmlFor="trip_type">Trip Type </label>
                                    <select className="form-input" defaultValue="" id="trip_type" value={addData?.trip_type} onChange={(e) => handleInputChange(e)}>
                                        <option value="" disabled={true}>
                                            Select Traveling to
                                        </option>
                                        <option value="single">Single</option>
                                        <option value="multiple">Multiple</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                <div className="dropdown mb-5">
                                    <label htmlFor="ped">PED </label>
                                    <select className="form-input" defaultValue="" id="ped" value={addData?.ped} onChange={(e) => handleInputChange(e)}>
                                        <option value="" disabled={true}>
                                            Select option
                                        </option>
                                        <option value="yes">Yes</option>
                                        <option value="no">NO</option>
                                    </select>
                                </div>
                                <div className="dropdown mb-5">
                                    <label htmlFor="travellers_count">Travellers Count </label>
                                    <select className="form-input" defaultValue="" id="travellers_count" value={addData?.travellers_count} onChange={(e) => handleInputChange(e)}>
                                        <option value="" disabled={true}>
                                            Select Travellers Count
                                        </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                <div className="dropdown mb-5">
                                    <label htmlFor="eldest_age">Age of Eldest Member </label>
                                    <select className="form-input" defaultValue="" id="eldest_age" value={addData?.eldest_age} onChange={(e) => handleInputChange(e)}>
                                        <option value="" disabled={true}>
                                            Select Eldest Age
                                        </option>
                                        <option value="Up to 40 Years">Up to 40 Years</option>
                                        <option value="41 Years - 60 Years">41 Years - 60 Years</option>
                                        <option value="61 Years - 70 Years">61 Years - 70 Years</option>
                                        <option value="71 Years - 75 Years">71 Years - 75 Years</option>
                                        <option value="76 Years - 80 Years">76 Years - 80 Years</option>
                                        <option value="81 Years - 85 Years">81 Years - 85 Years</option>
                                        <option value="Greater than 85 Years">Greater than 85 Years</option>
                                    </select>
                                </div>
                                <div className="dropdown mb-5">
                                    <label htmlFor="sum_insured">Sum Insured</label>
                                    <select className="form-input" defaultValue="" id="sum_insured" value={addData?.sum_insured} onChange={(e) => handleInputChange(e)}>
                                        <option value="" disabled={true}>
                                            Select Sum Insured
                                        </option>
                                        <option value="50000 USD">50000 USD </option>
                                        <option value="100000 USD">100000 USD </option>
                                        <option value="200000 USD">200000 USD </option>
                                        <option value="500000 USD">500000 USD </option>
                                    </select>
                                </div>
                            </div>
                        </>
                    )}

                    {addData.service_type == 'forex service' && (
                        <>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                <div className="mb-5">
                                    <label htmlFor="currency_exchange_from">Currency Exchange from</label>
                                    <input
                                        id="currency_exchange_from"
                                        type="text"
                                        onChange={(e) => handleInputChange(e)}
                                        value={addData?.currency_exchange_from}
                                        placeholder="Enter Currency Exchange from"
                                        className="form-input"
                                    />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="currency_volume">Currency Volume Required</label>
                                    <input
                                        id="currency_volume"
                                        type="text"
                                        onChange={(e) => handleInputChange(e)}
                                        value={addData?.currency_volume}
                                        placeholder="Enter details "
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                <div className="dropdown mb-5">
                                    <label htmlFor="valid_visa">Destination Country Valid Visa </label>
                                    <select className="form-input" defaultValue="" id="valid_visa" value={addData?.valid_visa} onChange={(e) => handleInputChange(e)}>
                                        <option value="" disabled={true}>
                                            Select option
                                        </option>
                                        <option value="yes">Yes</option>
                                        <option value="no">NO</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                <div className="dropdown mb-5">
                                    <label htmlFor="exchange_mode">Exchange Mode </label>
                                    <select className="form-input" defaultValue="" id="exchange_mode" value={addData?.exchange_mode} onChange={(e) => handleInputChange(e)}>
                                        <option value="" disabled={true}>
                                            Select option
                                        </option>
                                        <option value="cash">Cash</option>
                                        <option value="bank transfer">Bank Transfer</option>
                                    </select>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="commission_earned">Commission Earned</label>
                                    <input
                                        id="commission_earned"
                                        type="text"
                                        onChange={(e) => handleInputChange(e)}
                                        value={addData?.commission_earned}
                                        placeholder="Enter Commission Earned "
                                        className="form-input"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {(addData.service_type == 'flight itinerary' ||
                        addData.service_type == 'hotel itinerary' ||
                        addData.service_type == 'photographs' ||
                        addData.service_type == 'courier' ||
                        addData.service_type == 'passport collection' ||
                        addData.service_type == 'documents pickup & delivery' ||
                        addData.service_type == 'visa application submission & collection - applicants' ||
                        addData.service_type == 'visa application submission & collection - associate partners B2B' ||
                        addData.service_type == 'DS-160 Form' ||
                        addData.service_type == 'others') && (
                        <div className="mb-5">
                            <label htmlFor="other_details">Fee & other details</label>
                            <input id="other_details" type="text" onChange={(e) => handleInputChange(e)} value={addData?.other_details} placeholder="Enter Other details " className="form-input" />
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

                    {isEdit && (
                        <>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 ">
                                {addData?.service_type == 'visa service' && (
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
                                )}

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
                                {addData?.status == 'Done' && (
                                    <div className="mt-7">
                                        <button type="button" onClick={handleStatusButtonClick} className="btn btn-primary ">
                                            {buttonContent}
                                        </button>
                                    </div>
                                )}
                            </div>
                            {addData?.service_type == 'visa service' && (
                                <>
                                    {docPickup && addData?.service_type == 'visa service' && (
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
                                </>
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
                                                    Created By: {item.created_by} - Created Date: {timeStampFormat(item.created_time)}
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
                                setAddData(() => {
                                    return !isEdit && { service_type: 'visa service' };
                                });
                                setIsEdit(false);
                            }}
                            type="button"
                            className="btn btn-outline-danger"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                handleSave();
                                setIsEdit(false);
                            }}
                            type="button"
                            className="btn btn-primary ltr:ml-4 rtl:mr-4"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </ActionModal>
        </>
    );
};

export default LeadManagementActionModal;
