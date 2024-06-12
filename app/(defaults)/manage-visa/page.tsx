import { Metadata } from 'next';
import Country from '@/components/CMS/countries/Country';
import { Suspense } from 'react';
import { getData } from '@/api';

export const metadata: Metadata = {
    title: 'Manage Visa | Countries list',
};

const ManageVisa = () => {
    return <p>Manage Visa</p>;
};

export default ManageVisa;
