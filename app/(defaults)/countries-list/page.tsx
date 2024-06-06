import { Metadata } from 'next';

import Countries from '@/components/CMS/countries/Countries';
import Country from '@/components/CMS/countries/Country';

export const metadata: Metadata = {
    title: 'checklist | Countries list',
};

const CountriesList = () => {
    // return <Countries />;
    return <Country />;
};

export default CountriesList;
