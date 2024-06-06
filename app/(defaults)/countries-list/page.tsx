import { Metadata } from 'next';

import Countries from '@/components/CMS/countries/Countries';
import Country from '@/components/CMS/countries/Country';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'checklist | Countries list',
};

const CountriesList = () => {
    // return <Countries />;
    return (
        // <Suspense fallback={<p>Loading...</p>}>
        <Country />
        // </Suspense>
    );
};

export default CountriesList;
