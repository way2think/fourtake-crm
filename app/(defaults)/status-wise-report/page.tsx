import React from 'react';
import { Metadata } from 'next';
import StatusWise from '@/components/Reports/status-wise-report/StatusWise';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const StatusWiseReport = () => {
    const data = [
        {
            id: 1,
            currentstatus: 'pending',
            count: '2',
        },
    ];
    return <StatusWise statuswisedata={data} />;
};

export default StatusWiseReport;
