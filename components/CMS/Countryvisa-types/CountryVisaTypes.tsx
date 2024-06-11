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

    const handleDelete = () => {};

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        { accessor: 'name', textAlign: 'left', title: 'Country Name' },
        { accessor: 'countryvisa', textAlign: 'left', title: 'Visa Type' },
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

    const exportColumns = ['id', 'countryvisa'];
    const handleSumbit = (value: any) => {
        
    };
    return (
        <>
            <TableLayout
                title="Country Visa Types"
                setData={setData}
                data={data}
                filterby="countryvisa"
                totalPages={data?.length || 0}
                handleDelete={handleDelete}
                tableColumns={tableColumns}
                exportColumns={exportColumns}
                ActionModal={CountryVisaTypeActionModal}
                handleSumbit={handleSumbit}
            />
        </>
    );
};

export default CountryVisaTypes;
