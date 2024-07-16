import { Metadata } from 'next';
import { Suspense } from 'react';
import CountryVisaTypeActionModal from '@/components/cms/Countryvisa-types/CountryVisaTypesActionModal';
import CountryVisaTypes from '@/components/cms/Countryvisa-types/CountryVisaTypes';

export const metadata: Metadata = {
    title: 'checklist | Country Visa Types',
};

const CountryVisaType = () => {
    const data = [
        {
            id: 1,
            country: 'France',
            visatypes: ['E-Visa', 'Business Visa'],
        },
        {
            id: 2,
            country: 'Australia',
            visatypes: ['E-Visa', 'Business Visa'],
        },
    ];
    // return <Countries />;
    return (
        // <Suspense fallback={<p>Loading...</p>}>
        <CountryVisaTypes countryvisadata={data} />
        // </Suspense>
    );
};

export default CountryVisaType;
