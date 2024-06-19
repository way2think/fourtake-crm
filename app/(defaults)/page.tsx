import ComponentsDashboard from '@/components/dashboard/components-dashboard';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const Sales = () => {
    let data = [
        {
            id: 1,
            country: 'India',
            language:"tamil,hindi,etc",
            dailingcode:"+91",
        },
        {
            id: 2,
            country: 'America',
        },
    ];
    return (
        <div>
            <ComponentsDashboard data={data}  />
        </div>
    );
};

export default Sales;
