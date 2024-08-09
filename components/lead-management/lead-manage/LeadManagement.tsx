'use client';

import React from 'react';
import TableLayout from '@/components/layouts/table-layout';
import Filtersetting from '@/components/layouts/filtersetting';
import LeadManagementActionModal from './LeadManagementActionModal';
import Link from 'next/link';
import { leadSlice, useGetLeadsQuery, useDeleteLeadMutation, useCreateLeadMutation, useUpdateLeadMutation } from '@/services/api/leadSlice';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';
import type { Lead } from '@/entities/lead.entity';
import { usePaginationOptions } from '@/hooks/usePaginationOptions';

const LeadManagement: React.FC = () => {
    const [createLead, {}] = useCreateLeadMutation();
    const [updateLead, {}] = useUpdateLeadMutation();
    const [deleteLead, {}] = useDeleteLeadMutation();

    const { page, limit, sortField, sortOrder, search, filter, setFilter, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10 });

    const { data: leads, isError, error, isFetching, isLoading } = useGetLeadsQuery({ page, limit, sortField, sortOrder, search, filter });
    const { items = [], meta = {} } = leads || {};

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    // console.log('leads: ', data, isLoading, isFetching);
    // console.log('eror: ', isError, error);

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        { accessor: 'name', textAlign: 'left', title: 'Lead Name' },
        { accessor: 'email', textAlign: 'left', title: 'Email' },
        { accessor: 'phone', textAlign: 'left', title: 'Phone no' },
        {
            accessor: 'country',
            textAlign: 'left',
            title: 'Country',
            render: (row: any) => {
                return row.country.name;
            },
        },
        {
            accessor: 'visa_type',
            textAlign: 'left',
            title: 'Visa Type',
            render: (row: any) => {
                return row.visa_type.name;
            },
        },
        // { accessor: 'stateofresidence', textAlign: 'left', title: 'State Of Residence' },
        { accessor: 'email_sent_date', textAlign: 'left', title: 'Email Sent Date' },
        // { accessor: 'lastfollowup', textAlign: 'left', title: 'Last Follow Up' },
        { accessor: 'next_followup', textAlign: 'left', title: 'Next Follow Up' },
        { accessor: 'status', textAlign: 'left', title: 'Status' },
        { accessor: 'stage', textAlign: 'left', title: 'Stage' },
    ];


    const handleDeleteLead = (lead: Lead) =>
        handleDelete({
            deleteMutation: deleteLead,
            item: lead,
            items,
            meta,
            handleLocalUpdate: handleLocalRTKUpdate,
            apiObjectRef: leadSlice,
            endpoint: 'getLeads',
        });

    const handleSubmit = async (value: Lead) => {
        if (value.id) {
            return handleUpdate({
                updateMutation: updateLead,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: leadSlice,
                endpoint: 'getLeads',
            });
        } else {
            return handleCreate({
                createMutation: createLead,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: leadSlice,
                endpoint: 'getLeads',
            });
        }
    };

    const exportColumns = ['id', 'leadname', 'email', 'contact', 'country', 'visatype', 'stateofresidence', 'emailsentdate', 'lastfollowup', 'nextfollowup', 'status'];

   

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
                handleDelete={handleDeleteLead}
                data={items}
                meta={meta}
                tableColumns={tableColumns}
                exportColumns={exportColumns}
                ActionModal={LeadManagementActionModal}
                Filtersetting={Filtersetting}
                handleSubmit={handleSubmit}

                setSearch={setSearch}
                setPage={setPage}
                setLimit={setLimit}
                setFilter={setFilter}
            />
        </>
    );
};

export default LeadManagement;
