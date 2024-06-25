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
            applydate: '2024-06-21',
        },
        {
            id: 2,
            currentstatus: 'pending',
            count: '2',
            applydate: '2024-06-21',
        },
    ];
    return <StatusWise statuswisedata={data} />;
};

export default StatusWiseReport;
