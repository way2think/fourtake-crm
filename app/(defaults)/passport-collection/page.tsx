
import React from 'react';
import { auth } from '@/auth';
import DashboardSubmission from '@/components/submission/dashboard-submission';




const PassportCollection = async () => {
    const session = await auth();

    console.log('session: ', session);

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'Ref no' },
        { accessor: 'apply_date', textAlign: 'left', title: 'Apply Date' },
        { accessor: 'applicantname', textAlign: 'left', title: 'Applicant Name' },
        { accessor: 'passport_number', textAlign: 'left', title: 'Passport Number' },
        { accessor: 'visa_status', textAlign: 'left', title: 'Status' },
        { accessor: 'submission_date', textAlign: 'left', title: 'Submission Date' },
        { accessor: 'collection_date', textAlign: 'left', title: 'Collection Date' },
        { accessor: 'travel_date', textAlign: 'left', title: 'Travel Date' },
        { accessor: 'destination_country', textAlign: 'left', title: 'Destination Country' },
        { accessor: 'visa_type', textAlign: 'left', title: 'Visa Type' },
        { accessor: 'collection_date_time', textAlign: 'left', title: 'Collection Date & Time' },
    ];

    let data = [
        {
            id: 1,
            applicantname: 'Jagadish',
            destination: 'korea',
            // visatype: 'business visa',
        },
    ];

   
    return (
        <div>
            <DashboardSubmission data={data}  tableColumns={tableColumns}  />
        </div>
    );
};

export default PassportCollection;
