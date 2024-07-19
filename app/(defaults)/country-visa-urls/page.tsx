import { Metadata } from 'next';
import { getData } from '@/api';
import CountryVisaURl from '@/components/cms/country-visa-urls/CountryVisaURl';

export const metadata: Metadata = {
    title: 'Fourtake - CMS | CountrY Visa URL',
};
const getServerData = async () => {
    return await getData({ endpoint: 'http://localhost:5001/center' });
};
const CountryVisaUrls = () => {
    return (
        // <Suspense fallback={<p>Loading...</p>}>
        <CountryVisaURl />
        // </Suspense>
    );
};

export default CountryVisaUrls;
