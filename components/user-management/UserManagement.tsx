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

// const getServerData = async () => {
//     return await getData({ endpoint: 'http://localhost:5001/center' });
// };
const UserManagement: React.FC<{ userdata: any }> = ({ userdata }) => {
    const [data, setData] = useState(userdata);
    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ endpoint: 'http://localhost:5001/center' });
    // // console.log('dataaaa: ', data);
    // if (isError) {
    //     console.log(error.message);
    // }

    // userid: '1',
    // usertype: 'Business',
    // firstname: 'alan',
    // lastname: 'james',
    // email: 'alan@gmail.com',
    // center: 'Bangalore',
    // status: 'active',
    // phone: '9874563215',
    // password: 'way2think',
    // confirmpassword: 'way2think',
    // address: 'No.21 NY Street',

    // const getUser = async () => {
    //     try {
    //         const response = await getData({ endpoint: 'user' });
    //         if (!response.isError) {
    //             console.log('User data:', response.data);
    //         } else {
    //             console.error('Error fetching user data:', response.error);
    //         }
    //     } catch (error) {
    //         console.error('Unexpected error:', error);
    //     }
    // };

   
    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },

        { accessor: 'firstname', textAlign: 'left', title: 'First Name' },
        { accessor: 'lastname', textAlign: 'left', title: 'Last Name' },
        { accessor: 'apptype', textAlign: 'left', title: 'Applicant Type' },
        // { accessor: 'email', textAlign: 'left', title: 'Email' },
        { accessor: 'center', textAlign: 'left', title: 'Center' },
        // { accessor: 'status', textAlign: 'left', title: 'status' },
        { accessor: 'phone', textAlign: 'left', title: 'phone' },
        { accessor: 'role', textAlign: 'left', title: 'Role' },
        {
            accessor: 'status',
            textAlign: 'left',
            title: 'status',
            render: ({ status }: { status: any }) => {
                return status == true ? 'Active' : 'InActive';
            },
        },
    ];

    const handleDelete = (row: any) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then((result) => {
            if (result.value) {
                setData(data.filter((item: any) => item.id !== row.id));
                Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
                return true;
            }
        });
    };

    const exportColumns = ['id', 'apptype', 'firstname', 'lastname', 'email', 'center', 'status', 'phone', 'address'];

    const handleSubmit = (value: any) => {
        if (value.firstname == '' || value.firstname == null) {
            showMessage('Enter First name', 'error');
            return false;
        }

        if (value.lastname == '' || value.lastname == null) {
            showMessage('Enter Last name', 'error');
            return false;
        }
        if (value.email == '' || value.email == null) {
            showMessage('Enter Email', 'error');
            return false;
        }
        if (value.password == '' || value.password == null) {
            showMessage('Enter Password', 'error');
            return false;
        }
        if (value.confirmpassword == '' || value.confirmpassword == null) {
            showMessage('Enter Confirm Password ', 'error');
            return false;
        }
        if (value.password !== value.confirmpassword) {
            showMessage('Passwords should match ', 'error');
            return false;
        }

        if (value.id) {
            //update user
            const updatedData = data.map((d: any) => (d.id === value.id ? { ...d, ...value } : d));
            setData(updatedData);

            return updatedData;
        } else {
            //add user
            const maxUserId = data.length ? Math.max(...data.map((d: any) => d.id)) : 0;
            const newUser = {
                ...value,
                id: +maxUserId + 1,
            };
            setData([...data, newUser]);
            return newUser;
        }

        // showMessage('User has been saved successfully.');
        // setAddContactModal(false);
        // setIsEdit(false);
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
                setData={setData}
                filterby="firstname"
                handleDelete={handleDelete}
                data={data}
                totalPages={data?.length || 0}
                tableColumns={tableColumns}
                exportColumns={exportColumns}
                ActionModal={UserManagementActionModal}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default UserManagement;
