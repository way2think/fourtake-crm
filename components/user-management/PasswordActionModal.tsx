'use client';

import IconX from '@/components/icon/icon-x';
import { rolesObject } from '@/entities/role.entity';
import { User } from '@/entities/user.entity';
import { useGetUsersQuery, useUpdateUserPasswordMutation } from '@/services/api/userSlice';
import { setIsLoading } from '@/store/app.store';
import { showMessage } from '@/utils/notification';
import { handleErrorResponse } from '@/utils/rtk-http';
import { isValidEmail, isValidName, isValidPassword, isValidPhoneNumber } from '@/utils/validator';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

interface PasswordActionModalProps {
    assignPassword: any;
    setAssignPassword: any;
    assignPasswordValue: any;
    setAssignPasswordValue: any;
}

const PasswordActionModal: React.FC<PasswordActionModalProps> = ({ assignPassword, setAssignPassword, assignPasswordValue, setAssignPasswordValue }) => {
    const dispatch = useDispatch();

    const { data: users, isFetching, isLoading, isError, error } = useGetUsersQuery({ page: 0, limit: 0 });
    const { items = [], meta = {} } = users || {};

    const [updateUserPassword, { isLoading: isUpdateLoading }] = useUpdateUserPasswordMutation();

    const handlePasswordChange = (e: any) => {
        const { value, id } = e.target;
        setAssignPasswordValue({ ...assignPasswordValue, [id]: value });
    };

    const handleChangePassword = async () => {
        // console.log('assignPasswordValue', assignPasswordValue);

        if (assignPasswordValue.id === '') {
            showMessage('Select User', 'error');
            return true;
        }
        // if (!isValidPassword(assignPasswordValue.password)) {
        //     showMessage('Password must be at least 6 characters long and include at least 1 number, 1 symbol, and 1 uppercase letter', 'error');
        //     return true;
        // }
        // if (!isValidPassword(assignPasswordValue.confirmpassword)) {
        //     showMessage('Confirm Password must be at least 6 characters long and include at least 1 number, 1 symbol, and 1 uppercase letter', 'error');
        //     return true;
        // }
        if (assignPasswordValue.password !== assignPasswordValue.confirmpassword) {
            showMessage('Passwords must match', 'error');
            return true;
        }

        try {
            const res = await updateUserPassword({
                id: assignPasswordValue.id,
                body: {
                    password: assignPasswordValue.password,
                },
            }).unwrap();

            console.log('res', res);

            await Swal.fire({ title: 'Updated!', text: res.message, icon: 'success', customClass: { popup: 'sweet-alerts' } });

            setAssignPassword(false);
            setAssignPasswordValue({ id: '', password: '', confirmpassword: '' });
        } catch (e) {
            console.log('err', e);
            await handleErrorResponse(e);
            setAssignPassword(false);
            setAssignPasswordValue({ id: '', password: '', confirmpassword: '' });
        }
    };

    useEffect(() => {
        dispatch(setIsLoading(isLoading));
    }, [dispatch, isLoading, isUpdateLoading]);

    return (
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
                                                <select className="form-input" onChange={(e) => handlePasswordChange(e)} id="id">
                                                    <option value="" disabled={true}>
                                                        Select User
                                                    </option>
                                                    {users &&
                                                        items?.map((user: User) => (
                                                            <option key={user.id} value={user.id}>
                                                                {`${user.username} (${user.first_name} ${user.last_name}) - ${rolesObject[user.role]}`}
                                                            </option>
                                                        ))}
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
                                                    value={assignPasswordValue?.password}
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
                                                    value={assignPasswordValue?.confirmpassword}
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
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleChangePassword}>
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
    );
};

export default PasswordActionModal;
