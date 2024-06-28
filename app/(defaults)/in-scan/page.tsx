import React from 'react';
import { Metadata } from 'next';
import Country from '@/components/CMS/countries/Country';
import DailyReport from '@/components/Reports/daily-report/DailyReport';
import Finance_Report from '@/components/Reports/finance-report/Finance_Report';
import OutScan from '@/components/Reports/out-scan-list/OutScan';
import InScan from '@/components/Reports/in-scan/InScan';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const InScanList = () => {
    const data = [
        {
            id: 1,
            consultantname: 'raji',
            applydate: '2024-06-22',
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
    return <InScan inscanlistdata={data} />;
};

export default InScanList;
