import IconBell from '@/components/icon/icon-bell';
import { Metadata } from 'next';
import React from 'react';
import CmsTablesCountriesList from '../../../components/CMS/cms-tables-countries-list';

export const metadata: Metadata = {
    title: 'checklist | Countries list',
};

const CountriesList = () => {
    return (
        <div>
            <CmsTablesCountriesList title="Countries " />
            {/* <ComponentsTablesProgress/> */}
        </div>
    );
};

export default CountriesList;
