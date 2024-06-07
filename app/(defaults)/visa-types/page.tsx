import React from 'react';
import { Metadata } from 'next';
import VisaTypes from '@/components/CMS/visa-types/VisaTypes';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const Sales = () => {
    return <VisaTypes />;
};

export default Sales;
