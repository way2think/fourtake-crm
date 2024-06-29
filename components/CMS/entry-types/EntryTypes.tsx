'use client';
import { getData } from '@/api';
import ComponentsFormsFileUploadMulti from '@/components/Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '@/components/Reusable/file-upload/components-forms-file-upload-single';
import TableLayout from '@/components/layouts/table-layout';
import { use } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import IconX from '@/components/icon/icon-x';
import EntryTypesActionModal from './EntryTypesActionModal';
import { title } from 'process';
import Swal from 'sweetalert2';
import { showMessage } from '@/utils/notification';
import Link from 'next/link';

const getServerData = async () => {
    return await getData({ endpoint: 'http://localhost:5001/center' });
};
const EntryTypes: React.FC<{ entrytypedata: any }> = ({ entrytypedata }) => {
    const [data, setData] = useState(entrytypedata);
    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ endpoint: 'http://localhost:5001/center' });
    // // console.log('dataaaa: ', data);
    // if (isError) {
    //     console.log(error.message);
    // }

    // const data = [
    //     {
    //         id: 2,
    //         name: 'Bangalore',
    //         phone: '8778229794',
    //         email: 'blr@fourtakevisas.com',
    //         address: 'brigade road, bangalore',
    //         is_active: true,
    //     },
    //     {
    //         id: 2,
    //         name: 'Bangalore',
    //         phone: '8778229794',
    //         email: 'blr@fourtakevisas.com',
    //         address: 'brigade road, bangalore',
    //         is_active: true,
    //     },
    // ];

    const handleDelete = (row: any) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: ` You want to delete ${row.entrytype}`,
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

    const exportColumns = ['id', 'entrytype'];

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'S.NO' },
        { accessor: 'entrytype', textAlign: 'left', title: 'Entry Type' },
        // { accessor: 'phone', textAlign: 'left' },
        // { accessor: 'email', textAlign: 'left' },
        // { accessor: 'address', textAlign: 'left' },
        // {
        //     accessor: 'is_active',
        //     textAlign: 'left',
        //     render: ({ is_active }: { is_active: any }) => {
        //         return is_active;
        //     },
        // },
    ];
    const handleSubmit = (value: any) => {
        if (value.entrytype == '' || value.entrytype == null) {
            showMessage('Enter Entry type', 'error');
            return false;
        }
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

        if (value.id) {
            //update user
            let formData: any = data.find((d: any) => d.id === value.id);
            formData.entrytype = value.entrytype;

            return formData;
        } else {
            //add user
            let maxUserId = data.length ? data.reduce((max: any, character: any) => (character.id > max ? character.id : max), data[0].id) : 0;

            let formData = {
                id: +maxUserId + 1,
                entrytype: value.entrytype,
            };
            setData([...data, formData]);
            return formData;

            //   searchContacts();
        }

        // showMessage('User has been saved successfully.');
        // setAddContactModal(false);
        // setIsEdit(false);
    };
    return (
        <>
            {/* <ul className="flex space-x-2 rtl:space-x-reverse mb-3">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        CMS
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Entry Types</span>
                </li>
            </ul> */}
            <TableLayout
                title="Entry Types"
                filterby="entrytype"
                setData={setData}
                data={data}
                totalPages={data?.length || 0}
                tableColumns={tableColumns}
                ActionModal={EntryTypesActionModal}
                handleDelete={handleDelete}
                exportColumns={exportColumns}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default EntryTypes;
