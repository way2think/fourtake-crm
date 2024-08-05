import React from 'react';
import { Metadata } from 'next';
import Country from '@/components/cms/countries/Country';
import DailyReport from '@/components/Reports/daily-report/DailyReport';
import Finance_Report from '@/components/Reports/finance-report/FinanceReport';
import OutScan from '@/components/Reports/out-scan-list/OutScan';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const OutScanList = () => {
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
    return <OutScan outscanlistdata={data} />;
};

export default OutScanList;
