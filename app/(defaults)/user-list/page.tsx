import UserManagement from '@/components/user-management/UserManagement';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const Sales = () => {
    return (
        <div>
            <UserManagement />
        </div>
    );
};

export default Sales;
