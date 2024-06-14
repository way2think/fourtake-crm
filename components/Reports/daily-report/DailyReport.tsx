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

const DailyReport: React.FC<{ visatypedata: any }> = ({ visatypedata }) => {
    const [data, setData] = useState(visatypedata);
    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ url: 'http://localhost:5001/center' });
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
        { accessor: 'applydate', textAlign: 'left', title: 'Apply Date' },
        { accessor: 'referenceno', textAlign: 'left', title: 'Reference No' },
        { accessor: 'servicetype', textAlign: 'left', title: 'Service Type' },
        { accessor: 'applicantname', textAlign: 'left', title: 'Applicant Name' },
        { accessor: 'consultantname', textAlign: 'left', title: 'Consultant Name' },
        { accessor: 'destination', textAlign: 'left', title: 'Destination ' },
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
    const handleDelete = (row: any) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then((result) => {
            if (result.value) {
                setData(data.filter((item: any) => item.id !== row.id));
                Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
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

    return (
        <>
            <ReportTableLayout
                title="Daily Report"
                //setData={setData}
                //filterby="visatype"
                data={data}
                totalPages={data?.length || 0}
                tableColumns={tableColumns}
                handleDelete={handleDelete}
                //ActionModal={VisaTypesActionModal}
                exportColumns={exportColumns}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default DailyReport;
