import EntryTypes from '@/components/CMS/entry-types/EntryTypes';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const Sales = () => {
    const data = [
        {
            id: 1,
            entrytype: 'Business',
        },
        {
            id: 2,
            entrytype: 'Tourist',
        },
    ];
    return <EntryTypes data={data} />;
};

export default Sales;
