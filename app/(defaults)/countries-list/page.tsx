import IconBell from '@/components/icon/icon-bell';
import { Metadata } from 'next';
import React from 'react';

import Countries from '@/components/CMS/countries/Countries';

export const metadata: Metadata = {
    title: 'checklist | Countries list',
};

const CountriesList = () => {
    return (
        <div>
            <Countries />
        </div>
    );
};

export default CountriesList;
