
import VisaChecklist from '@/components/CMS/visa-checklist/VisaChecklist';
import ComponentsDashboardAnalytics from '@/components/dashboard/components-dashboard';
import UserList from '@/components/user-management/UserList';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const Sales = () => {
    const data = [
        {
            id: 1,
            country: 'france',
            type: 'Business',
            embassy: 'volvo, saab',
            checklist: ' <p>test1</p>',
            fee: ' <p>test fee1</p>',
            form: '',
        },
        {
            id: 2,
            country: 'london',
            type: 'tourist',
            embassy: 'opel',
            checklist: ' <p>test2</p>',
            fee: ' <p>test fee2</p>',
            form: '',
        },
    ];
    return <VisaChecklist visachecklistdata={data} />;
};

export default Sales;
