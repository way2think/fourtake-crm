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
            country:"france",
            visatype: 'Business',
            embassy:'delhi'
        },
        {
            id: 2,
            country:"london",
            visatype: 'tourist',
            embassy:'chennai'
        },
    ];
    return <VisaChecklist visachecklistdata={data} />;
};

export default Sales;
