import React from 'react';
import { Metadata } from 'next';
import StatusWise from '@/components/Reports/status-wise-report/StatusWise';
import Payment_Report from '@/components/Reports/payment-report/Payment_Report';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const PaymentReport = () => {
    const data = [
        {
            id: 1,
            date: '20/09/2023',
            noofapplicant: '2',
            paymenteft: 'Gpay',
            paymentbycard: 'Visa',
            paymentbycash: '20000/-',
            total: '90000/-',
        },
    ];
    return <Payment_Report paymentreportdata={data} />;
};

export default PaymentReport;
