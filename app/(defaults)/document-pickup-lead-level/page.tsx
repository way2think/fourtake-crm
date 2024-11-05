import React from 'react';
import { auth } from '@/auth';
import DashboardSubmission from '@/components/submission/dashboard-submission';

const DocumentPickupLeadLevel = async () => {
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
        { accessor: 'created_date', textAlign: 'left', title: 'Created Date' },
        { accessor: 'applicant_name', textAlign: 'left', title: 'Applicant Name' },
        { accessor: 'travel_date', textAlign: 'left', title: 'Travel Date' },
        { accessor: 'destination_country', textAlign: 'left', title: 'Destination Country' },
        { accessor: 'visa_type', textAlign: 'left', title: 'Visa Type' },
        { accessor: 'doc_pickup_date_time', textAlign: 'left', title: 'Document Pickup Date & Time' },
        { accessor: 'doc_pickup_remark', textAlign: 'left', title: 'Document Pickup Remark' },
    ];

    return (
        <div>
            <DashboardSubmission data={data} tableColumns={tableColumns} />
        </div>
    );
};

export default DocumentPickupLeadLevel;
