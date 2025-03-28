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
import { useRouter } from 'next/navigation';
import PaginationTable from '../../components/Reusable/Table/PaginationTable';

interface DashboardProps {
    data: any;
    tableColumns: any;
}
interface AddData {
    [key: string]: string;
}

const DashboardSubmission: React.FC<DashboardProps> = ({ data, tableColumns }) => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [addData, setAddData] = useState<AddData>({});

    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);

    const [filterItem, setFilterItem] = useState(data);
    const router = useRouter();

    const handleEdit = (object: any) => {
        setIsEdit(true);
        setIsOpen(true);
        setAddData(object);
    };

    const handleManageVisaEdit = (object: any) => {
        router.push('/manage-visa');
    };
    const handleInputChange = (e: any) => {
        const { value, id } = e.target;

        setAddData({ ...addData, [id]: value });
    };
    const handleSave = () => {
        // if (handleSubmit(addData)) {
        //     setIsOpen(false);
        //     setAddData({});
        // }
    };

    return (
        <>
            <div>
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-1">
                    <PaginationTable data={filterItem} tableColumns={tableColumns} title={'dashboard'} handleEdit={handleManageVisaEdit} />
                </div>
            </div>
        </>
    );
};

export default DashboardSubmission;
