import { Metadata } from 'next';
import LeadManagement from '@/components/lead-management/lead-manage/LeadManagement';

export const metadata: Metadata = {
    title: 'Lead List',
};
// const getServerData = async () => {
//     return await getData({ endpoint: 'http://localhost:5001/center' });
// };
const LeadList = () => {
 
    return (
        // <Suspense fallback={<p>Loading...</p>}>
        <LeadManagement />
        // </Suspense>
    );
};

export default LeadList;
