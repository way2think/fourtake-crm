'use client';
import IconUserPlus from '@/components/icon/icon-user-plus';
import IconX from '@/components/icon/icon-x';
import ComponentsFormDatePickerBasic from '@/components/lead-management/lead-manage/components-form-date-picker-basic';
import { useState, useEffect } from 'react';
import ManageVisaActionModal from './ManageVisaActionModal';
import PaginationTable from '@/components/Reusable/Table/PaginationTable';
import { showMessage } from '@/utils/notification';
import { isValidEmail, isValidPhoneNumber } from '@/utils/validator';
import Swal from 'sweetalert2';
import { useGetAllEmployeesQuery } from '@/services/api/userSlice';

const ManageVisa: React.FC<{ managevisa: any }> = ({ managevisa }) => {
    const [data, setData] = useState(managevisa);
    const [addData, setAddData] = useState<any>({
        id: 1,
        country: '',
        isgroup: false,
        visatype: '',
        nationality: '',
        stateofresidence: '',
        visaduration: '',
        entrytype: '',
        customertype: '',
        traveldate: '',
    });
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
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [addUser, setAddUser] = useState<any>({});
    const [manageVisaData, setManageVisaData] = useState<any>(null);

    const { data: employeelist } = useGetAllEmployeesQuery({ page: 0, limit: 0 });

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

    const [applicantDetails, setApplicantDetails] = useState<any>([]);

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
        if (addUser.firstname == '' || addUser.firstname == null) {
            showMessage('Enter First name', 'error');
            return false;
        }
        if (addUser.lastname == '' || addUser.lastname == null) {
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
        if (addUser.passportno == '' || addUser.passportno == null) {
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
        if (addUser.status == '' || addUser.status == null) {
            showMessage('Select Status ', 'error');
            return false;
        }

        if (addUser.id) {
            //update user
            const updatedData = applicantDetails.map((d: any) => (d.id === addUser.id ? { ...d, ...addUser } : d));
            setApplicantDetails(updatedData);
            setIsOpen(false);
            setAddUser({});

            // return updatedData;
        } else {
            //add user

            const maxUserId = applicantDetails.length ? Math.max(...applicantDetails.map((d: any) => d.id)) : 0;
            console.log(addUser);
            const newUser = {
                ...addUser,
                id: +maxUserId + 1,
                isprimary: addUser.isprimary ? 'Yes' : 'No',
            };
            setApplicantDetails([...applicantDetails, newUser]);
            // return newUser;
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
        if (addData.country == '' || addData.country == null) {
            showMessage('Select Country', 'error');
            return false;
        }

        if (addData.visatype == '' || addData.visatype == null) {
            showMessage('Select Visa type', 'error');
            return false;
        }
        if (addData.nationality == '' || addData.nationality == null) {
            showMessage('Select Nationality', 'error');
            return false;
        }
        if (addData.stateofresidence == '' || addData.stateofresidence == null) {
            showMessage('Select State of Residence', 'error');
            return false;
        }
        if (addData.visaduration == '' || addData.visaduration == null) {
            showMessage('Select Visa Duration ', 'error');
            return false;
        }
        if (addData.traveldate == '' || addData.traveldate == null) {
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
    };
    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        { accessor: 'isprimary', textAlign: 'left', title: 'Is Primary' },
        { accessor: 'firstname', textAlign: 'left', title: 'First Name' },
        { accessor: 'lastname', textAlign: 'left', title: 'Last Name' },
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

    return (
        <>
            <div className="flex items-center justify-between bg-[#fff] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">Manage Visa</h5>
            </div>

            <div className="bg-[#fff] p-5 ">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    <div className="dropdown mb-5">
                        <label htmlFor="country">Country</label>
                        <select className="form-input" defaultValue="" id="country" value={addData?.country || ''} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                Select Country
                            </option>
                            <option value="Canada">Canada</option>
                            <option value="India">India</option>
                            <option value="Usa">Usa</option>
                        </select>
                    </div>
                    <div className="mt-7">
                        <label className="flex cursor-pointer items-center">
                            <input type="checkbox" id="isgroup" checked={addData?.isgroup || false} onChange={(e) => handleCheckBoxChange(e)} className="form-checkbox bg-white dark:bg-black" />
                            <span className="text-black">Is Group?</span>
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    <div className="dropdown mb-5">
                        <label htmlFor="visatype">Visa Type</label>
                        <select className="form-input" defaultValue="" id="visatype" value={addData?.visatype || ''} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                Select VisaType
                            </option>
                            <option value="Business Type">Business Visa</option>
                            <option value="Vistor Visa">Vistor Visa</option>
                            <option value="Agent">Agent</option>
                        </select>
                    </div>
                    <div className="dropdown mb-5">
                        <label htmlFor="nationality">Nationality</label>
                        <select className="form-input" defaultValue="" id="nationality" value={addData?.nationality || ''} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                Select Nationality
                            </option>
                            <option value="India">India</option>
                        </select>
                    </div>
                </div>
                <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    <div className="dropdown mb-5">
                        <label htmlFor="stateofresidence">State of Residence</label>
                        <select className="form-input" defaultValue="" id="stateofresidence" value={addData?.stateofresidence || ''} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                Select Residence
                            </option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Kernataka">Kernataka</option>
                        </select>
                    </div>
                    <div className="dropdown mb-5">
                        <label htmlFor="visaduration">Visa Duration</label>
                        <select className="form-input" defaultValue="" id="visaduration" value={addData?.visaduration || ''} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                Select VisaDuration
                            </option>
                            <option value="72 Hours">72 Hours</option>
                            <option value="15 Days">15 Days </option>
                            <option value="1 Month">1 Month</option>
                            <option value="45 days">45 days</option>
                            <option value="3 Months">3 Months</option>
                        </select>
                    </div>
                </div>
                <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    <div className="dropdown mb-5">
                        <label htmlFor="entrytype">Entry Type</label>
                        <select className="form-input" defaultValue="" id="entrytype" value={addData?.entrytype || ''} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                Select Entry Type
                            </option>
                            <option value="Single">Single Entry</option>
                            <option value="Double">Double Entry</option>
                        </select>
                    </div>
                    <div className="mb-5">
                        <ComponentsFormDatePickerBasic label="Travel Date" id={'traveldate'} isEdit={isEdit} setAddData={setAddData} addData={addData} />
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
                                console.log('e.target', e.target.options[e.target.selectedIndex].innerText);
                                setAddData((prev: any) => ({ ...prev, assigned_to: { id: e.target.value, username: e.target.options[e.target.selectedIndex].innerText } }));
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
                        <label htmlFor="customertype">Customer Type</label>
                        <select className="form-input" defaultValue="" id="customertype" value={addData?.customertype || ''} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                Select Customer Type
                            </option>
                            <option value="Walkin">Walkin</option>
                            <option value="Postal">Postal</option>
                            <option value="Agent">Agent</option>
                        </select>
                    </div>
                    {addData?.customertype === 'Agent' && (
                        <div className="dropdown mb-5">
                            <label htmlFor="agent">Agents</label>
                            <select className="form-input" defaultValue="" id="agent" value={addData?.agent || ''} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Select Agents
                                </option>
                                <option value="Agent1">Agent1</option>
                                <option value="Agent2">Agent2</option>
                                <option value="Agent3">Agent3</option>
                            </select>
                        </div>
                    )}
                </div>

                {addData?.isgroup || applicantDetails?.length === 0 ? (
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
