import { Metadata } from 'next';
import Country from '@/components/CMS/countries/Country';
import { Suspense } from 'react';
import { getData } from '@/api';

export const metadata: Metadata = {
    title: 'checklist | Countries list',
};
const getServerData = async () => {
    return await getData({ endpoint: 'http://localhost:5001/center' });
};
const CountriesList = () => {
    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ endpoint: 'http://localhost:5001/center' });
    // // console.log('dataaaa: ', data);
    // if (isError) {
    //     console.log(error.message);
    // }
    let data = [
        {
            id: 1,
            country: 'India',
            language: 'tamil,hindi,etc',
            dailingcode: '+91',
        },
        {
            id: 2,
            country: 'America',
        },
    ];
    // return <Countries />;
    return (
        // <Suspense fallback={<p>Loading...</p>}>
        <Country countrydata={data} />
        // </Suspense>
    );
};

export default CountriesList;
