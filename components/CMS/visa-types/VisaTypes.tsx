import { getData } from '@/api';
import ComponentsFormsFileUploadMulti from '@/components/Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '@/components/Reusable/file-upload/components-forms-file-upload-single';
import TableLayout from '@/components/layouts/table-layout';
import { use } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import IconX from '@/components/icon/icon-x';
import VisaTypesActionModal from './VisaTypesActionModal';

const getServerData = async () => {
    return await getData({ url: 'http://localhost:5001/center' });
};
const VisaTypes = () => {
    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ url: 'http://localhost:5001/center' });
    // // console.log('dataaaa: ', data);
    // if (isError) {
    //     console.log(error.message);
    // }

    const data = [
        {
            id: 1,
            visatype: 'Business',
        },
        {
            id: 2,
            visatype: 'Tourist',
        },
    ];

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'S.NO' },
        { accessor: 'visatype', textAlign: 'left', title: 'Visa Type' },
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
    // const handleSave = () => {
    //     console.log('HandleSave');
    // };

    const exportColumns = ['SNo', 'Visa Types'];
    return (
        <>
            <TableLayout
                title="Visa Types"
                data={data || []}
                totalPages={data?.length || 0}
                tableColumns={tableColumns}
                actionModal={VisaTypesActionModal}
                exportColumns={exportColumns}
                // handleSave ={handleSave}
            />
        </>
    );
};

export default VisaTypes;
