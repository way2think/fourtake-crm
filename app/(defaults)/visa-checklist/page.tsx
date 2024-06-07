import VisaChecklist from '@/components/CMS/visa-checklist/VisaChecklist';
import ComponentsDashboardAnalytics from '@/components/dashboard/components-dashboard';
import UserList from '@/components/user-management/UserList';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const Sales = () => {
    return <VisaChecklist />;
};

export default Sales;