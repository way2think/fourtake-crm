import React from 'react';
import { Metadata } from 'next';
import Country from '@/components/cms/countries/Country';
import DailyReport from '@/components/Reports/daily-report/DailyReport';
import FinanceReport from '@/components/Reports/finance-report/FinanceReport';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const FinanceReportPage = () => {
    const data = [
        {
            id: 1,
            consultantname: 'jagan',
            center: 'Mumbai',
            noofapplicant: '2',
            applydate: '2024-06-19',
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
            consultantname: 'sanjay',
            center: 'Chennai',
            noofapplicant: '2',
            applydate: '2024-07-06',
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
    return <FinanceReport financereportdata={data} />;
};

export default FinanceReportPage;
