import { Metadata } from 'next';
import Country from '@/components/CMS/countries/Country';
import { Suspense } from 'react';
import { getData } from '@/api';
import ManageVisa from '@/components/visa-process/manage-visa/ManageVisa';

export const metadata: Metadata = {
    title: 'Manage Visa | Countries list',
};

const ManageVisaPage = () => {
    const data = [
        {
            id: 1,
            country: 'India',
            isgroup: true,
            visatype: 'Vistor Visa',
            nationality: 'India',
            stateofresidence: 'Kernataka',
            visaduration: "15 Days",
            entrytype: 'Single',
            customertype:'Walkin',
            traveldate :"13/06/2024",
        },
    ];
    return <ManageVisa managevisa={data} />;
    // return <p>Manage Visa</p>;
};

export default ManageVisaPage;
