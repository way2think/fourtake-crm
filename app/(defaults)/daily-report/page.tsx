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
            applydate: '20/09/2024',
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
    ];
    return <DailyReport visatypedata={data} />;
};

export default Report;
