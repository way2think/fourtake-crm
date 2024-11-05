'use client';

import TableLayout from '@/components/layouts/table-layout';
import React from 'react';
import UserManagementActionModal from './UserManagementActionModal';
import Link from 'next/link';
import { usePaginationOptions } from '@/hooks/usePaginationOptions';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { useCreateUserMutation, useDeleteUserMutation, useGetUsersQuery, userSlice, useUpdateUserMutation } from '@/services/api/userSlice';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';
import { rolesObject } from '@/entities/role.entity';
import { showMessage } from '@/utils/notification';
import { User } from '@/entities/user.entity';
import Loading from '../layouts/loading';
import LoadingSpinner from '../Reusable/LoadingSpinner/LoadingSpinner';

const UserManagement: React.FC = () => {
    const [createUser, { isLoading: isCreateLoading }] = useCreateUserMutation();
    const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
    const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation();

    const { page, limit, sortField, sortOrder, search, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10 });

    const { data: countries, isFetching, isLoading } = useGetUsersQuery({ page, limit, sortField, sortOrder, search });
    const { items = [], meta = {} } = countries || {};

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
        {
            accessor: 'is_logged_in',
            textAlign: 'left',
            title: 'Logged In',
            render: ({ is_logged_in }: { is_logged_in: boolean }) => {
                return is_logged_in == true ? 'Yes' : 'No';
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
        if (value.first_name == '' || value.first_name == null) {
            showMessage('Enter First name', 'error');
            return false;
        }
        if (value.last_name == '' || value.last_name == null) {
            showMessage('Enter Last name', 'error');
            return false;
        }
        if (value.username == '' || value.username == null) {
            showMessage('Enter Email', 'error');
            return false;
        }

        console.log('value: ', value);

        if (value.id) {
            return handleUpdate({
                updateMutation: updateUser,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: userSlice,
                endpoint: 'getUsers',
            });
        } else {
            // password validation only for create
            if (value.password == '' || value.password == null) {
                showMessage('Enter Password', 'error');
                return false;
            }
            if (value.confirm_password == '' || value.confirm_password == null) {
                showMessage('Enter Confirm Password ', 'error');
                return false;
            }
            if (value.password !== value.confirm_password) {
                showMessage('Passwords should match ', 'error');
                return false;
            }
            return handleCreate({
                createMutation: createUser,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: userSlice,
                endpoint: 'getUsers',
            });
        }
    };

    return (
        <>
            {(isLoading || isCreateLoading || isUpdateLoading || isDeleteLoading) && <LoadingSpinner />}
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
