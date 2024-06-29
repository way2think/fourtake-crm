import { Metadata } from 'next';
import Country from '@/components/CMS/countries/Country';
import { Suspense } from 'react';
import { getData } from '@/api';
import VisaStatus from '@/components/CMS/visa_status/VisaStatus';
import CountryVisaURl from '@/components/CMS/Country_Visa_Urls/CountryVisaURl';

export const metadata: Metadata = {
    title: 'checklist | Countries list',
};
const getServerData = async () => {
    return await getData({ endpoint: 'http://localhost:5001/center' });
};
const CountryVisaUrls = () => {
    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ endpoint: 'http://localhost:5001/center' });
    // // console.log('dataaaa: ', data);
    // if (isError) {
    //     console.log(error.message);
    // }
    let data = [
        {
            id: 1,
            country: 'Austrila',
            urls: 'http://localhost:3000',
        },
        {
            id: 2,
            country: 'India',
            urls: 'http://localhost:3000',
        },
    ];
    // return <Countries />;
    return (
        // <Suspense fallback={<p>Loading...</p>}>
        <CountryVisaURl countryvisaurls={data} />
        // </Suspense>
    );
};

export default CountryVisaUrls;
