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
            embassy: 'Embassy',
            country: 'india',
            name: 'jagadish',
            city: 'vellore',
            state: 'Tamil nadu',
        },
        {
            id: 2,
            embassy: 'vfs',
            country: 'india',
            name: 'Raji',
            city: 'Chennai',
            state: ' Andhra Pradesh',
        },
        {
            id: 3,
            embassy: 'Embassy',
            country: 'india',
            name: 'Santhosh',
            city: 'madhuri',
            state: 'Karnataka',
        },
    ];
    return <DailyReport visatypedata={data} />;
};

export default Report;
