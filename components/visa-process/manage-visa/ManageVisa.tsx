'use client';
import IconUserPlus from '@/components/icon/icon-user-plus';
import IconX from '@/components/icon/icon-x';
import ComponentsFormDatePickerBasic from '@/components/lead-management/lead-manage/components-form-date-picker-basic';
import { useState, useEffect, ChangeEvent } from 'react';
import ManageVisaActionModal from './ManageVisaActionModal';
import PaginationTable from '@/components/Reusable/Table/PaginationTable';
import { showMessage } from '@/utils/notification';
import { isValidEmail, isValidPhoneNumber } from '@/utils/validator';
import Swal from 'sweetalert2';
import { useGetAllEmployeesQuery, useGetUsersQuery } from '@/services/api/userSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import { useGetCountryVisaTypesQuery } from '@/services/api/cms/countryVisaTypeSlice';
import { VisaType } from '@/entities/visa-type.entity';
import CountrySearchDropdown from '@/components/Reusable/country-selector/CountrySearchDropdown';
import { stateCityData } from '@/utils/constant';
import { useGetEntryTypesQuery } from '@/services/api/cms/entryTypeSlice';
import { update } from 'lodash';
import {
    useCreateVisaApplicantMutation,
    useDeleteApplicantMutation,
    useGetOneVisaApplicantGroupQuery,
    useGetVisaApplicantsQuery,
    useUpdateVisaApplicantGroupMutation,
    visaProcessSlice,
} from '@/services/api/visaProcessSlice';
import { handleCreate, handleDelete, handleErrorResponse, handleUpdate } from '@/utils/rtk-http';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { useGetVisaChecklistQuery } from '@/services/api/cms/visaChecklistSlice';
import ManageVisaMailSendModal from './ManageVisaMailSendModal';
import { SerializedError } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user.store';
import { User } from '@/entities/user.entity';

const ManageVisa: React.FC<{ paramId: any }> = ({ paramId }) => {
    const [addData, setAddData] = useState<any>({
        destination_country: '',
        is_group: false,
        visa_type: '',
        nationality: '75',
        state_of_residence: '',
        visa_duration: '',
        entry_type: '',
        customer_type: '',
        travel_date: '',
    });

    //notes state
    const [isOpenAddNote, setIsOpenAddNote] = useState(false);
    const [groupNote, setGroupNote] = useState<any>('');
    const [groupNotes, setGroupNotes] = useState<any[]>(addData?.group_notes || []); // State for storing
    const [modalTitle, setModalTitle] = useState<string>('Add Note');
    const [actionButtonText, setActionButtonText] = useState<string>('Add Note');
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    //end of note state

    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [addUser, setAddUser] = useState<any>({});
    const [manageVisaData, setManageVisaData] = useState<any>(null);
    const [visaTypes, setVisaTypes] = useState([]);
    const [applicantDetails, setApplicantDetails] = useState<any>([]);
    const [states] = useState(Object.keys(stateCityData).sort());
    const searchParams = useSearchParams();

    const user = useSelector(selectUser) as User;

    const role = user?.role || 'guest';

    const router = useRouter();
    const leadData = searchParams.get('addData') ? JSON.parse(searchParams.get('addData') as string) : null;

    const [createVisaApplicant, {}] = useCreateVisaApplicantMutation();
    const [updateVisaApplicant, {}] = useUpdateVisaApplicantGroupMutation();
    const [deleteApplicant, {}] = useDeleteApplicantMutation();
    const [isMailOpen, setIsMailOpen] = useState(false);

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const { data: countryVisaTypes } = useGetCountryVisaTypesQuery({ page: 0, limit: 0 });
    const { data: entryTypes } = useGetEntryTypesQuery({ page: 0, limit: 0 });

    const { data: assigneeList } = useGetUsersQuery({ page: 0, limit: 0, filterbyrole: 'employee, admin', filter: 'is_active' });
    const { data: agents } = useGetUsersQuery({ page: 0, limit: 0, filterbyrole: 'agent' });
    const { data: corporates } = useGetUsersQuery({ page: 0, limit: 0, filterbyrole: 'corporate' });
    const { data: oneVisaApplicantsGroup, isError, error } = useGetOneVisaApplicantGroupQuery(paramId);
    console.log('oneVisaApplicantsGroup', oneVisaApplicantsGroup, isError, error, paramId);
    console.log('addData', addData);
    console.log('addUser', addUser);

    const { data: visaApplicants } = useGetVisaApplicantsQuery({ page: 0, limit: 0 });
    const { data: visachecklist } = useGetVisaChecklistQuery({ page: 0, limit: 0 });

    useEffect(() => {
        const fetchData = async () => {
            if (paramId) {
                if (isError) {
                    let errorData;

                    if ('data' in error && error.data && typeof error.data === 'object') {
                        const errorMessage = (error.data as { message?: string })?.message;
                        errorData = errorMessage || 'Data Not Found';
                    } else {
                        const errorMessage = (error as SerializedError)?.message;
                        errorData = errorMessage || 'An unknown client error occurred.';
                    }

                    console.log('errorData', errorData);

                    if (errorData) {
                        router.push('/manage-visa');
                        alert(errorData);
                    }

                    // if (errorData == 'Data Not Found') {
                    //     await handleErrorResponse(errorData || 'Data Not Found');
                    // }
                } else {
                    setAddData(oneVisaApplicantsGroup);
                    setIsEdit(true);
                }
            }
        };

        fetchData();
    }, [paramId, oneVisaApplicantsGroup, isError, error]);

    useEffect(() => {
        if (addData?.visa_applicants) {
            setApplicantDetails(addData.visa_applicants);
        }
    }, [addData?.visa_applicants]);

    useEffect(() => {
        if (addData?.group_notes) {
            setGroupNotes(addData.group_notes);
        }
    }, [addData?.group_notes]);

    // console.log('applicantDetails', applicantDetails);

    useEffect(() => {
        const editmode = sessionStorage.getItem('iseditmode');

        if (editmode == 'true') {
            const data = sessionStorage.getItem('manageVisaData');
            if (data) {
                setAddData(JSON.parse(data));
            }
            sessionStorage.setItem('iseditmode', 'false');
        } else {
            sessionStorage.setItem('manageVisaData', '');
        }
    }, []);

    const userData = [
        {
            id: 1,
            apptype: 'Google',
            firstname: 'sam',
            lastname: 'james',
            email: 'alan@gmail.com',
            gender: 'Male',
            status: 'Received',
            phone: '9874563215',
            passportno: '7895dfsf58df',
            dob: '13/06/2024',
        },
    ];

    const handleInputChange = (e: any) => {
        const { value, id } = e.target;
        setAddData({ ...addData, [id]: value });
    };

    const handleInputChangeUser = (e: any) => {
        const { value, id } = e.target;
        setAddUser({ ...addUser, [id]: value });
    };

    const handleCheckBoxChange = (e: any) => {
        const { id, checked } = e.target;
        setAddData((prev: any) => ({ ...prev, [id]: checked }));
    };

    const handleSaveUser = () => {
        if (addUser.first_name == '' || addUser.first_name == null) {
            showMessage('Enter First name', 'error');
            return false;
        }
        if (addUser.last_name == '' || addUser.last_name == null) {
            showMessage('Enter Last name', 'error');
            return false;
        }
        if (addUser.email == '' || addUser.email == null || !isValidEmail(addUser.email)) {
            showMessage('Invalid Email', 'error');
            return false;
        }
        if (addUser.phone == '' || addUser.phone == null || !isValidPhoneNumber(addUser.phone)) {
            showMessage('Invalid Phone No', 'error');
            return false;
        }
        if (addUser.passport_number == '' || addUser.passport_number == null) {
            showMessage('Enter Passport No', 'error');
            return false;
        }
        if (addUser.gender == '' || addUser.gender == null) {
            showMessage('Select Gender  ', 'error');
            return false;
        }
        if (addUser.dob == '' || addUser.dob == null) {
            showMessage('Select DOB ', 'error');
            return false;
        }
        if (addUser.visa_status == '' || addUser.visa_status == null) {
            showMessage('Select Status ', 'error');
            return false;
        }

        if (addUser.id || addUser.temp_id) {
            //update user
            let updatedData;
            if (!addUser.id) {
                updatedData = applicantDetails.map((d: any) => (d.temp_id === addUser.temp_id ? { ...d, ...addUser } : d));
            }
            {
                updatedData = applicantDetails.map((d: any) => (d.id === addUser.id ? { ...d, ...addUser } : d));
            }

            setApplicantDetails(updatedData);
            setAddData({ ...addData, visa_applicants: updatedData });
            setIsOpen(false);
            setAddUser({});

            // return updatedData;
        } else {
            //add user

            const primary = applicantDetails.length == 0 ? true : addUser.is_primary;
            const maxUserId = applicantDetails.length ? Math.max(...applicantDetails.map((d: any) => d.id)) : 0;
            const newUser = {
                ...addUser,
                temp_id: +maxUserId + 1,
                is_primary: primary,
            };
            setApplicantDetails([...applicantDetails, newUser]);
            // return newUser;
            setAddData({ ...addData, visa_applicants: [...applicantDetails, newUser] });
            setIsOpen(false);
            setAddUser({});
        }

        // showMessage('User has been saved successfully.');
        // setAddContactModal(false);
        setIsEdit(false);
    };

    const handleDeleteApplicant = (applicant: any) => {
        console.log('applicant', applicant);

        if (applicant.id) {
            handleDelete({
                deleteMutation: deleteApplicant,
                item: applicant,
                items: visaApplicants.items,
                meta: visaApplicants.meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaProcessSlice,
                endpoint: 'getVisaProcess',
            });
        } else {
            if (applicant.temp_id) {
                const updatedItem = applicantDetails.filter((item: any) => {
                    item.id !== applicant.temp_id;
                });
                setApplicantDetails(updatedItem);
            }
        }
    };

    const handleSubmit = (value: any) => {
        if (addData.nationality == '' || addData.nationality == null) {
            showMessage('Select Nationality', 'error');
            return false;
        }

        if (addData.destination_country == '' || addData.destination_country == null) {
            showMessage('Select Country', 'error');
            return false;
        }

        if (addData.nationality == addData.destination_country) {
            showMessage(' Nationality & Country cannot be same', 'error');
            return false;
        }

        if (addData.visa_type == '' || addData.visa_type == null) {
            showMessage('Select Visa type', 'error');
            return false;
        }

        if (addData.state_of_residence == '' || addData.state_of_residence == null) {
            showMessage('Select State of Residence', 'error');
            return false;
        }
        if (addData.visa_duration == '' || addData.visa_duration == null) {
            showMessage('Select Visa Duration ', 'error');
            return false;
        }
        if (addData.travel_date == '' || addData.travel_date == null) {
            showMessage('Select Travel Date ', 'error');
            return false;
        }

        if (applicantDetails.length == 0) {
            showMessage('Add Applicant Details', 'error');
            return false;
        }

        if (addData.is_group == true) {
            if (applicantDetails.length < 2) {
                showMessage('Atleat Two  Applicant shoul be added in group ', 'error');
                return false;
            }
        }

        console.log('primary country', applicantDetails);

        const primaryCount = applicantDetails.filter((applicant: { is_primary: boolean }) => applicant.is_primary === true).length;

        if (primaryCount > 1) {
            alert('Please select only one primary applicant.');
            return;
        }

        if (addData.id) {
            const updatedData = { ...addData, updated_time: new Date() };
            // router.push('/list-visa-applications');
            return handleUpdate({
                updateMutation: updateVisaApplicant,
                value: updatedData,
                items: visaApplicants.items,
                meta: visaApplicants.meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaProcessSlice,
                endpoint: 'getVisaApplicants',
            });
        } else {
            const updatedData = { ...addData, updated_time: new Date(), stage: 'Fresh', status: 'Open', is_deleted: false };
            // router.push('/list-visa-applications');
            return handleCreate({
                createMutation: createVisaApplicant,
                value: updatedData,
                items: visaApplicants?.items || [],
                meta: visaApplicants?.meta || {},
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaProcessSlice,
                endpoint: 'getVisaApplicants',
            });
        }
    };

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        {
            accessor: 'is_primary',
            textAlign: 'left',
            title: 'Is Primary',
            render: (row: any) => {
                return row.is_primary ? 'Yes' : 'No';
            },
        },
        { accessor: 'first_name', textAlign: 'left', title: 'First Name' },
        { accessor: 'last_name', textAlign: 'left', title: 'Last Name' },
        { accessor: 'email', textAlign: 'left', title: 'Email' },
        { accessor: 'phone', textAlign: 'left', title: 'phone' },
        { accessor: 'passport_number', textAlign: 'left', title: 'Passport No' },
        { accessor: 'dob', textAlign: 'left', title: 'DOB' },
        { accessor: 'gender', textAlign: 'left', title: 'Gender' },
        {
            accessor: 'visa_status',
            textAlign: 'left',
            title: 'status',
            render: (row: any) => {
                return row.visa_status.name;
            },
        },
    ];

    const handleEdit = (object: any) => {
        setIsEdit(true);
        setIsOpen(true);
        console.log('object', object);
        setAddUser(object);
    };

    const handleEditNoteClick = (index: number) => {
        setIsOpenAddNote(true);
        setModalTitle('Edit Note');
        setActionButtonText('Save');
        setGroupNote(groupNotes[index]);
        setCurrentIndex(index); // Set index for editing
    };

    const handleDeleteNote = (index: number) => {
        const updatedNotes = [...groupNotes];
        updatedNotes.splice(index, 1);
        setGroupNotes(updatedNotes);
        setAddData({ ...addData, group_notes: updatedNotes });
    };
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    const handleNoteAction = () => {
        if (modalTitle === 'Edit Note' && currentIndex !== null) {
            const updatedNotes = [...groupNotes];
            updatedNotes[currentIndex] = {
                group_note: groupNote,
                created_time: updatedNotes[currentIndex].created_time, // Retain the original created_time during edit
            };

            setGroupNotes(updatedNotes);
            setAddData({ ...addData, group_notes: updatedNotes });
        } else {
            const newNote = {
                group_note: groupNote,
                created_time: currentTimeInSeconds, // Set created_time in seconds when creating a new note
                created_by: user.username,
            };
            // const updatedNotes = [...groupNotes, groupNote];
            const updatedNotes = [...groupNotes, newNote];
            setGroupNotes(updatedNotes);
            setAddData({ ...addData, group_notes: updatedNotes });
        }
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setIsOpenAddNote(false);
        setModalTitle('Add Note');
        setActionButtonText('Add Note');
        setGroupNote('');
        setCurrentIndex(null); // Reset index when closing modal
    };

    const handleLeadNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setGroupNote(event.target.value);
    };

    const handleButtonClickShowAddNote = () => {
        setIsOpenAddNote(true);
        setModalTitle('Add Note');
        setActionButtonText('Add Note');
        setGroupNote('');

        setCurrentIndex(null); // Reset index when adding a new note
    };

    {
        if (isMailOpen && paramId) {
            return <ManageVisaMailSendModal addData={addData} isOpen={isMailOpen} setIsOpen={setIsMailOpen} setAddData={setAddData} visaChecklistData={visachecklist} />;
        }
    }

    return (
        <>
            <div className="flex items-center justify-between bg-[#fff] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">Manage Visa</h5>
            </div>
            <div className="bg-[#fff] p-5 ">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3 ">
                    <div className="dropdown mb-5">
                        <label htmlFor="nationality">Nationality</label>
                        <select className="form-input" defaultValue="" id="nationality" value={addData?.nationality || '75'} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                Select Nationality
                            </option>
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

                    <div className="mb-5">
                        <ComponentsFormDatePickerBasic label="Apply Date" id={'apply_date'} isEdit={isEdit} setAddData={setAddData} addData={addData} currentDate={new Date()} />
                    </div>

                    <div className="mt-7">
                        <label className="flex cursor-pointer items-center">
                            <input type="checkbox" id="is_group" checked={addData?.is_group || false} onChange={(e) => handleCheckBoxChange(e)} className="form-checkbox bg-white dark:bg-black" />
                            <span className="text-black">Is Group?</span>
                        </label>
                    </div>
                </div>
                <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    <CountrySearchDropdown
                        addData={addData}
                        heading={'Destination Country'}
                        setAddData={setAddData}
                        //  handleEmbassyChange={handleEmbassyChange}
                        items={countryVisaTypes?.items}
                        setVisaTypes={setVisaTypes}
                        title="destination_country"
                    />
                    <div className="dropdown mb-5">
                        <label htmlFor="visa_type">Visa Type</label>
                        <select
                            className="form-input"
                            defaultValue=""
                            id="visa_type"
                            value={addData?.visa_type?.id}
                            // disabled={role == 'employee' ? true : false}
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
                <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    <div className="dropdown mb-5">
                        <label htmlFor="state_of_residence">State of Residence</label>
                        <select
                            className="form-input"
                            defaultValue=""
                            id="state_of_residence"
                            value={addData?.state_of_residence}
                            onChange={(e) => handleInputChange(e)}
                            // disabled={role == 'employee' ? true : false}
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
                        <label htmlFor="visa_duration">Visa Duration</label>
                        <select className="form-input" defaultValue="" id="visa_duration" value={addData?.visa_duration || ''} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                Select VisaDuration
                            </option>
                            <option value="72 hours">72 Hours</option>
                            <option value="15 days">15 Days </option>
                            <option value="1 month">1 Month</option>
                            <option value="45 days">45 days</option>
                            <option value="3 months">3 Months</option>
                            <option value="1 year">1 Year</option>
                            <option value="2 years">2 Years</option>
                            <option value="5 years">5 Years</option>
                            <option value="10 years">10 Years</option>
                        </select>
                    </div>
                </div>
                <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    <div className="dropdown mb-5">
                        <label htmlFor="entry_type">Entry Type</label>
                        <select className="form-input" defaultValue="" id="entry_type" value={addData?.entry_type || ''} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                Select Entry Type
                            </option>
                            {entryTypes?.items.map((entrytype: any) => (
                                <option value={entrytype.id}>{entrytype.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-5">
                        <ComponentsFormDatePickerBasic label="Travel Date" id="travel_date" isEdit={addData?.travel_date ? true : false} setAddData={setAddData} addData={addData} />
                    </div>
                </div>
                <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    <div className="dropdown mb-5">
                        <label htmlFor="source">Assignee</label>
                        <select
                            className="form-input"
                            defaultValue=""
                            id="assigned_to"
                            value={addData?.assigned_to?.id}
                            onChange={(e) => {
                                // console.log('e.target', e.target.options[e.target.selectedIndex].innerText);
                                handleInputChange(e);
                                // setAddData((prev: any) => ({ ...prev, assigned_to: { id: e.target.value, username: e.target.options[e.target.selectedIndex].innerText } }));
                            }}
                        >
                            <option value="" disabled={true}>
                                Assign to
                            </option>

                            {assigneeList?.items?.map((item: any) => (
                                <option value={item.id}>{item.username}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    <div className="dropdown mb-5">
                        <label htmlFor="customer_type">Customer Type</label>
                        <select
                            className="form-input"
                            defaultValue=""
                            id="customer_type"
                            value={addData?.customer_type || ''}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                        >
                            <option value="" disabled={true}>
                                Select Customer Type
                            </option>
                            <option value="walkin">Walkin</option>
                            <option value="postal">Postal</option>
                            <option value="agent">Agent</option>
                            <option value="corporate">Corporate</option>
                        </select>
                    </div>
                    {addData?.customer_type === 'agent' && (
                        <div className="dropdown mb-5">
                            <label htmlFor="agent">Agents</label>
                            <select
                                className="form-input"
                                defaultValue=""
                                id="agent"
                                value={addData?.user_id || ''}
                                onChange={(e) => {
                                    setAddData({ ...addData, user_id: e.target.value });
                                }}
                            >
                                <option value="" disabled={true}>
                                    Select Agents
                                </option>
                                {agents?.items.map((agent: any) => (
                                    <option value={agent.id}>{agent.username}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {addData?.customer_type === 'corporate' && (
                        <div className="dropdown mb-5">
                            <label htmlFor="corporate">Corporate</label>
                            <select
                                className="form-input"
                                defaultValue=""
                                id="corporate"
                                value={addData?.user_id || ''}
                                onChange={(e) => {
                                    setAddData({ ...addData, user_id: e.target.value });
                                }}
                            >
                                <option value="" disabled={true}>
                                    Select Corporate
                                </option>
                                {corporates?.items.map((corporate: any) => (
                                    <option value={corporate.id}>{corporate.username}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
                {paramId && (
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
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
                )}

                {addData?.is_group || applicantDetails?.length === 0 ? (
                    <button
                        // onClick={handleSave}
                        type="button"
                        className="btn btn-primary mb-5 ltr:ml-4 rtl:mr-4"
                        onClick={() => setIsOpen(true)}
                    >
                        <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                        Add Applicant
                    </button>
                ) : null}

                {applicantDetails?.length !== 0 && (
                    <PaginationTable data={applicantDetails} tableColumns={tableColumns} handleEdit={handleEdit} handleDelete={handleDeleteApplicant} title="Customer Details" />
                )}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-5 mt-7">
                        <label htmlFor="leadnote" style={{ display: 'inline-block' }}>
                            Note
                        </label>
                        <button className="btn btn-primary ml-5" style={{ marginLeft: '20px', display: 'inline-block' }} onClick={handleButtonClickShowAddNote}>
                            Add Note
                        </button>

                        <div className="mt-3">
                            {groupNotes?.map((item: any, index: number) => (
                                <div key={index} className="mt-2 flex flex-col rounded border p-2">
                                    <div className="flex items-center justify-between">
                                        <div>{item?.group_note}</div>
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
                            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                <h5 className="text-lg font-bold">{modalTitle}</h5>
                                <button onClick={handleCloseModal} type="button" className="text-white-dark hover:text-dark">
                                    <IconX />
                                </button>
                            </div>
                            <div className="p-5">
                                <textarea
                                    id="group_note"
                                    onChange={handleLeadNoteChange}
                                    value={groupNote?.group_note}
                                    placeholder="Enter your note here"
                                    className="min-h-[150px] w-full rounded-lg border p-2 outline-none"
                                />
                                <div className="mt-3">
                                    <button onClick={handleNoteAction} className="btn btn-primary">
                                        {actionButtonText}
                                    </button>
                                </div>
                            </div>
                        </ActionModal>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-end">
                    <button onClick={handleSubmit} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                        Save
                    </button>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            setAddData({});
                        }}
                        type="button"
                        className="btn btn-outline-danger ml-3"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <ManageVisaActionModal
                isOpen={isOpen}
                setAddUser={setAddUser}
                handleInputChange={handleInputChangeUser}
                setIsOpen={setIsOpen}
                handleSave={handleSaveUser}
                addUser={addUser}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                applicantDetails={applicantDetails}
                setApplicantDetails={setApplicantDetails}
            />
        </>
    );
};

export default ManageVisa;
