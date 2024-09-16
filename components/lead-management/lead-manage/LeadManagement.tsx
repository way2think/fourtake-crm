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
import { useGetVisaChecklistQuery } from '@/services/api/cms/visaChecklistSlice';
import { showMessage } from '@/utils/notification';
import { isValidPhoneNumber } from '@/utils/validator';

const LeadManagement: React.FC = () => {
    const [createLead, {}] = useCreateLeadMutation();
    const [updateLead, {}] = useUpdateLeadMutation();
    const [deleteLead, {}] = useDeleteLeadMutation();

    const { page, limit, sortField, sortOrder, search, filter, setFilter, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10 });

    const { data: leads, isError, error, isFetching, isLoading } = useGetLeadsQuery({ page, limit, sortField: 'updated_time', sortOrder: 'DESC', search, filter });
    const { items = [], meta = {} } = leads || {};

    const { data: visachecklist } = useGetVisaChecklistQuery({ page: 0, limit: 0 });

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const getDate = (timestamp: string) => {
        //will get date alone from  ISO 8601 format date in the format of dd-mm-yyyy
        const dateObj = new Date(timestamp);

        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
        const year = dateObj.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        { accessor: 'name', textAlign: 'left', title: 'Lead Name' },
        { accessor: 'email', textAlign: 'left', title: 'Email' },
        {
            accessor: 'phone',
            textAlign: 'left',
            title: 'Phone no',
            render: (row: any) => {
                if (row.phone && row.other_phone) {
                    return `+91 ${row.phone}, ${row.other_phone}`;
                } else if (row.phone && !row.other_phone) {
                    return `+91 ${row.phone}`;
                } else if (row.other_phone && !row.phone) {
                    return `${row.other_phone}`;
                }
            },
        },
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
        {
            accessor: 'followups',
            textAlign: 'left',
            title: 'Next Follow Up',
            render: (row: any) => {
                if (row.followups) {
                    const dateOnly = row.followups[row.followups.length - 1].next_followup;
                    const time = row.followups[row.followups.length - 1].followup_time;
                    return `${getDate(dateOnly)}, ${time}`;
                }
            },
        },
        { accessor: 'status', textAlign: 'left', title: 'Status' },
        { accessor: 'stage', textAlign: 'left', title: 'Stage' },
        {
            accessor: 'lead_type',
            textAlign: 'left',
            title: 'Lead Type',
            render: (row: any) => {
                if (row.lead_type == 'hot') {
                    return <p style={{ color: 'red' }}>{row.lead_type}</p>;
                } else {
                    return row.lead_type;
                }
            },
        },
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
        if (value.name == null || value.name == '') {
            showMessage('Enter Name', 'error');
            return false;
        }

        if ((value.phone == null || value.phone == '') && (value.other_phone == '' || value.other_phone == null)) {
            showMessage('Enter either phone or other phone number', 'error');
            return false;
        }

        if (value.phone && value.phone.trim() !== '') {
            if (!isValidPhoneNumber(value.phone)) {
                showMessage('Enter a valid phone number with exactly 10 digits.', 'error');
                return false;
            }
        }

        if (value.country == null || value.country == '') {
            showMessage('Select Country', 'error');
            return false;
        }

        if (value.visa_type == null || value.visa_type == '') {
            showMessage('Select Visa Type', 'error');
            return false;
        }

        if (value.residence_state == null || value.residence_state == '') {
            showMessage('Select State', 'error');
            return false;
        }

        if (value.travel_date == null || value.travel_date == '') {
            showMessage('Select Travel Date', 'error');
            return false;
        }

        if (value.assignee == null || value.assignee == '') {
            showMessage('Select Assignee ', 'error');
            return false;
        }

        if (value.service_type == null || value.service_type == '') {
            showMessage('Select Service Type', 'error');
        }
        

        let service_code;

        if (value.service_type == 'visa service') {
            service_code = 'VI';
        } else {
            service_code = 'OT';
        }

        if (value.id) {
            const updatedData = { ...value, updated_time: new Date(), service_code };
            return handleUpdate({
                updateMutation: updateLead,
                value: updatedData,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: leadSlice,
                endpoint: 'getLeads',
            });
        } else {
            const updatedData = { ...value, updated_time: new Date(), stage: 'Fresh', status: 'Open', service_code };
            return handleCreate({
                createMutation: createLead,
                value: updatedData,
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
                visaChecklistData={visachecklist}
            />
        </>
    );
};

export default LeadManagement;
