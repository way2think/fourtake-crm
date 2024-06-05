import IconBell from '@/components/icon/icon-bell';
import { Metadata } from 'next';
import React from 'react';
import CmsTablesCountriesList from '../../../components/CMS/cms-tables-countries-list';
import PaginationTable from '../../../components/CMS/PaginationTable';
import PaginationTest from '../../../components/CMS/PaginationTest';
import Countries from '@/components/CMS/Countries';

export const metadata: Metadata = {
    title: 'checklist | Countries list',
};

const CountriesList = () => {
    return (
        <div>
            {/* <CmsTablesCountriesList title="Countries " /> */}
            <Countries />
            {/* <PaginationTable /> */}
            {/* <PaginationTest /> */}

            {/* <ComponentsTablesProgress/> */}
        </div>
    );
};

export default CountriesList;
