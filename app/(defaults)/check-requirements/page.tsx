import { Metadata } from 'next';
import DashboardCheck from '@/components/check/DashboardCheck';

export const metadata: Metadata = {
    title: 'checklist | Countries list',
};
const CheckRequirment = () => {
    return <DashboardCheck />;
};

export default CheckRequirment;
