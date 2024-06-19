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
            applicantname: 'Jagadish',
            destination: 'korea',
            // visatype: 'business visa',
        },
    ];
    let leaddata = [
        {
            id: 1,
            name: 'Jagadish',
        },
    ];

    return (
        <div>
            <ComponentsDashboard data={data} leaddata={leaddata} />
        </div>
    );
};

export default Sales;
