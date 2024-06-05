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
import Pagination from './pagination';
import './pagination.css';

const UserList = () => {
    const [addContactModal, setAddContactModal] = useState<any>(false);
    const [assignPassword, setAssignPassword] = useState<boolean>(false);

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
            firstname: 'Alan',
            lastname: 'green',
            email: 'alan@mail.com',
            role: 'Web Developer',
            center: 'Bangalore',
            status: false,
            phone: '+1 202 555 0197',
            address: 'No. 21 XYZ street',
        },

        {
            id: 2,
            firstname: 'Alan',
            lastname: 'green',
            email: 'alan@mail.com',
            role: 'Web Developer',
            center: 'Bangalore',
            status: false,
            phone: '+1 202 555 0197',
            address: 'No. 21 XYZ street',
        },
        {
            id: 3,
            firstname: 'raji',
            lastname: 'green',
            email: 'alan@mail.com',
            role: 'Web Developer',
            center: 'Bangalore',
            status: false,
            phone: '+1 202 555 0197',
            address: 'No. 21 XYZ street',
        },
        {
            id: 4,
            firstname: 'Alan',
            lastname: 'green',
            email: 'alan@mail.com',
            role: 'Web Developer',
            center: 'Bangalore',
            status: false,
            phone: '+1 202 555 0197',
            address: 'No. 21 XYZ street',
        },
        {
            id: 5,
            firstname: 'Alan',
            lastname: 'green',
            email: 'alan@mail.com',
            role: 'Web Developer',
            center: 'Bangalore',
            status: false,
            phone: '+1 202 555 0197',
            address: 'No. 21 XYZ street',
        },
        {
            id: 6,
            firstname: 'Alan',
            lastname: 'green',
            email: 'alan@mail.com',
            role: 'Web Developer',
            center: 'Bangalore',
            status: true,
            phone: '+1 202 555 0197',
            address: 'No. 21 XYZ street',
        },
        {
            id: 7,
            firstname: 'Alan',
            lastname: 'green',
            email: 'alan@mail.com',
            role: 'Web Developer',
            center: 'Bangalore',
            status: true,
            phone: '+1 202 555 0197',
            address: 'No. 21 XYZ street',
        },
        {
            id: 8,
            firstname: 'Alan',
            lastname: 'green',
            email: 'alan@mail.com',
            role: 'Web Developer',
            center: 'Bangalore',
            status: true,
            phone: '+1 202 555 0197',
            address: 'No. 21 XYZ street',
        },
        {
            id: 9,
            firstname: 'Alan',
            lastname: 'green',
            email: 'alan@mail.com',
            role: 'Web Developer',
            center: 'Bangalore',
            status: false,
            phone: '+1 202 555 0197',
            address: 'No. 21 XYZ street',
        },

        {
            id: 10,
            firstname: 'Alan',
            lastname: 'green',
            email: 'alan@mail.com',
            role: 'Web Developer',
            center: 'Bangalore',
            status: false,
            phone: '+1 202 555 0197',
            address: 'No. 21 XYZ street',
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
                return item.firstname.toLowerCase().includes(search.toLowerCase()) || item.lastname.toLowerCase().includes(search.toLowerCase());
            });
        });
    };
    useEffect(() => {
        searchContact();
    }, [search]);

    const saveUser = () => {
        // console.log('params', params);
        if (!isValidName(params.firstname)) {
            showMessage('Frist Name is required.', 'error');
            return true;
        }
        if (!isValidName(params.lastname)) {
            showMessage('Last Name is required.', 'error');
            return true;
        }
        if (!isValidEmail(params.email)) {
            showMessage('Invalid Email.', 'error');
            return true;
        }
        if (params.center == '') {
            showMessage('Select Center', 'error');
            return true;
        }

        if (params.phone?.length < 0 || params.phone?.length > 10) {
            showMessage('Invalid phone number', 'error');
            return true;
        }
        if (!isValidPassword(params.password)) {
            showMessage('Password must be at least 6 characters long and include at least 1 number, 1 symbol, and 1 uppercase letter', 'error');
            return true;
        }
        if (!isValidPassword(params.confirmpassword)) {
            showMessage('Confirm Password must be at least 6 characters long and include at least 1 number, 1 symbol, and 1 uppercase letter', 'error');
            return true;
        }
        if (params.password !== params.confirmpassword) {
            showMessage('Passwords must match', 'error');
            return true;
        }
        // if (params.designation === '') {
        //     showMessage('Designation is required.', 'error');
        //     return true;
        // }

        if (params.address == '') {
            showMessage('Enter Address', 'error');
            return true;
        }

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
        setAddContactModal(true);
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
                <h2 className="text-xl">Users</h2>
                <div className="flex w-full  flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editUser()}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Add User
                            </button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-outline-primary" onClick={() => setAssignPassword(true)}>
                                <IconLockDots className="ltr:mr-2 rtl:ml-2" />
                                Assign Password
                            </button>
                        </div>
                        {/* <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'list' && 'bg-primary text-white'}`} onClick={() => setValue('list')}>
                                <IconListCheck />
                            </button>
                        </div> */}
                        {/* <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'grid' && 'bg-primary text-white'}`} onClick={() => setValue('grid')}>
                                <IconLayoutGrid />
                            </button>
                        </div> */}
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Contacts" className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            {value === 'list' && (
                <div className="panel mt-5 overflow-hidden border-0 p-0">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>SNo</th>
                                    <th>Frist Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Center </th>
                                    <th>Status</th>
                                    <th>Phone</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((contact: any) => {
                                    return (
                                        <tr key={contact.id}>
                                            <td>
                                                <div className="flex w-max items-center">
                                                    <div>{contact.id}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex w-max items-center">
                                                    <div>{contact.firstname}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex w-max items-center">
                                                    <div>{contact.lastname}</div>
                                                </div>
                                            </td>
                                            <td>{contact.email}</td>
                                            <td className="whitespace-nowrap">{contact.role}</td>
                                            <td className="whitespace-nowrap">{contact.center}</td>
                                            <td className="whitespace-nowrap">{contact.status ? 'Active' : 'Inactive'}</td>
                                            <td className="whitespace-nowrap">{contact.phone}</td>
                                            <td>
                                                <div className="flex items-center justify-center gap-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => {
                                                            editUser(contact);
                                                            setIsEdit(true);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    {/* <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(contact)}>
                                                        Delete
                                                    </button> */}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Pagination className="pagination-bar" currentPage={currentPage} totalCount={filteredItems.length} pageSize={PageSize} onPageChange={(page: any) => setCurrentPage(page)} />
                    </div>
                </div>
            )}

            {/* {value === 'grid' && (
                <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {filteredItems.map((contact: any) => {
                        return (
                            <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]" key={contact.id}>
                                <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">
                                    <div className="rounded-t-md bg-white/40 bg-[url('/assets/images/notification-bg.png')] bg-cover bg-center p-6 pb-0">
                                        <img className="mx-auto max-h-40 w-4/5 object-contain" src={`/assets/images/${contact.path}`} alt="contact_image" />
                                    </div>
                                    <div className="relative -mt-10 px-6 pb-24">
                                        <div className="rounded-md bg-white px-2 py-4 shadow-md dark:bg-gray-900">
                                            <div className="text-xl">{contact.name}</div>
                                            <div className="text-white-dark">{contact.role}</div>
                                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                                                <div className="flex-auto">
                                                    <div className="text-info">{contact.posts}</div>
                                                    <div>Posts</div>
                                                </div>
                                                <div className="flex-auto">
                                                    <div className="text-info">{contact.following}</div>
                                                    <div>Following</div>
                                                </div>
                                                <div className="flex-auto">
                                                    <div className="text-info">{contact.followers}</div>
                                                    <div>Followers</div>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <ul className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                                                    <li>
                                                        <button type="button" className="btn btn-outline-primary h-7 w-7 rounded-full p-0">
                                                            <IconFacebook />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button type="button" className="btn btn-outline-primary h-7 w-7 rounded-full p-0">
                                                            <IconInstagram />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button type="button" className="btn btn-outline-primary h-7 w-7 rounded-full p-0">
                                                            <IconLinkedin />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button type="button" className="btn btn-outline-primary h-7 w-7 rounded-full p-0">
                                                            <IconTwitter />
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">Email :</div>
                                                <div className="truncate text-white-dark">{contact.email}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">Phone :</div>
                                                <div className="text-white-dark">{contact.phone}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">Address :</div>
                                                <div className="text-white-dark">{contact.location}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 mt-6 flex w-full gap-4 p-6 ltr:left-0 rtl:right-0">
                                        <button type="button" className="btn btn-outline-primary w-1/2" onClick={() => editUser(contact)}>
                                            Edit
                                        </button>
                                        <button type="button" className="btn btn-outline-danger w-1/2" onClick={() => deleteUser(contact)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )} */}

            <Transition appear show={addContactModal} as={Fragment}>
                <Dialog
                    as="div"
                    open={addContactModal}
                    onClose={() => {
                        setAddContactModal(false);
                        setIsEdit(false);
                    }}
                    className="relative z-50"
                >
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel w-full max-w-2xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAddContactModal(false);
                                            setIsEdit(false);
                                        }}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-600 ltr:right-4 rtl:left-4"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">{params.id ? 'Edit User' : 'Add User'}</div>
                                    <div className="p-5">
                                        {/* <AddUserForm  saveUser={saveUser} setParams={setParams} /> */}
                                        <form>
                                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                                {/* <div className="mb-5">
                                                    <label htmlFor="userid">User Id</label>
                                                    <input
                                                        id="userid"
                                                        type="text"
                                                        disabled={true}
                                                        placeholder="UserId - autofill"
                                                        className="form-input"
                                                        value={params.userid}
                                                        onChange={(e) => changeValue(e)}
                                                    />
                                                </div> */}
                                                <div className="mb-5">
                                                    <label htmlFor="firstname">Frist Name</label>
                                                    <input id="firstname" type="text" placeholder="Enter Frist Name" className="form-input" value={params.firstname} onChange={(e) => changeValue(e)} />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="lastname">Last Name</label>
                                                    <input id="lastname" type="text" placeholder="Enter Last Name" className="form-input" value={params.lastname} onChange={(e) => changeValue(e)} />
                                                </div>

                                                <div className="mb-5">
                                                    <label htmlFor="email">Email</label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        disabled={isEdit}
                                                        placeholder="Enter Email"
                                                        className="form-input"
                                                        value={params.email}
                                                        onChange={(e) => changeValue(e)}
                                                    />
                                                </div>

                                                <div className="dropdown">
                                                    <label htmlFor="center">Center</label>
                                                    <select className="form-input" defaultValue={params.center} onChange={(e) => changeValue(e)} id="center">
                                                        <option value="" disabled={true}>
                                                            Open this select menu
                                                        </option>
                                                        <option value="One">One</option>
                                                        <option value="Two">Two</option>
                                                        <option value="Three">Three</option>
                                                    </select>
                                                </div>
                                                {/* <div className="dropdown">
                                                    <label htmlFor="status">Status</label>
                                                    <select className="form-input" defaultValue={params.status} onChange={(e) => changeValue(e)} id="status">
                                                        <option value="" disabled={true}>
                                                            Open this select menu
                                                        </option>
                                                        <option value="One">One</option>
                                                        <option value="Two">Two</option>
                                                        <option value="Three">Three</option>
                                                    </select>
                                                </div> */}

                                                <div className="dropdown">
                                                    <label htmlFor="role">Role</label>
                                                    <select className="form-input" defaultValue={params.role} onChange={(e) => changeValue(e)} id="role">
                                                        <option value="" disabled={true}>
                                                            Open this select menu
                                                        </option>
                                                        <option value="One">One</option>
                                                        <option value="Two">Two</option>
                                                        <option value="Three">Three</option>
                                                    </select>
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="phone">Phone Number</label>
                                                    <input id="phone" type="text" placeholder="Enter Phone Number" className="form-input" value={params.phone} onChange={(e) => changeValue(e)} />
                                                </div>

                                                {!isEdit && (
                                                    <>
                                                        {' '}
                                                        <div className="mb-5">
                                                            <label htmlFor="password">Password</label>
                                                            <input
                                                                id="password"
                                                                type="password"
                                                                placeholder="Enter Password"
                                                                className="form-input"
                                                                value={params.password}
                                                                onChange={(e) => changeValue(e)}
                                                            />
                                                        </div>
                                                        <div className="mb-5">
                                                            <label htmlFor="confirmpassword">Confirm Password</label>
                                                            <input
                                                                id="confirmpassword"
                                                                type="password"
                                                                placeholder="Enter Confirm  Password"
                                                                className="form-input"
                                                                value={params.confirmpassword}
                                                                onChange={(e) => changeValue(e)}
                                                            />
                                                        </div>
                                                    </>
                                                )}

                                                {/* <div className="mb-5">
                                                    <label htmlFor="designation">Designation</label>
                                                    <input
                                                        id="designation"
                                                        type="text"
                                                        placeholder="Enter Designation"
                                                        className="form-input"
                                                        value={params.designation}
                                                        onChange={(e) => changeValue(e)}
                                                    />
                                                </div> */}
                                                <div className="mb-4">
                                                    <label className="inline-flex cursor-pointer items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            className="peer sr-only"
                                                            onChange={(e) => {
                                                                setIsChecked(!isChecked);
                                                                setParams({ ...params, status: !isChecked });
                                                            }}
                                                            id="status"
                                                        />
                                                        <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
                                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Status</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                                                <div className="mb-5">
                                                    <label htmlFor="address">Address</label>
                                                    <textarea
                                                        id="address"
                                                        rows={3}
                                                        placeholder="Enter Address"
                                                        className="form-textarea min-h-[130px] resize-none"
                                                        value={params.address}
                                                        onChange={(e) => changeValue(e)}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="mt-8 flex items-center justify-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() => {
                                                        setAddContactModal(false);
                                                        setIsEdit(false);
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>
                                                    {params.id ? 'Update' : 'Add'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={assignPassword} as={Fragment}>
                <Dialog as="div" open={assignPassword} onClose={() => setAssignPassword(false)} className="relative z-50">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel w-full max-w-xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAssignPassword(false)}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-600 ltr:right-4 rtl:left-4"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">Assign Password</div>
                                    <div className="p-5">
                                        {/* <AddUserForm  saveUser={saveUser} setParams={setParams} /> */}
                                        <form>
                                            <div className="mb-4 grid grid-cols-1 gap-5 md:grid-cols-1   ">
                                                <div className="dropdown">
                                                    <label htmlFor="center">Users</label>
                                                    <select className="form-input" onChange={(e) => handlePasswordChange(e)} id="id" defaultValue={assignPasswordValue.id}>
                                                        <option value="" disabled={true}>
                                                            Select User
                                                        </option>
                                                        <option value="raji">raji </option>
                                                        <option value="Two">sanjay</option>
                                                        <option value="Three">jagan</option>
                                                        <option value="Three">santhosh</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                                <div className="mb-5">
                                                    <label htmlFor="password">Password</label>
                                                    <input
                                                        id="password"
                                                        type="password"
                                                        placeholder="Enter Password"
                                                        className="form-input"
                                                        value={assignPasswordValue.password}
                                                        onChange={(e) => handlePasswordChange(e)}
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="confirmpassword">Confirm Password</label>
                                                    <input
                                                        id="confirmpassword"
                                                        type="password"
                                                        placeholder="Enter Confirm  Password"
                                                        className="form-input"
                                                        value={assignPasswordValue.confirmpassword}
                                                        onChange={(e) => handlePasswordChange(e)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-8 flex items-center justify-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() => {
                                                        setAssignPassword(false);
                                                        setAssignPasswordValue({ id: '', password: '', confirmpassword: '' });
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={changePassword}>
                                                    Add
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default UserList;
