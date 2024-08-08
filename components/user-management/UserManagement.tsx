'use client';

import { getData } from '@/api';
import ComponentsFormsFileUploadMulti from '@/components/Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '@/components/Reusable/file-upload/components-forms-file-upload-single';
import TableLayout from '@/components/layouts/table-layout';
import { use } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import IconX from '@/components/icon/icon-x';
import Swal from 'sweetalert2';
import { showMessage } from '@/utils/notification';
import UserManagementActionModal from './UserManagementActionModal';
import Link from 'next/link';
import { usePaginationOptions } from '@/hooks/usePaginationOptions';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { useCreateUserMutation, useDeleteUserMutation, useGetUsersQuery, userSlice, useUpdateUserMutation } from '@/services/api/userSlice';
import { User } from 'next-auth';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';
import { rolesObject } from '@/entities/role.entity';

const UserManagement: React.FC = () => {
    const [createUser, {}] = useCreateUserMutation();
    const [updateUser, {}] = useUpdateUserMutation();
    const [deleteUser, {}] = useDeleteUserMutation();

    const { page, limit, sortField, sortOrder, search, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10 });

    const { data: countries, isFetching, isLoading } = useGetUsersQuery({ page, limit, sortField, sortOrder, search });
    const { items = [], meta = {} } = countries || {};

    // console.log('users', items);

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const tableColumns = [
        { accessor: 'username', textAlign: 'left', title: 'Username' },

        { accessor: 'first_name', textAlign: 'left', title: 'First Name' },
        { accessor: 'last_name', textAlign: 'left', title: 'Last Name' },
        // { accessor: 'apptype', textAlign: 'left', title: 'Applicant Type' },
        // { accessor: 'email', textAlign: 'left', title: 'Email' },
        {
            accessor: 'center',
            textAlign: 'left',
            title: 'Center',
            render: ({ center }: { center: any }) => {
                return center.name;
            },
        },
        // { accessor: 'status', textAlign: 'left', title: 'status' },
        { accessor: 'phone', textAlign: 'left', title: 'phone' },
        {
            accessor: 'role',
            textAlign: 'left',
            title: 'Role',
            render: ({ role }: { role: string }) => {
                return rolesObject[role];
            },
        },
        {
            accessor: 'status',
            textAlign: 'left',
            title: 'status',
            render: ({ is_active }: { is_active: boolean }) => {
                return is_active == true ? 'Active' : 'InActive';
            },
        },
    ];

    const exportColumns = ['id', 'first_name', 'last_name', 'email', 'center', 'status', 'phone', 'address'];

    const handleDeleteUser = (user: User) =>
        handleDelete({
            deleteMutation: deleteUser,
            item: user,
            items,
            meta,
            handleLocalUpdate: handleLocalRTKUpdate,
            apiObjectRef: userSlice,
            endpoint: 'getUsers',
        });

    const handleSubmit = (value: User) => {
        console.log('value: ', value);
        // if (value.firstname == '' || value.firstname == null) {
        //     showMessage('Enter First name', 'error');
        //     return false;
        // }
        // if (value.lastname == '' || value.lastname == null) {
        //     showMessage('Enter Last name', 'error');
        //     return false;
        // }
        // if (value.email == '' || value.email == null) {
        //     showMessage('Enter Email', 'error');
        //     return false;
        // }
        // if (value.password == '' || value.password == null) {
        //     showMessage('Enter Password', 'error');
        //     return false;
        // }
        // if (value.confirmpassword == '' || value.confirmpassword == null) {
        //     showMessage('Enter Confirm Password ', 'error');
        //     return false;
        // }
        // if (value.password !== value.confirmpassword) {
        //     showMessage('Passwords should match ', 'error');
        //     return false;
        // }
        // if (value.id) {
        //     return handleUpdate({
        //         updateMutation: updateUser,
        //         value,
        //         items,
        //         meta,
        //         handleLocalUpdate: handleLocalRTKUpdate,
        //         apiObjectRef: userSlice,
        //         endpoint: 'getUsers',
        //     });
        // } else {
        //     return handleCreate({
        //         createMutation: createUser,
        //         value,
        //         items,
        //         meta,
        //         handleLocalUpdate: handleLocalRTKUpdate,
        //         apiObjectRef: userSlice,
        //         endpoint: 'getUsers',
        //     });
        // }
    };

    return (
        <>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        User
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>User List</span>
                </li>
            </ul>

            <TableLayout
                title="User"
                filterby="firstname"
                handleDelete={handleDeleteUser}
                tableColumns={tableColumns}
                exportColumns={exportColumns}
                ActionModal={UserManagementActionModal}
                handleSubmit={handleSubmit}
                data={items}
                meta={meta}
                setSearch={setSearch}
                setPage={setPage}
                setLimit={setLimit}
            />
        </>
    );
};

export default UserManagement;
