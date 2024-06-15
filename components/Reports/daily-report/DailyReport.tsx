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
//import ReportTableLayout from '@/components/layouts/report-table-layout';


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
        { accessor: 'visatype', textAlign: 'left', title: 'Visa Type' },
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
    const exportColumns = ['id', 'visatype'];

    const fieldgenerated = {
        pagename: "Daily Report",
        fields: [
          {sectionname:"Filter Daily Report", 
            field:[{
                fieldname: ["input", "X3", "X5"],
                
            }]


          },
          {sectionname:"BMW", models:["320", "X3", "X5"]},
          {sectionname:"Fiat", models:["500", "Panda"]}
        ]
      }

    return (
        <>
            {/* <ReportTableLayout
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
            /> */}



        </>
    );
};

export default DailyReport;