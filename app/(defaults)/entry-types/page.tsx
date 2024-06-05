import CmsTablesCountriesList from '@/components/CMS/cms-tables-countries-list';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const Sales = () => {
    return (
        <div>
            <CmsTablesCountriesList title="Entry Types " />
        </div>
    );
};

export default Sales;
