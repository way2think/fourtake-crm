import { Metadata } from 'next';
import Country from '@/components/cms/countries/Country';
import { Suspense } from 'react';
import { getData } from '@/api';
import DashboardCheck from '@/components/check/DashboardCheck';

export const metadata: Metadata = {
    title: 'checklist | Countries list',
};
const getServerData = async () => {
    return await getData({ endpoint: 'http://localhost:5001/center' });
};
const CheckRequirment = () => {
    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ endpoint: 'http://localhost:5001/center' });
    // // console.log('dataaaa: ', data);
    // if (isError) {
    //     console.log(error.message);
    // }

    return <DashboardCheck />;
};

export default CheckRequirment;
