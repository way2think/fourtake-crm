
import React from 'react';
import { auth } from '@/auth';
import DashboardSubmission from '@/components/submission/dashboard-submission';




const submission = async () => {
    const session = await auth();

    console.log('session: ', session);

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
            <DashboardSubmission data={data} leaddata={leaddata} passportsdata={passportsdata} applicationdata={applicationdata} dropdata={dropdata} />
        </div>
    );
};

export default submission;
