'use client';
import { getData } from '@/api';
import ComponentsFormsFileUploadMulti from '@/components/Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '@/components/Reusable/file-upload/components-forms-file-upload-single';
import TableLayout from '@/components/layouts/table-layout';
import { use } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import IconX from '@/components/icon/icon-x';
import VisaChecklistActionModal from './VisaChecklistActionModal';
import Swal from 'sweetalert2';
import { showMessage } from '@/utils/notification';
import Link from 'next/link';

const getServerData = async () => {
    return await getData({ endpoint: 'http://localhost:5001/center' });
};
const VisaChecklist: React.FC<{ visachecklistdata: any }> = ({ visachecklistdata }) => {
    const [data, setData] = useState(visachecklistdata);
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

    const tableColumns = [
        { accessor: 'country', textAlign: 'left', title: 'Country' },
        { accessor: 'type', textAlign: 'left', title: 'Visa type' },
        { accessor: 'embassy', textAlign: 'left', title: 'Embassy' },
    ];

    const handleDelete = (row: any) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: `You want to delete ${row.country}`,
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

    const exportColumns = ['country', 'type', 'embassy'];
    const handleSubmit = (value: any) => {
        if (value.country == '' || value.country == null) {
            showMessage('Select country ', 'error');
            return false;
        }
        if (value.type == '' || value.type == null) {
            showMessage('Select Visa type', 'error');
            return false;
        }
        if (value.embassy == '' || value.embassy == null) {
            showMessage('Select Embassy Location', 'error');
            return false;
        }
        if (value.id) {
            //update user
            let formData: any = data.find((d: any) => d.id === value.id);
            formData.country = value.country;
            formData.type = value.type;
            formData.embassy = value.embassy;
            formData.checklist = value.checklist;
            formData.fee = value.fee;
            formData.form = value.form;

            return formData;
        } else {
            //add user
            let maxUserId = data.length ? data.reduce((max: any, character: any) => (character.id > max ? character.id : max), data[0].id) : 0;

            let formData = {
                id: +maxUserId + 1,
                country: value.country,
                type: value.type,
                embassy: value.embassy,
                checklist: value.checklist,
                fee: value.fee,
                form: value.form,
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
            <TableLayout
                title="Visa Checklist"
                data={data}
                totalPages={data?.length || 0}
                tableColumns={tableColumns}
                ActionModal={VisaChecklistActionModal}
                handleDelete={handleDelete}
                setData={setData}
                exportColumns={exportColumns}
                filterby={['country', 'type', 'embassy']} // handleSave ={handleSave}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default VisaChecklist;
