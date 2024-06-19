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
            center:"Chennai",
            applydate:'2024-06-19',
            consultantname: 'raji',
            noofapplicant: '2',
            visafee: '40000/-',
            vfsothers: 'vfs',
            charges: '20000/-',
            ddfee: '3000/-',
            deliverycharges: '350/-',
            tokencharges: '250/-',
            misccharges: '150/-',
            total: '90000/-',
        },
        {
            id: 2,
            center:"Mumbai",
            applydate:'2024-06-19',
            consultantname: 'sanjay',
            noofapplicant: '2',
            visafee: '40000/-',
            vfsothers: 'vfs',
            charges: '20000/-',
            ddfee: '3000/-',
            deliverycharges: '350/-',
            tokencharges: '250/-',
            misccharges: '150/-',
            total: '90000/-',
        },
    ];
    return <StatusWise statuswisedata={data} />;
};

export default StatusWiseReport;
