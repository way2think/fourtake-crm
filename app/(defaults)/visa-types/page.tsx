import React from 'react';
import { Metadata } from 'next';
import VisaTypes from '@/components/cms/visa-types/VisaTypes';
import { getData } from '@/api';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const getServerData = async () => {
    return await getData({ endpoint: 'http://localhost:5001/center' });
};

const Sales = () => {
    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ endpoint: 'http://localhost:5001/center' });
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

    return <VisaTypes visatypedata={data} />;
};

export default Sales;
