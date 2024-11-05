import React from 'react';
import { auth } from '@/auth';
import DashboardSubmission from '@/components/submission/dashboard-submission';

const PassportDropOff = async () => {
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

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'Ref no' },
        { accessor: 'apply_date', textAlign: 'left', title: 'Apply Date' },
        { accessor: 'applicant_name', textAlign: 'left', title: 'Applicant Name' },
        { accessor: 'travel_date', textAlign: 'left', title: 'Travel Date' },
        { accessor: 'passport_number', textAlign: 'left', title: 'Passport Number' },
        { accessor: 'visa_status', textAlign: 'left', title: 'Status' },
        { accessor: 'destination_country', textAlign: 'left', title: 'Destination Country' },
        { accessor: 'visa_type', textAlign: 'left', title: 'Visa Type' },
        
    ];

    return (
        <div>
            <DashboardSubmission data={data}  tableColumns={tableColumns}   />
        </div>
    );
};

export default PassportDropOff;
