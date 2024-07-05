import { getData } from '@/api';
import ComponentsDashboardAnalytics from '@/components/dashboard/components-dashboard';
import UserList from '@/components/user-management/UserList';
import UserManagement from '@/components/user-management/UserManagement';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};



const Sales = () => {
    const data = [
        {
            id: 1,
            apptype: 'Google',
            firstname: 'sam',
            lastname: 'james',
            email: 'alan@gmail.com',
            center: 'Chennai',
            status: true,
            phone: '9874563215',
            role: 'admin',
            password: 'way2think',
            confirmpassword: 'way2think',
            address: 'No.21 NY Street',
        },
        {
            id: 2,
            apptype: 'Previous Customer',
            firstname: 'alan',
            lastname: 'james',
            email: 'alan@gmail.com',
            center: 'Bengaluru',
            status: false,
            phone: '9874563215',
            password: 'way2think',
            role: 'employee',
            confirmpassword: 'way2think',
            address: 'No.21 NY Street',
        },
    ];

    return (
        <div>
            <UserManagement userdata={data} />
        </div>
    );
};

export default Sales;
