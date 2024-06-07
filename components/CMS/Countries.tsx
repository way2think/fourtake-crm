'use client';
import IconFacebook from '@/components/icon/icon-facebook';
import IconInstagram from '@/components/icon/icon-instagram';
import IconLayoutGrid from '@/components/icon/icon-layout-grid';
import IconLinkedin from '@/components/icon/icon-linkedin';
import IconListCheck from '@/components/icon/icon-list-check';
import IconSearch from '@/components/icon/icon-search';
import IconTwitter from '@/components/icon/icon-twitter';
import IconUser from '@/components/icon/icon-user';
import IconUserPlus from '@/components/icon/icon-user-plus';
import IconX from '@/components/icon/icon-x';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import Dropdown from '../dropdown';
import ElementsDropdownsBasic from '../Reusable/elements-dropdowns-basic';
import ComponentsFormsSelectBasic from '../Reusable/select/components-forms-select-basic';
import AddUserForm from '../user-management/AddUserForm';
import { isValidEmail, isValidName, isValidPassword, isValidPhoneNumber } from '@/utils/validator';
import IconLockDots from '../icon/icon-lock-dots';

import './pagination.css';
import PaginationTable from '../Reusable/Table/PaginationTable';
import ComponentsModalOptionalSizes from '../Reusable/Modal/components-modal-optional-sizes';
import ComponentsFormsFileUploadSingle from '../Reusable/file-upload/components-forms-file-upload-single';
import ComponentsFormsFileUploadMulti from '../Reusable/file-upload/components-forms-file-upload-multi';
import IconPencil from '@/components/icon/icon-pencil';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import { exportToExcel } from '../Reusable/ExportExcel/exportToExcel';
import ActionModal from '../Reusable/Modal/ActionModal';

const Countries = () => {
    const [addContactModal, setAddContactModal] = useState<any>(false);
    const [assignPassword, setAssignPassword] = useState<boolean>(false);
    const [modal5, setModal5] = useState(false);
    const [value, setValue] = useState<any>('list');
    const [defaultParams] = useState({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        role: '',
        center: '',
        status: false,
        phone: '',
        address: '',
    });
    const [assignPasswordValue, setAssignPasswordValue] = useState({
        id: '',
        password: '',
        confirmpassword: '',
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const [isChecked, setIsChecked] = useState<boolean>(params.status || false);
    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const handlePasswordChange = (e: any) => {
        const { value, id } = e.target;
        setAssignPasswordValue({ ...assignPasswordValue, [id]: value });
    };

    const [search, setSearch] = useState<any>('');

    const [contactList] = useState<any>([
        {
            id: 1,
            name: 'Caroline',
            action: (
                <div>
                    <button
                        type="button"
                        onClick={() => {
                            setModal5(true);
                        }}
                    >
                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                    </button>

                    <button type="button">
                        <IconTrashLines />
                    </button>
                </div>
            ),
            languages: 'tamil',
            dailing_code: '+91',
            capital: 'Delhi',
            cities: 'all list',
            country_details: 'country detail give here',
            climate: 'hot',
            currecy: 'rupee',
            time_zone: 'indian',
            additional_info: 'extra info',
            website: 'www.india.com',
            is_popular: true,
            enable_outsource: true,
            enable_jurisdiction: true,
            flag: 'url link ',
            image: 'url link',
        },
        {
            id: 2,
            name: 'Celeste',
            action: (
                <div>
                    <button type="button">
                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                    </button>

                    <button type="button">
                        <IconTrashLines />
                    </button>
                </div>
            ),
        },
        {
            id: 3,
            name: 'Tillman',
            action: (
                <div>
                    <button type="button">
                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                    </button>

                    <button type="button">
                        <IconTrashLines />
                    </button>
                </div>
            ),
        },
        {
            id: 4,
            name: 'Daisy',
            action: (
                <div>
                    <button type="button">
                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                    </button>

                    <button type="button">
                        <IconTrashLines />
                    </button>
                </div>
            ),
        },
        {
            id: 5,
            name: 'Weber',
            action: (
                <div>
                    <button type="button">
                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                    </button>

                    <button type="button">
                        <IconTrashLines />
                    </button>
                </div>
            ),
        },
    ]);

    const [filteredItems, setFilteredItems] = useState<any>(contactList);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState(1);
    let PageSize = 10;
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredItems.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    const searchContact = () => {
        setFilteredItems(() => {
            return contactList.filter((item: any) => {
                return item.name.toLowerCase().includes(search.toLowerCase()) || item.lastname.toLowerCase().includes(search.toLowerCase());
            });
        });
    };
    useEffect(() => {
        searchContact();
    }, [search]);

    const saveUser = () => {
        // console.log('params', params);
        // if (!isValidName(params.firstname)) {
        //     showMessage('Frist Name is required.', 'error');
        //     return true;
        // }
        // if (!isValidName(params.lastname)) {
        //     showMessage('Last Name is required.', 'error');
        //     return true;
        // }
        // if (!isValidEmail(params.email)) {
        //     showMessage('Invalid Email.', 'error');
        //     return true;
        // }
        // if (params.center == '') {
        //     showMessage('Select Center', 'error');
        //     return true;
        // }

        // if (params.phone?.length < 0 || params.phone?.length > 10) {
        //     showMessage('Invalid phone number', 'error');
        //     return true;
        // }
        // if (!isValidPassword(params.password)) {
        //     showMessage('Password must be at least 6 characters long and include at least 1 number, 1 symbol, and 1 uppercase letter', 'error');
        //     return true;
        // }
        // if (!isValidPassword(params.confirmpassword)) {
        //     showMessage('Confirm Password must be at least 6 characters long and include at least 1 number, 1 symbol, and 1 uppercase letter', 'error');
        //     return true;
        // }
        // if (params.password !== params.confirmpassword) {
        //     showMessage('Passwords must match', 'error');
        //     return true;
        // }
        // if (params.designation === '') {
        //     showMessage('Designation is required.', 'error');
        //     return true;
        // }

        // if (params.address == '') {
        //     showMessage('Enter Address', 'error');
        //     return true;
        // }

        if (params.id) {
            //update user
            let user: any = filteredItems.find((d: any) => d.id === params.id);
            user.firstname = params.firstname;
            user.lastname = params.lastname;
            user.email = params.email;
            user.center = params.center;
            user.status = params.status;
            user.role = params.role;
            user.phone = params.phone;
            user.password = params.password;
            user.confirmpassword = params.confirmpassword;
            // user.designation = params.designation;
            user.address = params.address;
            setParams(user);
        } else {
            //add user
            let maxUserId = filteredItems.length ? filteredItems.reduce((max: any, character: any) => (character.id > max ? character.id : max), filteredItems[0].id) : 0;

            let user = {
                id: +maxUserId + 1,
                firstname: params.firstname,
                lastname: params.lastname,
                email: params.email,
                center: params.center,
                status: params.status,
                role: params.role,
                phone: params.phone,
                password: params.password,
                confirmpassword: params.confirmpassword,
                // designation: params.designation,
                address: params.address,
            };
            setParams(user);
            filteredItems.splice(filteredItems.length, 0, user);
            //   searchContacts();
        }

        showMessage('User has been saved successfully.');
        setAddContactModal(false);
        setIsEdit(false);
    };

    const changePassword = () => {
        if (assignPasswordValue.id === '') {
            showMessage('Select User', 'error');
            return true;
        }
        if (!isValidPassword(assignPasswordValue.password)) {
            showMessage('Password must be at least 6 characters long and include at least 1 number, 1 symbol, and 1 uppercase letter', 'error');
            return true;
        }
        if (!isValidPassword(assignPasswordValue.confirmpassword)) {
            showMessage('Confirm Password must be at least 6 characters long and include at least 1 number, 1 symbol, and 1 uppercase letter', 'error');
            return true;
        }
        if (assignPasswordValue.password !== assignPasswordValue.confirmpassword) {
            showMessage('Passwords must match', 'error');
            return true;
        }
        setAssignPassword(false);
        setAssignPasswordValue({ id: '', password: '', confirmpassword: '' });
    };

    const editUser = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        setModal5(true);
    };

    const handleExport = () => {
        const columns = ['id', 'name'];
        exportToExcel(contactList, columns);
    };
    const deleteUser = (user: any = null) => {
        setFilteredItems(filteredItems.filter((d: any) => d.id !== user.id));
        showMessage('User has been deleted successfully.');
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };
    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">Countries</h2>
                <div className="flex w-full  flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editUser()}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Add Country
                            </button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-outline-primary" onClick={handleExport}>
                                <IconLockDots className="ltr:mr-2 rtl:ml-2" />
                                Export to Excel
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Contacts" className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            {/* <ComponentsModalOptionalSizes /> */}
            <PaginationTable data={contactList} />
            {/* <ActionModal addContactModal={addContactModal} setAddContactModal={setAddContactModal} saveUser={saveUser} /> */}

            {/* <Transition appear show={addContactModal} as={Fragment}>
                <Dialog as="div" open={addContactModal} onClose={() => addContactModal(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 " />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel my-8 w-full max-w-5xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <h5 className="text-lg font-bold">Add Country</h5>
                                        <button onClick={() => setModal5(false)} type="button" className="text-white-dark hover:text-dark">
                                            <IconX />
                                        </button>
                                    </div>

                                    <div className="p-5">
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                            <div className="mb-5">
                                                <label htmlFor="countrysname">Country Name</label>
                                                <input id="countrysname" type="text" placeholder="Enter Country Name" className="form-input" />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="languages">Languages</label>
                                                <input id="languages" type="text" placeholder="Enter Languages" className="form-input" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                            <div className="mb-5">
                                                <label htmlFor="dailingcode">Dailing Code</label>
                                                <input id="dailingcode" type="tel" placeholder="Enter dailing Code" className="form-input" />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="capital">Capital</label>
                                                <input id="capital" type="text" placeholder="Enter Capital" className="form-input" />
                                            </div>
                                        </div>
                                        <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-1 ">
                                            <div className="dropdown">
                                                <label htmlFor="role">Cities</label>
                                                <select className="form-input" defaultValue="" id="role">
                                                    <option value="" disabled={true}>
                                                        Cities
                                                    </option>
                                                    <option value="Chennai">Chennai</option>
                                                    <option value="Vellore">Vellore</option>
                                                    <option value="Bengaluru">Bengaluru</option>
                                                    <option value="New Delhi">New Delhi</option>
                                                    <option value="Mangalore">Mangalore</option>
                                                    <option value="Mumbai">Mumbai</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                            <div className="mb-5">
                                                <label htmlFor="countrydetails">Country Details</label>
                                                <textarea id="countrydetails" rows={3} placeholder="Enter Country Details" className="form-textarea min-h-[80px] resize-none"></textarea>
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="climate">Climate</label>
                                                <textarea id="climate" rows={3} placeholder="Enter Climate" className="form-textarea min-h-[80px] resize-none"></textarea>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                            <div className="mb-5">
                                                <label htmlFor="currency">Currency</label>
                                                <input id="currency" type="tel" placeholder="Enter Currency" className="form-input" />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="timezone">Time Zone</label>
                                                <input id="timezone" type="text" placeholder="Enter Time Zone" className="form-input" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                                            <div className="mb-5">
                                                <label htmlFor="additionalinfo">Additional Info</label>
                                                <textarea id="additionalinfo" rows={3} placeholder="Enter Additional Info" className="form-textarea min-h-[80px] resize-none"></textarea>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                                            <div className="mb-5">
                                                <label htmlFor="website">Website</label>
                                                <input id="website" type="text" placeholder="Enter Website" className="form-input" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 ">
                                            <div className="mb-5">
                                                <label className="flex cursor-pointer items-center">
                                                    <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                                    <span className="text-white-dark">Is popular Country</span>
                                                </label>
                                            </div>
                                            <div className="mb-5">
                                                <label className="flex cursor-pointer items-center">
                                                    <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                                    <span className="text-white-dark">Enable outsource application center</span>
                                                </label>
                                            </div>
                                            <div className="mb-5">
                                                <label className="flex cursor-pointer items-center">
                                                    <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                                    <span className="text-white-dark">Enable Jurisdiction</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 ">
                                            <div className="mb-5">
                                                <ComponentsFormsFileUploadSingle />
                                            </div>
                                            <div className="mb-5">
                                                <ComponentsFormsFileUploadMulti />
                                            </div>
                                        </div>
                                        <div className="mt-8 flex items-center justify-end">
                                            <button onClick={() => setAddContactModal(false)} type="button" className="btn btn-outline-danger">
                                                Cancel
                                            </button>
                                            <button onClick={saveUser} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition> */}
        </div>
    );
};

export default Countries;
