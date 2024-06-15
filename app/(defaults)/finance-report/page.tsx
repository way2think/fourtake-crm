import React from 'react';
import { Metadata } from 'next';
import Country from '@/components/CMS/countries/Country';
import DailyReport from '@/components/Reports/daily-report/DailyReport';
import Finance_Report from '@/components/Reports/finance-report/Finance_Report';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const FinanceReport = () => {
    const data = [
        {
            id: 1,
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
    ];
    return <Finance_Report financereportdata={data} />;
};

export default FinanceReport;
