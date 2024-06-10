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
            countryvisa: 'Business Visa',
            name: 'Australia',
        },
        {
            id: 2,
            countryvisa: 'Vistor Visa',
            name: 'Australia',
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
