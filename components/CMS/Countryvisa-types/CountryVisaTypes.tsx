'use client';
import { getData } from '@/api';
import ComponentsFormsFileUploadMulti from '@/components/Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '@/components/Reusable/file-upload/components-forms-file-upload-single';
import TableLayout from '@/components/layouts/table-layout';
import { use } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import IconX from '@/components/icon/icon-x';
import CountryActionModal from './CountryVisaTypesActionModal';
import CountryVisaTypeActionModal from './CountryVisaTypesActionModal';

import { showMessage } from '@/utils/notification';
import Swal from 'sweetalert2';
import Filter from '@/components/layouts/filtersetting';

const getServerData = async () => {
    return await getData({ url: 'http://localhost:5001/center' });
};
const CountryVisaTypes: React.FC<{ countryvisadata: any }> = ({ countryvisadata }) => {
    const [data, setData] = useState(countryvisadata);
    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ url: 'http://localhost:5001/center' });
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
            text: `Do You want to Delete ${row.country}`,
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

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        { accessor: 'country', textAlign: 'left', title: 'Country Name' },
        {
            accessor: 'visatypes',
            textAlign: 'left',
            title: 'Visa Type',
            render: ({ visatypes }: { visatypes: { value: string }[] }) => {
                return visatypes.map((visaType) => visaType).join(', ');
            },
        },
    ];

    const exportColumns = ['id', 'country', 'visatypes'];
    const handleSubmit = (value:any) => {
        console.log('value', value);
        if (value.visatypes == '' || value.visatypes == null || value.visatypes.length === 0) {
            showMessage('Select VisaTypes', 'error');
            return false;
        }

       
            //edit
            let formData: any = data.find((d: any) => d.id === value.id);
            formData.visatypes = value.visatypes;
            return true;
    
        // else {
        //     //add user
        //     let maxUserId = data.length ? data.reduce((max: any, character: any) => (character.id > max ? character.id : max), data[0].id) : 0;

        //     let formData = {
        //         id: +maxUserId + 1,
        //         country: value.country,
        //         language: value.language,
        //         dailingcode: value.dailingcode,
        //         capital: value.capital,
        //         cities: value.cities,
        //         countrydetails: value.countrydetails,
        //         climate: value.climate,
        //         currency: value.currency,
        //         timezone: value.timezone,
        //         additionalinfo: value.additionalinfo,
        //         website: value.website,
        //         ispopular: value.ispopular,
        //         isoutsource: value.isoutsource,
        //         isjurisdiction: value.isjurisdiction,
        //         image: value.image,
        //         flag: value.flag,
        //     };
        //     setData([...data, formData]);
        //     return formData;

        //     //   searchContacts();
        // }

        // showMessage('User has been saved successfully.');
        // setAddContactModal(false);
        // setIsEdit(false);
    };
    return (
        <>
            <TableLayout
                title="Country Visa Types"
                setData={setData}
                data={data}
                filterby="country"
                totalPages={data?.length || 0}
                handleDelete={handleDelete}
                tableColumns={tableColumns}
                exportColumns={exportColumns}
                ActionModal={CountryVisaTypeActionModal}
                Filtersetting={Filter}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default CountryVisaTypes;
