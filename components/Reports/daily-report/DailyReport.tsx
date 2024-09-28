'use client';
import { getData } from '@/api';
import ComponentsFormsFileUploadMulti from '@/components/Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '@/components/Reusable/file-upload/components-forms-file-upload-single';
import { use } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import IconX from '@/components/icon/icon-x';

import { showMessage } from '@/utils/notification';
import Swal from 'sweetalert2';
import ReportTableLayout from '@/components/layouts/report-table-layout';
import Link from 'next/link';
import { useGetDailyReportQuery } from '@/services/api/reportSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user.store';

const DailyReport: React.FC<{ dailyreportdata: any }> = ({ dailyreportdata }) => {
    const [formData, setFormData] = useState({
        input1: '',
        input2: '',
        input3: '',
    });
    const user: any = useSelector(selectUser);

    const [data, setData] = useState(dailyreportdata);

    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ endpoint: 'http://localhost:5001/center' });
    // // console.log('dataaaa: ', data);
    // if (isError) {
    //     console.log(error.message);
    // }

    // const data = [
    //     {
    //         id: 1,
    //         visatype: 'Business',
    //     },
    //     {
    //         id: 2,
    //         visatype: 'Tourist',
    //     },
    // ];

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'Refno' },
        { accessor: 'apply_date', textAlign: 'left', title: 'Apply Date' },
        // { accessor: 'servicetype', textAlign: 'left', title: 'Service Type' },
        {
            accessor: 'name',
            textAlign: 'left',
            title: 'Applicant Name',
            render: (row: any) => {
                return `${row.first_name} ${row.last_name}`;
            },
        },
        {
            accessor: 'consultantname',
            textAlign: 'left',
            title: 'Consultant Name',
            render: (row: any) => {
                return row.assigned_to.username;
            },
        },
        {
            accessor: 'destination',
            textAlign: 'left',
            title: 'Destination ',
            render: (row: any) => {
                return row.destination_country.name;
            },
        },
        { accessor: 'visafee', textAlign: 'left', title: 'Visa Fee' },
        { accessor: 'vfsothers', textAlign: 'left', title: 'VFs/Others' },
        { accessor: 'charges', textAlign: 'left', title: 'H/C - handling charges' },
        { accessor: 'ddfee', textAlign: 'left', title: 'DD Fee' },
        { accessor: 'deliverycharges', textAlign: 'left', title: 'Delivery charges' },
        { accessor: 'tokencharges', textAlign: 'left', title: 'Token Charges' },
        { accessor: 'misccharges', textAlign: 'left', title: 'Misc charges' },
        { accessor: 'total', textAlign: 'left', title: 'Total' },
    ];

    const handleSubmit = (value: any) => {
        if (value.visatype == '' || value.visatype == null) {
            showMessage('Enter Visa Type', 'error');
            return false;
        }

        if (value.id) {
            //update user
            let formData: any = data.find((d: any) => d.id === value.id);
            formData.visatype = value.visatype;

            return formData;
        } else {
            //add user
            let maxUserId = data.length ? data.reduce((max: any, character: any) => (character.id > max ? character.id : max), data[0].id) : 0;

            let formData = {
                id: +maxUserId + 1,
                visatype: value.visatype,
            };
            setData([...data, formData]);
            return formData;
        }
    };
    const handleDelete = async (row: any) => {
        await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: { popup: 'sweet-alerts' },
        }).then(async (result) => {
            if (result.value) {
                setData(data.filter((item: any) => item.id !== row.id));
                await Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', icon: 'success', customClass: { popup: 'sweet-alerts' } });
                return true;
            }
        });
    };
    const exportColumns = [
        'id',
        'applydate',
        'referenceno',
        'servicetype',
        'applicantname',
        'consultantname',
        'destination',
        'visafee',
        'vfsothers',
        'charges',
        'ddfee',
        'deliverycharges',
        'tokencharges',
    ];

    const fieldgenerated = {
        pagename: 'Daily Report',
        fields: [
            {
                sectionname: 'Filter Daily Report',
                field: [
                    {
                        fieldname: ['input', '', ''],
                    },
                ],
            },
            {
                sectionname: 'Filter Daily Report',
                field: [
                    {
                        fieldname: ['input', '', ''],
                    },
                ],
            },
            {
                sectionname: 'Filter Daily Report',
                field: [
                    {
                        fieldname: ['input', '', ''],
                    },
                ],
            },
        ],
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <ul className="mb-3 flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Reports
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Daily Report</span>
                </li>
            </ul>

            <ReportTableLayout
                title="Daily Report"
                //setData={setData} ?

                //filterby="visatype" ?

                //Total Reacord
                data={data}
                totalPages={data?.length || 0}
                tableColumns={tableColumns}
                //New Record Insert
                //ActionModal={VisaTypesActionModal}

                //?
                exportColumns={exportColumns}
                //Edit and Delete Action
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
                formData={formData}
                handleChange={handleChange}
            />
        </>
    );
};

export default DailyReport;
