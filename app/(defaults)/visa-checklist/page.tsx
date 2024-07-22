import VisaChecklist from '@/components/cms/visa-checklist/VisaChecklist';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Fourtake CRM - Visa Checklist',
};

const VisaChecklists = () => {
    return <VisaChecklist />;
};

export default VisaChecklists;
