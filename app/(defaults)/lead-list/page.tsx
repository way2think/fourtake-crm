import { Metadata } from 'next';
import LeadManagement from '@/components/lead-management/lead-manage/LeadManagement';

export const metadata: Metadata = {
    title: 'Lead List',
};
// const getServerData = async () => {
//     return await getData({ endpoint: 'http://localhost:5001/center' });
// };
const LeadList = () => {
    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ endpoint: 'http://localhost:5001/center' });
    // // console.log('dataaaa: ', data);
    // if (isError) {
    //     console.log(error.message);
    // }
    // let data = [
    //     {
    //         id: 1,
    //         name: 'Jagadish',
    //         email: 'jagadish00198@gmail.com',
    //         phone: '8015330209',
    //         country: 'india',
    //         visatype: 'business visa',
    //         numberofapplicants: '2',
    //         stateofresidence: 'commerical',
    //         createdate: '29/09/2023',
    //         emailsentdate: '20/09/2023',
    //         followup: [
    //             { followup_id: 1, followupdate: '30/09/2023', interaction: 'Call', followuptime: '5:00PM', remark: 'for enquiry' },
    //             { followup_id: 2, followupdate: '21/09/2023', interaction: 'Call', followuptime: '8:00 PM', remark: 'for enquiry' },
    //         ],
    //         stage: 'Fresh',
    //         status: 'open',
    //         traveldate: '19/06/2024',
    //         docpickupdate: '21/06/2024',
    //         docpickupremarks: '',
    //         leadnote: ['First follow-up call', 'Sent email for document submission'],
    //         leadtype: 'warm',

    //         assignee: 'raji',
    //         source: 'Google',
    //     },
    //     {
    //         id: 2,
    //         name: 'Balu',
    //         email: 'jagadish00198@gmail.com',
    //         phone: '8015330209',
    //         country: 'india',
    //         visatype: 'business visa',
    //         stateofresidence: 'commerical',
    //         createdate: '14/09/2023',
    //         emailsentdate: '20/09/2023',
    //         stage: 'Attempted',
    //         status: 'open',
    //         traveldate: '30/6/2023',
    //         numberofapplicants: '2',
    //         docpickupdate: '15/6/2024',
    //         docpickupremarks: 'passport need to be collected',
    //         leadnote: ['second follow-up call', 'secord email for document submission'],
    //         followup: [
    //             { followup_id: 1, followupdate: '30/09/2023', interaction: 'Call', followuptime: '5:00PM', remark: 'for enquiry' },
    //             { followup_id: 2, followupdate: '30/09/2023', interaction: 'Call', followuptime: '10:00PM', remark: 'for enquiry' },
    //         ],
    //         leadtype: 'cold',
    //         assignee: 'buji',
    //         source: 'Website',
    //     },
    // ];
    // return <Countries />;
    return (
        // <Suspense fallback={<p>Loading...</p>}>
        <LeadManagement />
        // </Suspense>
    );
};

export default LeadList;
