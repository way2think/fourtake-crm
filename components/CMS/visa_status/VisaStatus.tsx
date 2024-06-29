'use client';
import TableLayout from '@/components/layouts/table-layout';
import { use } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import IconX from '@/components/icon/icon-x';

import Swal from 'sweetalert2';
import VisaStatusActionModal from './VisaStatusActionModal';
import { showMessage } from '@/utils/notification';
import Link from 'next/link';

// const getServerData = async () => {
//     return await getData({ endpoint: 'http://localhost:5001/center' });
// };
const VisaStatus: React.FC<{ visastatusdata: any }> = ({ visastatusdata }) => {
    const [data, setData] = useState(visastatusdata);
    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ endpoint: 'http://localhost:5001/center' });
    // // console.log('dataaaa: ', data);
    // if (isError) {
    //     console.log(error.message);
    // }

    const exportColumns = ['id', 'visastatus', 'statustype'];

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        { accessor: 'visastatus', textAlign: 'left', title: 'Visa Status' },
        { accessor: 'statustype', textAlign: 'left', title: 'Status Type' },
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

    const handleSubmit = (value: any) => {
        if (value.visastatus == '' || value.visastatus == null) {
            showMessage('Enter Visa Type', 'error');
            return false;
        }
        if (value.statustype == '' || value.statustype == null) {
            showMessage('Select Status Type', 'error');
            return false;
        } else if (value.statustype == '' || value.statustype == null) {
        }
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

        if (value.id) {
            //update user
            let formData: any = data.find((d: any) => d.id === value.id);
            formData.visastatus = value.visastatus;
            formData.statustype = value.statustype;
            // formData.email = value.email;
            // formData.center = value.center;
            // formData.status = value.status;
            // formData.role = value.role;
            // formData.phone = value.phone;
            // formData.password = value.password;
            // formData.confirmpassword = value.confirmpassword;
            // user.designation = params.designation;
            // formData.address = value.address;

            return formData;
        } else {
            //add user
            let maxUserId = data.length ? data.reduce((max: any, character: any) => (character.id > max ? character.id : max), data[0].id) : 0;

            let formData = {
                id: +maxUserId + 1,
                visastatus: value.visastatus,
                statustype: value.statustype,
                // dailingcode: value.dailingcode,
                // capital: value.capital,
                // cities: value.cities,
                // countrydetails: value.countrydetails,
                // climate: value.climate,
                // currency: value.currency,
                // timezone: value.timezone,
                // additionalinfo: value.additionalinfo,
                // website: value.website,
                // ispopular: value.ispopular,
                // isoutsource: value.isoutsource,
                // isjurisdiction: value.isjurisdiction,
                // image: value.image,
                // flag: value.flag,
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
                    <span>Visa Status</span>
                </li>
            </ul> */}
            <TableLayout
                title="Visa Status"
                handleDelete={handleDelete}
                data={data}
                setData={setData}
                filterby="visastatus"
                totalPages={data?.length || 0}
                tableColumns={tableColumns}
                ActionModal={VisaStatusActionModal}
                exportColumns={exportColumns}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default VisaStatus;
