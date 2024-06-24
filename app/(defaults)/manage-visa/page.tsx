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
            apptype: 'Google',
            firstname: 'sam',
            lastname: 'james',
            email: 'alan@gmail.com',
            gender: 'Male',
            status: "Received",
            phone: '9874563215',
            passportno:'7895dfsf58df',
            dob:"13/06/2024",
        },
    ];
    return <ManageVisa managevisa={data} />;
    // return <p>Manage Visa</p>;
};

export default ManageVisaPage;
