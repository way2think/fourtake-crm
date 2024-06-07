import CmsTablesCountriesList from '@/components/CMS/cms-tables-countries-list';
import VisaTypes from '@/components/CMS/visa-types/VisaTypes';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const Sales = () => {
    return <VisaTypes />;
};

export default Sales;
