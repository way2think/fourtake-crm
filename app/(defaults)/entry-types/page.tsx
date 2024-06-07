import EntryTypes from '@/components/CMS/entry-types/EntryTypes';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const Sales = () => {
    return <EntryTypes />;
};

export default Sales;
