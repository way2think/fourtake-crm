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
import { useCreateVisaApplicantMutation, useGetOneVisaApplicantGroupQuery, useGetVisaApplicantsQuery, useUpdateVisaApplicantGroupMutation, visaProcessSlice } from '@/services/api/visaProcessSlice';
import { handleCreate, handleUpdate } from '@/utils/rtk-http';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';

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
    const [groupNote, setGroupNote] = useState<string>('');
    const [groupNotes, setGroupNotes] = useState<string[]>(addData?.group_notes || []); // State for storing
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
    const leadData = searchParams.get('addData') ? JSON.parse(searchParams.get('addData') as string) : null;

    const [createVisaApplicant, {}] = useCreateVisaApplicantMutation();
    const [updateVisaApplicant, {}] = useUpdateVisaApplicantGroupMutation();
    // const [deleteLead, {}] = useDeleteLeadMutation();

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const { data: countryVisaTypes } = useGetCountryVisaTypesQuery({ page: 0, limit: 0 });
    const { data: entryTypes } = useGetEntryTypesQuery({ page: 0, limit: 0 });

    const { data: employeelist } = useGetUsersQuery({ page: 0, limit: 0, filterbyrole: 'employee' });
    const { data: agents } = useGetUsersQuery({ page: 0, limit: 0, filterbyrole: 'agent' });
    const { data: corporates } = useGetUsersQuery({ page: 0, limit: 0, filterbyrole: 'corporate' });
    const { data: oneVisaApplicantsGroup } = useGetOneVisaApplicantGroupQuery(paramId);
    // console.log('oneVisaApplicantsGroup', oneVisaApplicantsGroup);
    // console.log('addData', addData);
    const { data: visaApplicants } = useGetVisaApplicantsQuery({ page: 0, limit: 0 });
    // const { data: oneVisaApplicantsGroup } = useGetOneVisaApplicantGroupQuery(8);

    useEffect(() => {
        if (paramId) {
            setAddData(oneVisaApplicantsGroup);
        }
    }, [paramId, oneVisaApplicantsGroup]);

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

            const maxUserId = applicantDetails.length ? Math.max(...applicantDetails.map((d: any) => d.id)) : 0;
            const newUser = {
                ...addUser,
                temp_id: +maxUserId + 1,
                // is_primary: addUser.is_primary,
            };
            setApplicantDetails([...applicantDetails, newUser]);
            // return newUser;
            setAddData({ ...addData, visa_applicants: [...applicantDetails, newUser] });
            setIsOpen(false);
            setAddUser({});
        }

        // showMessage('User has been saved successfully.');
        // setAddContactModal(false);
        // setIsEdit(false);
    };

    const handleDelete = async (row: any) => {
        await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: { popup: 'sweet-alerts' },
        }).then(async (result) => {
            if (result.value) {
                setApplicantDetails(applicantDetails.filter((item: any) => item.id !== row.id));
                await Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', icon: 'success', customClass: { popup: 'sweet-alerts' } });
                return true;
            }
        });
    };

    const handleSubmit = (value: any) => {
        if (addData.destination_country == '' || addData.destination_country == null) {
            showMessage('Select Country', 'error');
            return false;
        }

        if (addData.visa_type == '' || addData.visa_type == null) {
            showMessage('Select Visa type', 'error');
            return false;
        }
        if (addData.nationality == '' || addData.nationality == null) {
            showMessage('Select Nationality', 'error');
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
            showMessage('Add User Details', 'error');
            return false;
        }

        //Command Code 13-07-2024
        // if (addData.id) {
        //     //update user
        //     const updatedData = data.map((d: any) => (d.id === addData.id ? { ...d, ...addData } : d));
        //     // setAddData({});
        //     setData(updatedData);

        //     // return updatedData;
        // } else {
        //     //add user
        //     const maxUserId = data.length ? Math.max(...data.map((d: any) => d.id)) : 0;
        //     const newUser = {
        //         ...addData,
        //         id: +maxUserId + 1,
        //     };

        //     setData([...data, newUser]);
        // }
        // --------End------//

        // setAddData({});
        // setApplicantDetails([]);
        // showMessage('User has been saved successfully.');
        // setAddContactModal(false);
        // setIsEdit(false);

        //console.log(applicantDetails)
        // Check if there's more than one entry with isprimary: "Yes"
        const primaryCount = applicantDetails.filter((applicant: { isprimary: string }) => applicant.isprimary === 'Yes').length;

        if (primaryCount > 1) {
            alert('Please select only one primary applicant.');
            return;
        }
        alert('Ok');

        if (addData.id) {
            const updatedData = { ...addData, updated_time: new Date() };
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
            const updatedData = { ...addData, updated_time: new Date(), stage: 'Fresh', status: 'Open' };

            return handleCreate({
                createMutation: createVisaApplicant,
                value: updatedData,
                items: visaApplicants.items,
                meta: visaApplicants.meta,
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
        { accessor: 'passportno', textAlign: 'left', title: 'Passport No' },
        { accessor: 'dob', textAlign: 'left', title: 'DOB' },
        { accessor: 'gender', textAlign: 'left', title: 'Gender' },
        { accessor: 'status', textAlign: 'left', title: 'status' },
    ];

    const handleEdit = (object: any) => {
        setIsEdit(true);
        setIsOpen(true);


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
    };

    const handleNoteAction = () => {
        if (modalTitle === 'Edit Note' && currentIndex !== null) {
            const updatedNotes = [...groupNotes];
            updatedNotes[currentIndex] = groupNote;
            setGroupNotes(updatedNotes);
            setAddData({ ...addData, group_notes: updatedNotes });
        } else {
            const updatedNotes = [...groupNotes, groupNote];
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

    return (
        <>
            <div className="flex items-center justify-between bg-[#fff] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">Manage Visa</h5>
            </div>

            <div className="bg-[#fff] p-5 ">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
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

                            {employeelist?.items?.map((item: any) => (
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

                {applicantDetails?.length !== 0 && <PaginationTable data={applicantDetails} tableColumns={tableColumns} handleEdit={handleEdit} handleDelete={handleDelete} title="Customer Details" />}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-5 mt-7">
                        <label htmlFor="leadnote" style={{ display: 'inline-block' }}>
                            Note
                        </label>
                        <button className="btn btn-primary ml-5" style={{ marginLeft: '20px', display: 'inline-block' }} onClick={handleButtonClickShowAddNote}>
                            Add Note
                        </button>

                        <div className="mt-3">
                            {groupNotes?.map((note: string, index: number) => (
                                <div key={index} className="mt-2 flex items-center justify-between rounded border p-2">
                                    <div>{note}</div>
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
                            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                <h5 className="text-lg font-bold">{modalTitle}</h5>
                                <button onClick={handleCloseModal} type="button" className="text-white-dark hover:text-dark">
                                    <IconX />
                                </button>
                            </div>
                            <div className="p-5">
                                <textarea
                                    id="group_notes"
                                    onChange={handleLeadNoteChange}
                                    value={groupNote}
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
