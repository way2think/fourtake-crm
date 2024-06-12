import ListVisaApplication from '@/components/visa-process/visa-application-list/ListVisaApplication';
import React from 'react';

const VisaApplicationList = () => {
    let data = [
        {
            id: 1,
            country: 'India',
            language: 'tamil,hindi,etc',
            dailingcode: '+91',
        },
        {
            id: 2,
            country: 'America',
        },
    ];
    return <ListVisaApplication listapplication={data} />;
};

export default VisaApplicationList;
