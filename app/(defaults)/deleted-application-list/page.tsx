import DeletedApplication from '@/components/visa-process/deleted-application/DeletedApplication';
import React from 'react';

const DeletedApplicationList = () => {
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
    return <DeletedApplication listapplication={data} />;
};

export default DeletedApplicationList;
