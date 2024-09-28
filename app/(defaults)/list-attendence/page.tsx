import React from 'react';
import { Metadata } from 'next';
import Country from '@/components/cms/countries/Country';
import DailyReport from '@/components/Reports/daily-report/DailyReport';
import Finance_Report from '@/components/Reports/finance-report/FinanceReport';
import OutScan from '@/components/Reports/out-scan-list/OutScan';
import InScan from '@/components/Reports/in-scan/InScan';
import TimeAttendence from '@/components/attendence/TimeAttendence';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const ListAttendence = () => {
    return <><TimeAttendence /></>;
};

export default ListAttendence;
