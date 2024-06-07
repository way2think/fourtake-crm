import { Metadata } from 'next';
import Country from '@/components/CMS/countries/Country';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'checklist | Countries list',
};

const CountriesList = () => {
    const data = [
        {
            id: 1,
            country: 'India',
        },
        {
            id: 2,
            country: 'America',
        },
    ];
    // return <Countries />;
    return (
        // <Suspense fallback={<p>Loading...</p>}>
        <Country data={data} />
        // </Suspense>
    );
};

export default CountriesList;
