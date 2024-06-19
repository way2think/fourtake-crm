'use client';
import Dropdown from '@/components/dropdown';
import IconCaretsDown from '@/components/icon/icon-carets-down';
import IconChatDots from '@/components/icon/icon-chat-dots';
import IconChecks from '@/components/icon/icon-checks';
import IconChrome from '@/components/icon/icon-chrome';
import IconClock from '@/components/icon/icon-clock';
import IconCreditCard from '@/components/icon/icon-credit-card';
import IconFile from '@/components/icon/icon-file';
import IconGlobe from '@/components/icon/icon-globe';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import IconLink from '@/components/icon/icon-link';
import IconMail from '@/components/icon/icon-mail';
import IconPlus from '@/components/icon/icon-plus';
import IconSafari from '@/components/icon/icon-safari';
import IconServer from '@/components/icon/icon-server';
import IconSquareCheck from '@/components/icon/icon-square-check';
import IconThumbUp from '@/components/icon/icon-thumb-up';
import IconTrendingUp from '@/components/icon/icon-trending-up';
import IconUsersGroup from '@/components/icon/icon-users-group';
import { IRootState } from '@/store';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Attendence from './Attendence';
import PaginationTable from '../Reusable/Table/PaginationTable';

interface DashboardProps {
    data: any;
    // totalPages: number;
    // tableColumns: object[];
    // ActionModal: any;
    // Filtersetting?: any;
    // handleSubmit?: any;
    // exportColumns?: string[];
    // handleDelete: any;
    // setData: any;
    // filterby: string;
}

const ComponentsDashboard: React.FC<DashboardProps> = ({ data }: any) => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const [filterItem, setFilterItem] = useState(data);

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        { accessor: 'country', textAlign: 'left', title: 'Country Name' },
    ];

    const tableColumnsLead = [
        { accessor: 'id', textAlign: 'left', title: 'Lead ID' },
        { accessor: 'country', textAlign: 'left', title: 'Country Name' },
    ];

    const exportColumns = ['id', 'country'];

    const handleEdit = () => {};

    return (
        <div>
            {/* <ul className="mb-5 flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Dashboard Home</span>
                </li>
            </ul> */}
            <Attendence />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <PaginationTable data={filterItem} tableColumns={tableColumns} title={"dashboard"} />
                <PaginationTable data={filterItem} tableColumns={tableColumns} title={"dashboard"} />
            </div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <PaginationTable data={filterItem} tableColumns={tableColumns} title={"dashboard"} />
                <PaginationTable data={filterItem} tableColumns={tableColumns} title={"dashboard"} />
            </div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <PaginationTable data={filterItem} tableColumns={tableColumnsLead} title={"dashboard"} />
               
            </div>
        </div>
    );
};

export default ComponentsDashboard;
