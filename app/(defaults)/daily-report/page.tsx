import React from 'react';
import { Metadata } from 'next';
import Country from '@/components/CMS/countries/Country';
import DailyReport from '@/components/Reports/daily-report/DailyReport';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const Report = () => {
    const data = [
        {
            id: 1,
            center: 'Chennai',
            applydate: '2024-06-19',
            referenceno: '01',
            servicetype: 'visa type',
            applicantname: 'jagadish',
            consultantname: 'raji',
            destination: 'korea',
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
            center: 'Bangaluru',
            applydate: '2024-08-12',
            referenceno: '01',
            servicetype: 'visa type',
            applicantname: 'jagadish',
            consultantname: 'raji',
            destination: 'korea',
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
            id: 3,
            center: 'Mumbai',
            applydate: '2024-07-20',
            referenceno: '01',
            servicetype: 'visa type',
            applicantname: 'jagadish',
            consultantname: 'raji',
            destination: 'korea',
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
            id: 4,
            center: 'Hyderabad',
            applydate: '2024-07-07',
            referenceno: '01',
            servicetype: 'visa type',
            applicantname: 'jagadish',
            consultantname: 'sanjay',
            destination: 'korea',
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
    return <DailyReport dailyreportdata={data} />;
};

export default Report;
