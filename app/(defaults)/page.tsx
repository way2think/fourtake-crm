import { auth } from '@/auth';
import ComponentsDashboard from '@/components/dashboard/components-dashboard';
import Home from '@/components/home/home';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const Sales = async () => {
    const session = await auth();

    // console.log('session: ', session);

    let data = [
        {
            id: 1,
            applicantname: 'Jagadish',
            destination: 'korea',
            // visatype: 'business visa',
        },
    ];

    let passportsdata = [
        {
            id: 1,
            applicantname: 'Jagadish',
            destination: 'korea',
        },
    ];
    let applicationdata = [
        {
            id: 1,
            applicantname: 'Jagadish',
            destination: 'korea',
        },
    ];
    let leaddata = [
        {
            id: 1,
            name: 'Jagadish',
        },
    ];
    let dropdata = [
        {
            id: 1,
            applicantname: 'Jagadish',
            destination: 'korea',
        },
    ];

    return (
        <div>
            <Home data={data} leaddata={leaddata} passportsdata={passportsdata} applicationdata={applicationdata} dropdata={dropdata} />
        </div>
    );
};

export default Sales;
