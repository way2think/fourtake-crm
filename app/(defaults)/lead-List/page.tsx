import { Metadata } from 'next';
import Country from '@/components/CMS/countries/Country';
import { Suspense } from 'react';
import { getData } from '@/api';
import LeadManagement from '@/components/lead-management/lead-manage/LeadManagement';

export const metadata: Metadata = {
    title: 'Lead List',
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
            name: 'Jagadish',
            email: 'jagadish00198@gmail.com',
            phone: '8015330209',
            country: 'india',
            visatype: 'business visa',
            numberofapplicants: '2',
            stateofresidence: 'commerical',
            createdate: '29/09/2023',
            emailsentdate: '20/09/2023',
            lastfollowup: '20/09/2023',
            nextfollowupdate: '30/09/2023',
            interaction: 'Call',
            followuptime: '5:05:13 PM',
            follupremark: 'for enquiry',
            stage: 'Fresh',
            status: 'open',
            traveldate: '19/06/2024',
            docpickupdate: '21/06/2024',
            docpickupremarks: '',
            leadnote: 'done',
            leadtype: 'warm',
            assignee: 'raji',
            source: 'Google',
        },
        {
            id: 2,
            name: 'Balu',
            email: 'jagadish00198@gmail.com',
            phone: '8015330209',
            country: 'india',
            visatype: 'business visa',
            stateofresidence: 'commerical',
            createdate: '14/09/2023',
            emailsentdate: '20/09/2023',
            lastfollowup: '20/09/2023',
            nextfollowupdate: '21/09/2023',
            interaction: 'Call',
            followuptime: '3:05:13 PM',
            follupremark: 'for enquiry',
            stage: 'Fresh',
            status: 'open',
            traveldate: '30/6/2023',
            numberofapplicants: '2',
            docpickupdate: '15/6/2024',
            docpickupremarks: 'passport need to be collected',
            leadnote: 'done',
            leadtype: 'warm',
            assignee: 'buji',
            source: 'Website',
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
