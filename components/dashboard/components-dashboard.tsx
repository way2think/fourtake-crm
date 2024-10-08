'use client';

import { IRootState } from '@/store';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
// import Attendence from './Attendence';
import PaginationTable from '../Reusable/Table/PaginationTable';
import LeadManagementActionModal from '../lead-management/lead-manage/LeadManagementActionModal';
import { useRouter } from 'next/navigation';

interface DashboardProps {
    data: any;
    leaddata: any;
    passportsdata: any;
    applicationdata: any;
    dropdata: any;
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
interface AddData {
    [key: string]: string;
}

const ComponentsDashboard: React.FC<DashboardProps> = ({ data, leaddata, passportsdata, applicationdata, dropdata }) => {
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

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'Ref no' },
        { accessor: 'applicantname', textAlign: 'left', title: 'Applicant Name' },
        { accessor: 'destination', textAlign: 'left', title: 'Destination' },
        // { accessor: 'visatype', textAlign: 'left', title: 'Type' },
    ];
    const tableColumnspassports = [
        { accessor: 'id', textAlign: 'left', title: 'Ref no' },
        { accessor: 'applicantname', textAlign: 'left', title: 'Applicant Name' },
        { accessor: 'destination', textAlign: 'left', title: 'Destination' },
        // { accessor: 'visatype', textAlign: 'left', title: 'Type' },
    ];
    const tableColumnsapplication = [
        { accessor: 'id', textAlign: 'left', title: 'Ref no' },
        { accessor: 'applicantname', textAlign: 'left', title: 'Applicant Name' },
        { accessor: 'destination', textAlign: 'left', title: 'Destination' },
        // { accessor: 'visatype', textAlign: 'left', title: 'Type' },
    ];

    const tableColumnsLead = [
        { accessor: 'id', textAlign: 'left', title: 'Lead id' },
        { accessor: 'name', textAlign: 'left', title: 'Name' },
    ];

    const tableColumnsdrop = [
        { accessor: 'id', textAlign: 'left', title: 'Ref no' },
        { accessor: 'applicantname', textAlign: 'left', title: 'Applicant Name' },
        { accessor: 'destination', textAlign: 'left', title: 'Destination' },
        // { accessor: 'visatype', textAlign: 'left', title: 'Type' },
    ];

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
                {/* <Attendence /> */}
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                    <div className="mb-4 mt-4">
                        <div className="flex items-center justify-between">
                            <h2 className="mb-4 mt-4">Today Submissions</h2>
                            <p className="font-extrabold">1</p>
                        </div>
                        <PaginationTable data={filterItem} tableColumns={tableColumns} title={'dashboard'} handleEdit={handleManageVisaEdit} />
                    </div>
                    <div className="mb-4 mt-4">
                        <div className="flex items-center justify-between">
                            <h2 className="mb-4 mt-4">Today Passports Collections </h2>
                            <p className="font-extrabold">1</p>
                        </div>
                        <PaginationTable data={passportsdata} tableColumns={tableColumnspassports} title={'dashboard'} handleEdit={handleManageVisaEdit} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                    <div className="mb-4 mt-4">
                        <div className="flex items-center justify-between">
                            <h2 className="mb-4 mt-4">Today's Documents Pickup - lead level </h2>
                            <p className="font-extrabold">1</p>
                        </div>
                        <PaginationTable data={leaddata} tableColumns={tableColumnsLead} title={'dashboard'} handleEdit={handleEdit} />
                    </div>
                    <div className="mb-4 mt-4">
                        <div className="flex items-center justify-between">
                            <h2 className="mb-4 mt-4">Today’s Document Pickup - application level</h2>
                            <p className="font-extrabold">1</p>
                        </div>
                        <PaginationTable data={applicationdata} tableColumns={tableColumnsapplication} title={'dashboard'} handleEdit={handleManageVisaEdit} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                    <div className="mb-4 mt-4">
                        <div className="flex items-center justify-between">
                            <h2 className="mb-4 mt-4">Today's Passport Drop Off</h2>
                            <p className="font-extrabold">1</p>
                        </div>
                        <PaginationTable data={leaddata} tableColumns={tableColumnsLead} handleEdit={handleManageVisaEdit} title={'dashboard'} />
                    </div>
                </div>
            </div>

            <LeadManagementActionModal
                isOpen={isOpen}
                setAddData={setAddData}
                handleInputChange={handleInputChange}
                setIsOpen={setIsOpen}
                handleSave={handleSave}
                addData={addData}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
            />
        </>
    );
};

export default ComponentsDashboard;
