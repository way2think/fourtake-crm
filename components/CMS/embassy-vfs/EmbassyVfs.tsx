'use client';

import { getData } from '@/api';
import ComponentsFormsFileUploadMulti from '@/components/Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '@/components/Reusable/file-upload/components-forms-file-upload-single';
import TableLayout from '@/components/layouts/table-layout';
import { use } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import IconX from '@/components/icon/icon-x';
import EmbassyActionModal from './EmbassyActionModal';
import Swal from 'sweetalert2';
import { showMessage } from '@/utils/notification';
const getServerData = async () => {
    return await getData({ url: 'http://localhost:5001/center' });
};
const EmbassyVfs: React.FC<{ embassyvfsdata: any }> = ({ embassyvfsdata }) => {
    const [data, setData] = useState(embassyvfsdata);
    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ url: 'http://localhost:5001/center' });
    // // console.log('dataaaa: ', data);
    // if (isError) {
    //     console.log(error.message);
    // }

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'S.NO' },
        { accessor: 'embassy', textAlign: 'left', title: 'Type' },
        { accessor: 'country', textAlign: 'left', title: 'Visa Country' },
        { accessor: 'name', textAlign: 'left', title: 'Name' },
        { accessor: 'state', textAlign: 'left', title: 'State' },
        { accessor: 'city', textAlign: 'left', title: 'City' },
    ];

    const exportColumns = ['id', 'embassy', 'country', 'name', 'city', 'state'];
    const handleDelete = (row: any) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: `You want to delete ${row.name}`,
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
        console.log('delete', row);
    };
    const handleSubmit = (value: any) => {
        if (value.embassy == '' || value.embassy == null) {
            showMessage('Select type - Embassy/VFS', 'error');
            return false;
        }
        if (value.country == '' || value.country == null) {
            showMessage('Select country name', 'error');
            return false;
        }
        if (value.name == '' || value.name == null) {
            showMessage('Enter embassy name', 'error');
            return false;
        }
        if (value.city == '' || value.city == null) {
            showMessage('Slect City', 'error');
            return false;
        }
        if (value.state == '' || value.state == null) {
            showMessage('Select State', 'error');
            return false;
        }

        if (value.id) {
            //update user
            let formData: any = data.find((d: any) => d.id === value.id);
            formData.embassy = value.embassy;
            formData.country = value.country;
            formData.jurisdiction = value.jurisdiction;
            formData.name = value.name;
            formData.address = value.address;
            formData.city = value.city;
            formData.state = value.state;
            formData.phone = value.phone;
            formData.fax = value.fax;
            formData.mail = value.mail;
            formData.submissiondetails = value.submissiondetails;
            formData.collectiondetails = value.collectiondetails;
            formData.processingtime = value.processingtime;

            return formData;
        } else {
            //add user
            let maxUserId = data.length ? data.reduce((max: any, character: any) => (character.id > max ? character.id : max), data[0].id) : 0;

            let formData = {
                id: +maxUserId + 1,
                embassy: value.embassy,
                country: value.country,
                jurisdiction: value.jurisdiction,
                name: value.name,
                address: value.address,
                city: value.city,
                state: value.state,
                fax: value.fax,
                mail: value.mail,
                submissiondetails: value.submissiondetails,
                collectiondetails: value.collectiondetails,
                processingtime: value.processingtime,
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
                title="Embassy/Vfs"
                setData={setData}
                filterby="country"
                data={data}
                handleDelete={handleDelete}
                totalPages={data?.length || 0}
                tableColumns={tableColumns}
                exportColumns={exportColumns}
                ActionModal={EmbassyActionModal}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default EmbassyVfs;
