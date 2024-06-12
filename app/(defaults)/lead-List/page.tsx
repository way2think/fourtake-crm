import { Metadata } from 'next';
import Country from '@/components/CMS/countries/Country';
import { Suspense } from 'react';
import { getData } from '@/api';
import LeadManagement from '@/components/lead-management/lead-manage/LeadManagement';

export const metadata: Metadata = {
    title: 'checklist | Countries list',
};
const getServerData = async () => {
    return await getData({ url: 'http://localhost:5001/center' });
};
const LeadList = () => {
    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ url: 'http://localhost:5001/center' });
    // // console.log('dataaaa: ', data);
    // if (isError) {
    //     console.log(error.message);
    // }
    let data = [
        {
            id: 1,
            leadname: 'Jagadish',
            email: 'jagadish00198@gmail.com',
            contact: '8015330209',
            country: 'india',
            visatype: 'business visa',
            stateofresidence: 'commerical',
            emailsentdate: '20/09/2023',
            lastfollowup: '20/09/2023',
            nextfollowup: '29/09/2023',
            status:"open"
        },
        {
            id: 2,
            leadname: 'Balu',
            email: 'jagadish00198@gmail.com',
            contact: '8015330209',
            country: 'india',
            visatype: 'business visa',
            stateofresidence: 'commerical',
            emailsentdate: '20/09/2023',
            lastfollowup: '20/09/2023',
            nextfollowup: '29/09/2023',
            status:"close"
        },
    ];
    // return <Countries />;
    return (
        // <Suspense fallback={<p>Loading...</p>}>
        <LeadManagement leadlistdata={data} />
        // </Suspense>
    );
};

export default LeadList;
