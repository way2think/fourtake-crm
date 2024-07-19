'use client';

import React, { useState } from 'react';
import IconX from '@/components/icon/icon-x';
import Swal from 'sweetalert2';
import { showMessage } from '@/utils/notification';
import TableLayout from '@/components/layouts/table-layout';
import Filtersetting from '@/components/layouts/filtersetting';
import LeadManagementActionModal from './LeadManagementActionModal';
import Link from 'next/link';
import { useGetLeadsQuery } from '@/services/api/leadSlice';

const LeadManagement: React.FC = () => {
    const { data, isError, error, isFetching, isLoading } = useGetLeadsQuery(undefined);

    // console.log('leads: ', data, isLoading, isFetching);
    // console.log('eror: ', isError, error);

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        { accessor: 'name', textAlign: 'left', title: 'Lead Name' },
        { accessor: 'email', textAlign: 'left', title: 'Email' },
        { accessor: 'phone', textAlign: 'left', title: 'Phone no' },
        { accessor: 'country', textAlign: 'left', title: 'Country' },
        { accessor: 'visatype', textAlign: 'left', title: 'Visa Type' },
        // { accessor: 'stateofresidence', textAlign: 'left', title: 'State Of Residence' },
        { accessor: 'emailsentdate', textAlign: 'left', title: 'Email Sent Date' },
        // { accessor: 'lastfollowup', textAlign: 'left', title: 'Last Follow Up' },
        { accessor: 'nextfollowupdate', textAlign: 'left', title: 'Next Follow Up' },
        { accessor: 'status', textAlign: 'left', title: 'Status' },
        { accessor: 'stage', textAlign: 'left', title: 'Stage' },
    ];

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

    const exportColumns = ['id', 'leadname', 'email', 'contact', 'country', 'visatype', 'stateofresidence', 'emailsentdate', 'lastfollowup', 'nextfollowup', 'status'];

    const handleSubmit = (value: any) => {
        if (value.name == '' || value.name == null) {
            showMessage('Enter name', 'error');
            return false;
        }
        if (value.phone == '' || value.phone == null) {
            showMessage('Enter Phone', 'error');
            return false;
        }
        if (value.country == '' || value.country == null) {
            showMessage('Select Country ', 'error');
            return false;
        }
        if (value.stateofresidence == '' || value.stateofresidence == null) {
            showMessage('Select State', 'error');
            return false;
        }

        if (value.id) {
            //update user
            let formData: any = data.find((d: any) => d.id === value.id);

            formData.name = value.name || '';
            formData.email = value.email || '';
            formData.phone = value.phone || '';
            formData.country = value.country || '';
            formData.visatype = value.visatype || '';
            formData.stateofresidence = value.stateofresidence || '';
            formData.createdDate = value.createdDate || '';
            formData.emailsentdate = value.emailsentdate || '';
            formData.lastfollowup = value.lastfollowup || '';
            formData.nextfollowupdate = value.nextfollowupdate || '';
            formData.interaction = value.interaction || '';
            formData.followuptime = value.followuptime || '';
            formData.follupremark = value.follupremark || '';
            formData.stage = value.stage || '';
            formData.status = value.status || '';
            formData.traveldate = value.traveldate;
            formData.numberofapplicants = value.numberofapplicants || '';
            formData.docpickupdate = value.docpickupdate || '';
            formData.docpickupremarks = value.docpickupremarks || '';
            formData.leadnote = value.leadnote || '';
            formData.leadtype = value.leadtype || '';
            formData.assignee = value.assignee || '';
            formData.source = value.source || '';

            return formData;
        } else {
            //add user
            let maxUserId = data.length ? data.reduce((max: any, character: any) => (character.id > max ? character.id : max), data[0].id) : 0;

            let formData = {
                id: +maxUserId + 1,
                name: value.name || '',
                email: value.email || '',
                phone: value.phone || '',
                country: value.country || '',
                visatype: value.visatype || '',
                stateofresidence: value.stateofresidence || '',
                createdate: value.createdate || '',
                emailsentdate: value.emailsentdate || '',
                lastfollowup: value.lastfollowup || '',
                nextfollowupdate: value.nextfollowupdate || '',
                interaction: value.interaction || '',
                followuptime: value.followuptime || '',
                follupremark: value.follupremark || '',
                stage: value.stage || '',
                status: value.status || '',
                traveldate: value.traveldate || '',
                numberofapplicants: value.numberofapplicants || '',
                docpickupdate: value.docpickupdate || '',
                docpickupremarks: value.docpickupremarks || '',
                leadnote: value.leadnote || '',
                leadtype: value.leadtype || '',
                assignee: value.assignee || '',
                source: value.source || '',
            };

            setData([...data, formData]);
            return formData;

            //   searchContacts();
        }
    };

    return (
        <>
            <ul className="mb-3 flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Lead Management
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Lead List</span>
                </li>
            </ul>
            <TableLayout
                title="Lead List"
                filterby="country"
                handleDelete={handleDelete}
                data={data?.items || []}
                totalPages={data?.items?.length || 0}
                tableColumns={tableColumns}
                exportColumns={exportColumns}
                ActionModal={LeadManagementActionModal}
                Filtersetting={Filtersetting}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default LeadManagement;
