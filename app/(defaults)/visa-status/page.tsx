import { Metadata } from 'next';
import Country from '@/components/CMS/countries/Country';
import { Suspense } from 'react';
import { getData } from '@/api';

export const metadata: Metadata = {
    title: 'checklist | Countries list',
};
const getServerData = async () => {
    return await getData({ url: 'http://localhost:5001/center' });
};
const VisaStatus = () => {
    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ url: 'http://localhost:5001/center' });
    // // console.log('dataaaa: ', data);
    // if (isError) {
    //     console.log(error.message);
    // }
    let data = [
        {
            id: 1,
            visastatus: 'Application Recived',
            statustype: 'operation',
        },
        {
            id: 2,
            visastatus: 'Submitted',
            statustype: 'operation',
        },
    ];
    // return <Countries />;
    return (
        // <Suspense fallback={<p>Loading...</p>}>
        <VisaStatus visastatusdata={data} />
        // </Suspense>
    );
};

export default VisaStatus;
