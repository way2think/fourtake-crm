import ComponentsDashboard from '@/components/dashboard/components-dashboard';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const Sales = () => {
    return (
        <div>
            <ComponentsDashboard />
        </div>
    );
};

export default Sales;
