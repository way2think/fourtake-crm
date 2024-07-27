import { Metadata } from 'next';
import CountryVisaTypes from '@/components/cms/Countryvisa-types/CountryVisaTypes';

export const metadata: Metadata = {
    title: 'Fourtake - CRM | Country Visa Types',
};

const CountryVisaType = () => {
    return (
        // <Suspense fallback={<p>Loading...</p>}>
        <CountryVisaTypes />
        // </Suspense>
    );
};

export default CountryVisaType;
