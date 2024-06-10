import { Metadata } from 'next';
import { Suspense } from 'react';
import CountryVisaTypeActionModal from '@/components/CMS/Countryvisa-types/CountryVisaTypesActionModal';
import CountryVisaTypes from '@/components/CMS/Countryvisa-types/CountryVisaTypes';

export const metadata: Metadata = {
    title: 'checklist | Country Visa Types',
};

const CountryVisaType = () => {
    const data = [
        {
            id: 1,
            countryvisa: 'India',
        },
        {
            id: 2,
            countryvisa: 'America',
        },
    ];
    // return <Countries />;
    return (
        // <Suspense fallback={<p>Loading...</p>}>
        <CountryVisaTypes data={data} />
        // </Suspense>
    );
};

export default CountryVisaType;
