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
import { useGetVisaStatusesQuery } from '@/services/api/cms/visaStatusSlice';
import ComponentsFormsSelectMultiselect from '@/components/Reusable/select/components-forms-select-multiselect';
import ComponentsFormDateAndTimePicker from '@/components/lead-management/lead-manage/components-from-date-and-time-picker';
import LoadingSpinner from '@/components/Reusable/LoadingSpinner/LoadingSpinner';

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
    const [isDocPickUp, setIsDocPickUp] = useState(false);
    const [isOutScan, setIsOutScan] = useState(false);
    const [isCourier, setIsCourier] = useState(false);
    const [isInScan, setIsInScan] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [showStatus, setShowStatus] = useState(true);
    const [resetTrigger, setResetTrigger] = useState(false);

    const searchParams = useSearchParams();

    const user: any = useSelector(selectUser) as User;

    // console.log('user in manage visa', user);

    const role = user?.role || 'guest';

    const router = useRouter();
    const leadData = searchParams.get('addData') ? JSON.parse(searchParams.get('addData') as string) : null;

    const [createVisaApplicant, { isLoading: isCreateLoading }] = useCreateVisaApplicantMutation();
    const [updateVisaApplicant, { isLoading: isUpdateLoading }] = useUpdateVisaApplicantGroupMutation();
    const [deleteApplicant, { isLoading: isDeleteLoading }] = useDeleteApplicantMutation();
    const [isMailOpen, setIsMailOpen] = useState(false);
    const [disableIsGroup, setDisableIsGroup] = useState(false);

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const { data: countryVisaTypes, isLoading: isLoading1, isFetching: isFetching1 } = useGetCountryVisaTypesQuery({ page: 0, limit: 0 });
    const { data: entryTypes, isLoading: isLoading2, isFetching: isFetching2 } = useGetEntryTypesQuery({ page: 0, limit: 0 });
    const { data: visaStatuses, isLoading: isLoading3, isFetching: isFetching3 } = useGetVisaStatusesQuery({ page: 0, limit: 0, filter: 'is_active' });

    const { data: assigneeList, isLoading: isLoading4, isFetching: isFetching4 } = useGetUsersQuery({ page: 0, limit: 0, filterbyrole: 'employee, admin', filter: 'is_active' });
    const { data: agents, isLoading: isLoading5, isFetching: isFetching5 } = useGetUsersQuery({ page: 0, limit: 0, filterbyrole: 'agent' });
    const { data: corporates, isLoading: isLoading6, isFetching: isFetching6 } = useGetUsersQuery({ page: 0, limit: 0, filterbyrole: 'corporate' });
    const { data: oneVisaApplicantsGroup, isError, error, isLoading: isLoading7, isFetching: isFetching7 } = useGetOneVisaApplicantGroupQuery(paramId);

    // console.log('oneVisaApplicantsGroup', oneVisaApplicantsGroup, isError, error, paramId);

    // console.log('addData', addData);

    // console.log('addUser', addUser);

    // console.log('applicantDetails', applicantDetails);

    const { data: visaApplicants, isLoading: isLoading8, isFetching: isFetching8 } = useGetVisaApplicantsQuery({ page: 0, limit: 0 });
    const { data: visachecklist, isLoading: isLoading9, isFetching: isFetching9 } = useGetVisaChecklistQuery({ page: 0, limit: 0 });

    useEffect(() => {
        if (addData?.visa_status == '54' || addData?.visa_status?.name == 'Document PickUp') {
            setIsDocPickUp(true);
        }
        if (addData?.visa_status == '52' || addData?.visa_status?.name == 'OutScan to Embassy') {
            setIsOutScan(true);
            setIsInScan(true);
        }

        if (addData?.visa_status == '5' || addData?.visa_status?.name == 'submitted' || addData?.visa_status?.id == '5') {
            setIsSubmit(true);
        }
        if (
            addData?.visa_status == '56' ||
            addData?.visa_status == '57' ||
            addData?.visa_status == '58' ||
            addData?.visa_status?.id == '56' ||
            addData?.visa_status?.id == '57' ||
            addData?.visa_status?.id == '58'
        ) {
            setIsCourier(true);
        }
    }, [addData?.visa_status]);

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

    useEffect(() => {
        //for global status
        if (applicantDetails.length == 1 && (!addData.visa_status || addData.visa_status === '')) {
            setAddData({ ...addData, visa_status: applicantDetails[0].visa_status });
        }
        const sameStatus = applicantDetails.length > 1 && applicantDetails.every((item: any) => item?.visa_status?.id === applicantDetails[0]?.visa_status?.id);

        if (!sameStatus && addData.visa_status !== String) {
            setAddData((prevData: any) => ({
                ...prevData,
                visa_status: '',
            }));
        } else {
            setAddData((prevData: any) => ({
                ...prevData,
                visa_status: applicantDetails[0].visa_status,
            }));
        }
    }, [applicantDetails]);

    useEffect(() => {
        // Check if there is exactly one applicant and no doc_pickup_date is set
        if (applicantDetails.length === 1 && (!addData.doc_pickup_date || addData.doc_pickup_date === '')) {
            setAddData({
                ...addData,
                doc_pickup_date: applicantDetails[0].doc_pickup_date,
                doc_pickup_remark: applicantDetails[0].doc_pickup_remark || '', // Include remark if present
            });
        }

        // Check if all applicants have the same doc_pickup_date and doc_pickup_remark
        const samePickupDate = applicantDetails.length > 1 && applicantDetails.every((item: any) => item?.doc_pickup_date === applicantDetails[0]?.doc_pickup_date);
        const samePickupRemark = applicantDetails.length > 1 && applicantDetails.every((item: any) => item?.doc_pickup_remark === applicantDetails[0]?.doc_pickup_remark);

        // If they don't have the same pickup date and doc_pickup_date is not an empty string
        if (!samePickupDate && addData.doc_pickup_date !== '') {
            setAddData((prevData: any) => ({
                ...prevData,
                doc_pickup_date: '',
                doc_pickup_remark: '', // Reset remark if dates are different
            }));
        } else if (samePickupDate) {
            // If all have the same pickup date, set it to the first applicant's date and remark
            setAddData((prevData: any) => ({
                ...prevData,
                doc_pickup_date: applicantDetails[0].doc_pickup_date,
                doc_pickup_remark: samePickupRemark ? applicantDetails[0].doc_pickup_remark : '', // Include remark if the same
            }));
        }
    }, [applicantDetails]);

    useEffect(() => {
        const sameOutscanDate = applicantDetails.length > 1 && applicantDetails.every((item: any) => item?.outscan_to_embassy_date === applicantDetails[0]?.outscan_to_embassy_date);
        // const sameOutscanRemark = applicantDetails.length > 1 && applicantDetails.every((item: any) => item?.outscan_remark === applicantDetails[0]?.outscan_remark);

        if (!sameOutscanDate && addData.outscan_to_embassy_date !== '') {
            setAddData((prevData: any) => ({
                ...prevData,
                outscan_to_embassy_date: '',
                // outscan_remark: '',
            }));
        } else if (sameOutscanDate) {
            setAddData((prevData: any) => ({
                ...prevData,
                outscan_to_embassy_date: applicantDetails[0].outscan_to_embassy_date,
                // outscan_remark: sameOutscanRemark ? applicantDetails[0].outscan_remark : '',
            }));
        }
    }, [applicantDetails]);

    useEffect(() => {
        // for global courier_tracking_no
        if (applicantDetails.length === 1 && (!addData.courier_tracking_no || addData.courier_tracking_no === '')) {
            setAddData({ ...addData, courier_tracking_no: applicantDetails[0].courier_tracking_no });
        }
        const sameCourierTrackingNo = applicantDetails.length > 1 && applicantDetails.every((item: any) => item?.courier_tracking_no === applicantDetails[0]?.courier_tracking_no);

        if (!sameCourierTrackingNo) {
            setAddData((prevData: any) => ({
                ...prevData,
                courier_tracking_no: '',
            }));
        } else {
            setAddData((prevData: any) => ({
                ...prevData,
                courier_tracking_no: applicantDetails[0].courier_tracking_no,
            }));
        }
    }, [applicantDetails]);

    useEffect(() => {
        // for global where_submitted
        if (applicantDetails.length === 1 && (!addData.where_submitted || addData.where_submitted === '')) {
            setAddData({ ...addData, where_submitted: applicantDetails[0].where_submitted });
        }
        const sameWhereSubmitted = applicantDetails.length > 1 && applicantDetails.every((item: any) => item?.where_submitted?.id === applicantDetails[0]?.where_submitted?.id);

        if (!sameWhereSubmitted) {
            setAddData((prevData: any) => ({
                ...prevData,
                where_submitted: '',
            }));
        } else {
            setAddData((prevData: any) => ({
                ...prevData,
                where_submitted: applicantDetails[0].where_submitted,
            }));
        }
    }, [applicantDetails]);

    // useEffect for inscan_from_embassy_date
    useEffect(() => {
        const sameInscanDate = applicantDetails.length > 1 && applicantDetails.every((item: any) => item?.inscan_from_embassy_date === applicantDetails[0]?.inscan_from_embassy_date);
        // const sameInscanRemark = applicantDetails.length > 1 && applicantDetails.every((item: any) => item?.inscan_remark === applicantDetails[0]?.inscan_remark);

        if (!sameInscanDate && addData.inscan_from_embassy_date !== '') {
            setAddData((prevData: any) => ({
                ...prevData,
                inscan_from_embassy_date: '',
                // inscan_remark: '',
            }));
        } else if (sameInscanDate) {
            setAddData((prevData: any) => ({
                ...prevData,
                inscan_from_embassy_date: applicantDetails[0].inscan_from_embassy_date,
                // inscan_remark: sameInscanRemark ? applicantDetails[0].inscan_remark : '',
            }));
        }
    }, [applicantDetails]);

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

    useEffect(() => {
        if (addData && paramId) {
            if (addData?.is_group === true) {
                setDisableIsGroup(true);
            }
        }
    }, [addData, paramId]);

    const statusApplyToOptions =
        applicantDetails?.map((item: any) => ({
            value: `${item.first_name} ${item.last_name}`,
            label: `${item.first_name} ${item.last_name}`,
        })) || [];

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
        if (addUser.passport_number == '' || addUser.passport_number == null) {
            showMessage('Enter Passport No', 'error');
            return false;
        }
        if (addUser.phone == '' || addUser.phone == null || !isValidPhoneNumber(addUser.phone)) {
            showMessage('Invalid Phone No', 'error');
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
        // if (addUser.visa_status == '' || addUser.visa_status == null) {
        //     showMessage('Select Status ', 'error');
        //     return false;
        // }

        if (addUser.id || addUser.temp_id) {
            //update user
            let updatedData;
            if (!addUser.id) {
                updatedData = applicantDetails.map((d: any) => (d.temp_id === addUser.temp_id ? { ...d, ...addUser } : d));
            } else {
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
            const maxUserId = applicantDetails.length ? Math.max(...applicantDetails.map((d: any) => d.temp_id ?? 0)) : 0;

            const newUser = {
                ...addUser,
                temp_id: +maxUserId + 1,
                is_primary: primary,
                visa_status: '3',
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

    const handleSubmit = async (value: any) => {
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
        if (addData.entry_type == '' || addData.entry_type == null) {
            showMessage('Select Entry Type', 'error');
            return false;
        }
        if (addData.travel_date == '' || addData.travel_date == null) {
            showMessage('Select Travel Date ', 'error');
            return false;
        }

        if (addData.assigned_to == '' || addData.assigned_to == null) {
            showMessage('Select Assignee ', 'error');
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

        // setResetTrigger((prev) => !prev);
        const primaryCount = applicantDetails.filter((applicant: { is_primary: boolean }) => applicant.is_primary === true).length;

        if (primaryCount > 1) {
            alert('Please select only one primary applicant.');
            return;
        }
        const { visa_status, status_apply_to, doc_pickup_date, doc_pickup_remark, inscan_from_embassy_date, outscan_to_embassy_date, where_submitted, courier_tracking_no, ...rest } = addData;
        if (addData.id) {
            const updatedData = { ...rest, updated_time: new Date() };
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
            const updatedData = { ...rest, updated_time: new Date(), stage: 'Fresh', status: 'Open', is_deleted: false, center: user?.center.id };
            // router.push('/list-visa-applications');
            const creationResponse = await handleCreate({
                createMutation: createVisaApplicant,
                value: updatedData,
                items: visaApplicants?.items || [],
                meta: visaApplicants?.meta || {},
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaProcessSlice,
                endpoint: 'getVisaApplicants',
                title: 'manage visa',
                router: router,
            });

            if (creationResponse) {
                router.push(`/manage-visa/${creationResponse.data.groupId}`);
            } else {
                console.log('Creation was canceled or failed.');
            }
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
        {
            accessor: 'dob',
            textAlign: 'left',
            title: 'DOB',
            render: (row: any) => {
                return new Date(row.dob)?.toISOString().split('T')[0];
            },
        },
        { accessor: 'gender', textAlign: 'left', title: 'Gender' },
        {
            accessor: 'visa_status',
            textAlign: 'left',
            title: 'status',
            render: (row: any) => {
                if (!row.visa_status.name) {
                    const status = visaStatuses?.items?.find((status: any) => row.visa_status === status.id);
                    console.log('status', status);
                    return status ? status.name : null; // Return the name if found, otherwise return null or a default value
                } else {
                    return row.visa_status.name;
                }
            },
        },
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

    const handleGlobalStatusChange = (e: any) => {
        const selectedVisaStatus = e.target.value;

        let updatedVisaApplicants = applicantDetails;
        let matchedApplicants: any[] = [];

        if (addData?.status_apply_to) {
            const globalStatus = addData?.status_apply_to.split(',');

            // Initialize an empty array to collect all matched applicants
            let allMatchedApplicants: any[] = [];

            matchedApplicants = globalStatus.flatMap((statusItem: string) => {
                const trimmedStatusItem = statusItem.trim().toLowerCase(); // Trim and convert to lowercase

                const matchedApplicantsList = applicantDetails.filter((applicant: any) => {
                    const fullName = `${applicant.first_name} ${applicant.last_name}`.trim().toLowerCase(); // Trim and convert to lowercase
                    const isMatch = fullName === trimmedStatusItem;
                    return isMatch;
                });

                // Accumulate matched applicants in the allMatchedApplicants array
                allMatchedApplicants = [...allMatchedApplicants, ...matchedApplicantsList];

                // Update visa_status for all matched applicants
                if (matchedApplicantsList.length > 0) {
                    updatedVisaApplicants = updatedVisaApplicants.map((applicant: any) => {
                        if (
                            matchedApplicantsList.some(
                                (matchedApplicant: any) =>
                                    `${matchedApplicant.first_name} ${matchedApplicant.last_name}`.trim().toLowerCase() === `${applicant.first_name} ${applicant.last_name}`.trim().toLowerCase()
                            )
                        ) {
                            return { ...applicant, visa_status: selectedVisaStatus };
                        }
                        return applicant;
                    });
                }

                return matchedApplicantsList; // Return the list of matched applicants
            });
        }

        // Update state after gathering all matched and updated data
        setApplicantDetails(updatedVisaApplicants);
        setAddData({
            ...addData,
            visa_applicants: updatedVisaApplicants,
            visa_status: e.target.value, // Update visa status
        });
    };

    {
        if (isMailOpen && paramId) {
            return <ManageVisaMailSendModal addData={addData} isOpen={isMailOpen} setIsOpen={setIsMailOpen} setAddData={setAddData} visaChecklistData={visachecklist} />;
        }
    }

    return (
        <>
            {(isCreateLoading ||
                isUpdateLoading ||
                isDeleteLoading ||
                isLoading1 ||
                isLoading2 ||
                isLoading3 ||
                isLoading4 ||
                isLoading5 ||
                isLoading6 ||
                isLoading7 ||
                isLoading8 ||
                isLoading9 ||
                isFetching1 ||
                isFetching2 ||
                isFetching3 ||
                isFetching4 ||
                isFetching5 ||
                isFetching6 ||
                isFetching7 ||
                isFetching8 ||
                isFetching9) && <LoadingSpinner />}
            <div className="flex items-center justify-between bg-[#fff] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">Manage Visa</h5>
            </div>
            <div className="bg-[#fff] p-5 ">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3 ">
                    <div className="dropdown mb-5">
                        <label htmlFor="nationality" className="text-blue-500">
                            Nationality
                        </label>
                        <select className="form-input" defaultValue="" id="nationality" value={addData?.nationality || '75'} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                Select Nationality
                            </option>
                            {countryVisaTypes?.items.map((countryVisaType: any) => (
                                <option key={countryVisaType.id} value={countryVisaType.id}>
                                    {countryVisaType.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-5">
                        <ComponentsFormDatePickerBasic label="Apply Date" id={'apply_date'} isEdit={isEdit} setAddData={setAddData} addData={addData} currentDate={new Date()} />
                    </div>

                    <div className={`mt-7 ${disableIsGroup ? 'cursor-not-allowed opacity-50' : ''}`}>
                        <label className={`flex cursor-pointer items-center ${disableIsGroup ? 'cursor-not-allowed' : ''}`}>
                            <input
                                type="checkbox"
                                id="is_group"
                                checked={addData?.is_group || false}
                                onChange={(e) => handleCheckBoxChange(e)}
                                disabled={disableIsGroup}
                                className={`form-checkbox bg-white dark:bg-black ${disableIsGroup ? 'cursor-not-allowed' : ''}`}
                            />
                            <span className={`text-black ${disableIsGroup ? 'text-gray-500' : ''}`}>Is Group?</span>
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
                                --- Select State ---
                            </option>

                            {states.map((state, i) => (
                                <option key={i} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="dropdown mb-5">
                        <label htmlFor="visa_duration">Visa Duration</label>
                        <select className="form-input" defaultValue="" id="visa_duration" value={addData?.visa_duration || ''} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                -- Select Visa Duration --
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
                        <select className="form-input" defaultValue="" id="entry_type" value={addData?.entry_type?.id || addData?.entry_type || ''} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                --- Select Entry Type ---
                            </option>
                            {entryTypes?.items.map((entrytype: any) => (
                                <option key={entrytype.id} value={entrytype.id}>
                                    {entrytype.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-5">
                        <ComponentsFormDatePickerBasic label="Travel Date" id="travel_date" isEdit={addData?.travel_date ? true : false} setAddData={setAddData} addData={addData} />
                    </div>
                </div>

                <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-3 ">
                    <div className="dropdown mb-5">
                        <label htmlFor="source">Assigned to</label>
                        <select
                            className="form-input"
                            defaultValue=""
                            id="assigned_to"
                            value={addData?.assigned_to?.id}
                            onChange={(e) => {
                                handleInputChange(e);
                                // setAddData((prev: any) => ({ ...prev, assigned_to: { id: e.target.value, username: e.target.options[e.target.selectedIndex].innerText } }));
                            }}
                        >
                            <option value="" disabled={true}>
                                Assign to
                            </option>

                            {assigneeList?.items?.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                    {item.username}
                                </option>
                            ))}
                        </select>
                    </div>

                    {paramId && addData?.is_group && (
                        <>
                            <div className="dropdown">
                                <label htmlFor="visa_status">Global Visa Status</label>
                                <select
                                    className="form-input"
                                    defaultValue=""
                                    id="visa_status"
                                    onChange={(e) => {
                                        // handleInputChange(e);
                                        handleGlobalStatusChange(e);
                                    }}
                                    value={addData?.visa_status?.id || addData?.visa_status || ''}
                                >
                                    <option value="" disabled={true}>
                                        Select Status
                                    </option>

                                    {visaStatuses?.items?.map((status: any) => {
                                        return (
                                            <option value={status.id} key={status.id}>
                                                {status.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="dropdown">
                                <label htmlFor="status_apply_to">Status Apply to</label>
                                <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-1 ">
                                    <ComponentsFormsSelectMultiselect addData={addData} options={statusApplyToOptions} setAddData={setAddData} id={'status_apply_to'} resetTrigger={resetTrigger} />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    {isCourier && (
                        <div className="mb-5">
                            <label htmlFor="courier_tracking_no">Courier Tracking No.</label>
                            <input
                                id="courier_tracking_no"
                                value={addUser?.courier_tracking_no}
                                onChange={(e) => handleInputChange(e)}
                                placeholder="Enter Courier Tracking No"
                                className="form-input"
                            />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    {addData?.visa_status == '53' && (
                        <div className="mb-5">
                            <ComponentsFormDateAndTimePicker label="Passport Collection Date" id={'passport_collection_date'} isEdit={isEdit} setAddData={setAddData} addData={addData} />
                        </div>
                    )}
                    {addData?.visa_status == '55' && (
                        <div className="mb-5">
                            <ComponentsFormDateAndTimePicker label="Passport DropOff Date" id={'passport_dropoff_date'} isEdit={isEdit} setAddData={setAddData} addData={addData} />
                        </div>
                    )}
                </div>

                {(addData?.visa_status == '54' || isDocPickUp) && (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <ComponentsFormDateAndTimePicker label="Global Document pickup Date" id={'doc_pickup_date'} isEdit={isEdit} setAddData={setAddData} addData={addData} updateUser={true} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="doc_pickup_remark">Document PickUp Remarks</label>
                            <textarea
                                id="doc_pickup_remark"
                                rows={1}
                                value={addData?.doc_pickup_remark}
                                onChange={(e) => {
                                    // handleInputChange(e)
                                    const updatedRemark = addData.visa_applicants.map((item: any) => ({
                                        ...item,
                                        doc_pickup_remark: e.target.value,
                                    }));

                                    setAddData((prevData: any) => ({
                                        ...prevData,
                                        visa_applicants: updatedRemark,
                                        doc_pickup_remark: e.target.value,
                                    }));
                                }}
                                placeholder="Enter Remarks"
                                className="form-textarea min-h-[10px] resize-none"
                            ></textarea>
                        </div>
                    </div>
                )}

                {paramId && (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <>
                            <div className="mb-5">
                                <ComponentsFormDateAndTimePicker
                                    label="OutScan to Embassy Date & Time"
                                    id={'outscan_to_embassy_date'}
                                    isEdit={isEdit}
                                    setAddData={setAddData}
                                    addData={addData}
                                    updateUser={true}
                                />
                            </div>

                            <div className="mb-5">
                                <ComponentsFormDateAndTimePicker
                                    label="In Scan from Embassy Date & Time"
                                    id={'inscan_from_embassy_date'}
                                    isEdit={isEdit}
                                    setAddData={setAddData}
                                    addData={addData}
                                    updateUser={true}
                                />
                            </div>
                        </>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    {isSubmit && (
                        <div className="dropdown">
                            <label htmlFor="where_submitted">Where Submitted</label>
                            <select
                                className="form-input"
                                defaultValue=""
                                id="where_submitted"
                                onChange={(e) => {
                                    // handleInputChange(e);
                                    const updatedVisaApplicants = addData.visa_applicants.map((item: any) => ({
                                        ...item,
                                        where_submitted: e.target.value,
                                    }));

                                    setAddData((prevData: any) => ({
                                        ...prevData,
                                        visa_applicants: updatedVisaApplicants,
                                        where_submitted: e.target.value,
                                    }));
                                }}
                                value={addData?.where_submitted}
                            >
                                <option value="" disabled={true}>
                                    Select Option
                                </option>
                                <option value="vfs bangalore">VFS Bangalore</option>;<option value="vfs mumbai">VFS Mumbai</option>;<option value="vfs kolkata">VFS Kolkata</option>;
                                <option value="vfs Hyderabad">VFS Hyderabad</option>;<option value="vfs dehli">VFS Dehli</option>;<option value="online">Online</option>;
                                <option value="vendor">Vendor</option>;
                            </select>
                        </div>
                    )}
                </div>

                <div className="mb-2 mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 ">
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
                                --- Select Customer Type ---
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
                                    <option key={agent.id} value={agent.id}>
                                        {agent.username}
                                    </option>
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
                                    <option key={corporate.id} value={corporate.id}>
                                        {corporate.username}
                                    </option>
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
                addData={addData}
                paramId={paramId}
            />
        </>
    );
};

export default ManageVisa;
