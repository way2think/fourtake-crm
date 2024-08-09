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

const Payment_Report: React.FC<{ paymentreportdata: any }> = ({ paymentreportdata }) => {
    const [data, setData] = useState(paymentreportdata);
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
        { accessor: 'id', textAlign: 'left', title: 'S.NO' },
        { accessor: 'applydate', textAlign: 'left', title: 'Date' },
        { accessor: 'noofapplicant', textAlign: 'left', title: 'No of applicant' },
        { accessor: 'paymenteft ', textAlign: 'left', title: 'Payment by EFT ' },
        { accessor: 'paymentbycard ', textAlign: 'left', title: 'Payment by Card ' },
        { accessor: 'paymentbycash', textAlign: 'left', title: 'Payment by Cash' },
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
    const exportColumns = ['id', 'date', 'noofapplicant', 'paymenteft', 'paymentbycard', 'paymentbycash', 'total'];

    return (
        <>
            <ul className="mb-3 flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Reports
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Payment Report</span>
                </li>
            </ul>
            <ReportTableLayout
                title="Payment Report"
                //setData={setData}
                //filterby="visatype"
                data={data}
                totalPages={data?.length || 0}
                tableColumns={tableColumns}
                handleDelete={handleDelete}
                //ActionModal={VisaTypesActionModal}
                exportColumns={exportColumns}
                handleSubmit={handleSubmit}
                formData={{
                    input1: '',
                    input2: '',
                    input3: '',
                }}
                handleChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                    throw new Error('Function not implemented.');
                }}
            />
        </>
    );
};

export default Payment_Report;
