import ComponentsDatatablesAltPagination from '../../../components/CMS/components-datatables-alt-pagination';
import IconBell from '@/components/icon/icon-bell';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'checklist | Countries list',
};
ComponentsDatatablesAltPagination;
const CountriesList = () => {
    return (
        <div>
            <ComponentsDatatablesAltPagination />
            {/* <ComponentsTablesProgress/> */}
        </div>
    );
};

export default CountriesList;
