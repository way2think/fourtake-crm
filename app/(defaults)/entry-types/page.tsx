import EntryTypes from '@/components/cms/entry-types/EntryTypes';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Fourtake CRM - Entry type',
};

const EntryType = () => {

    return <EntryTypes />;
};

export default EntryType;
