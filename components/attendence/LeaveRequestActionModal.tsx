import IconX from '@/components/icon/icon-x';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
// import ComponentsFormDatePickerBasic from './components-form-date-picker-basic';
// import ComponentsFormDatePickerTime from './components-form-date-picker-time';
import { useEffect, useState, ChangeEvent } from 'react';
import IconUserPlus from '@/components/icon/icon-user-plus';
import PaginationTable from '@/components/Reusable/Table/PaginationTable';
import { showMessage } from '@/utils/notification';
import { useGetCountryVisaTypesQuery } from '@/services/api/cms/countryVisaTypeSlice';
import { VisaType } from '@/entities/visa-type.entity';
// import EmailSendModal from './EmailSendModal';
import { stateCityData } from '@/utils/constant';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user.store';
import { User } from '@/entities/user.entity';
import { useGetAllEmployeesQuery, useGetUsersQuery } from '@/services/api/userSlice';
// import ComponentsFormDatePickerRange from '../';
import ComponentsFormsSelectMultiselect from '@/components/Reusable/select/components-forms-select-multiselect';
import IconInfoCircle from '@/components/icon/icon-info-circle';
import { useLazyGetVisaApplicantsQuery } from '@/services/api/visaProcessSlice';
import { useRouter } from 'next/navigation';
import ComponentsFormDatePickerBasic from '../lead-management/lead-manage/components-form-date-picker-basic';
import ComponentsFormDatePickerRange from '../Reusable/range/components-form-date-picker-range';

interface LeaveRequestActionModalProps {
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
const LeaveRequestActionModal: React.FC<LeaveRequestActionModalProps> = ({ isEdit, setIsEdit, isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData, visaChecklistData }) => {
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
            // return <EmailSendModal addData={addData} isOpen={isMailOpen} setIsOpen={setIsMailOpen} setAddData={setAddData} visaChecklistData={visaChecklistData} />;
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
                    <h5 className="text-lg font-bold">{isEdit ? 'Edit' : 'Leave'} Request</h5>
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
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="emp id">Emp Id </label>
                            <input id="emp id" type="text" placeholder="Enter Emp Id" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="name">Name </label>
                            <input id="name" type="text" onChange={(e) => handleInputChange(e)} value={addData?.name} placeholder="Enter Applicant Name" className="form-input" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="name">Apply Leave Date</label>
                            <ComponentsFormDatePickerRange />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="reason">Reason </label>
                            <input id="reason" type="text" placeholder="Enter Reason" className="form-input" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
                        <div className="dropdown mb-5">
                            <label htmlFor="visa_duration">Status</label>
                            <select className="form-input" defaultValue="" id="visa_duration" value={addData?.visa_duration || ''} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Status
                                </option>
                                <option value="Approve">Approve </option>
                                <option value="Reject">Reject</option>
                            </select>
                        </div>
                    </div>

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

export default LeaveRequestActionModal;
