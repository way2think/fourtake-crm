import { Metadata } from 'next';
import LeadManagement from '@/components/lead-management/lead-manage/LeadManagement';

export const metadata: Metadata = {
    title: 'Lead List',
};

const LeadList = () => <LeadManagement />;

export default LeadList;
