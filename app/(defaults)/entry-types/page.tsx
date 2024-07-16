import EntryTypes from '@/components/cms/entry-types/EntryTypes';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const Sales = () => {
    const data = [
        {
            id: 1,
            entrytype: 'single ',
        },
        {
            id: 2,
            entrytype: 'Double',
        },
    ];
    return <EntryTypes entrytypedata={data} />;
};

export default Sales;
