import { Metadata } from 'next';
import Country from '@/components/CMS/countries/Country';
import { Suspense, use } from 'react';
import { getData } from '@/api';
import { http } from '@/utils/http';

export const metadata: Metadata = {
    title: 'CMS - Countries',
};
// const getServerData = async () => {
//     return await getData({ endpoint: 'cms/country' });
// };
const CountriesList = async () => {
    // const data = use(getServerData());
    // const data = getServerData();
    // const { data, isError, error } = await getData({ endpoint: 'http://localhost:5001/center' });
    // console.log('userList: ', data);
    // if (isError) {
    //     console.log(error.message);
    // }

    // const {} = await http({ method: 'GET', endpoint: '/cms/country', options: {} });

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

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Country countrydata={data} />
        </Suspense>
    );
};

export default CountriesList;
