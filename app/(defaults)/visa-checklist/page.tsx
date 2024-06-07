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
            visaChecklist: 'Business',
        },
        {
            id: 2,
            visaChecklist: 'Tourist',
        },
    ];
    return <VisaChecklist data={data} />;
};

export default Sales;
