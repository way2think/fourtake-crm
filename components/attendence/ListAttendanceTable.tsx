'use client';

import React from 'react';
import TableLayout from '@/components/layouts/table-layout';
import Filtersetting from '@/components/layouts/filtersetting';
import LeadManagementActionModal from '../../components/lead-management/lead-manage/LeadManagementActionModal';
import Link from 'next/link';
import { leadSlice, useGetLeadsQuery, useDeleteLeadMutation, useCreateLeadMutation, useUpdateLeadMutation } from '@/services/api/leadSlice';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';
import type { Lead } from '@/entities/lead.entity';
import { usePaginationOptions } from '@/hooks/usePaginationOptions';
import { useGetVisaChecklistQuery } from '@/services/api/cms/visaChecklistSlice';
import { showMessage } from '@/utils/notification';
import { isValidPhoneNumber } from '@/utils/validator';

const ListAttendanceTable: React.FC = () => {
    const [createLead, { }] = useCreateLeadMutation();
    const [updateLead, { }] = useUpdateLeadMutation();
    const [deleteLead, { }] = useDeleteLeadMutation();

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
        { accessor: 'name', textAlign: 'left', title: 'Name' },
        { accessor: 'type', textAlign: 'left', title: 'Type' },
        {
            accessor: 'regular',
            textAlign: 'left',
            title: 'Regular',
            // render: (row: any) => {
            //     if (row.phone && row.other_phone) {
            //         return `+91 ${row.phone}, ${row.other_phone}`;
            //     } else if (row.phone && !row.other_phone) {
            //         return `+91 ${row.phone}`;
            //     } else if (row.other_phone && !row.phone) {
            //         return `${row.other_phone}`;
            //     }
            // },
        },
        {
            accessor: 'overtime',
            textAlign: 'left',
            title: 'OverTime',
            // render: (row: any) => {
            //     return row.country?.name;
            // },
        },
        {
            accessor: 'sickleave',
            textAlign: 'left',
            title: 'Sick Leave',
            // render: (row: any) => {
            //     return row.visa_type.name;
        },

        // { accessor: 'stateofresidence', textAlign: 'left', title: 'State Of Residence' },
        { accessor: 'pot', textAlign: 'left', title: 'POT' },
        // { accessor: 'lastfollowup', textAlign: 'left', title: 'Last Follow Up' },
        {
            accessor: 'paid holiday',
            textAlign: 'left',
            title: 'Paid Holiday',
            // render: (row: any) => {
            //     if (row.followups) {
            //         const dateOnly = row.followups[row.followups.length - 1].next_followup;
            //         const time = row.followups[row.followups.length - 1].followup_time;
            //         return `${getDate(dateOnly)}, ${time}`;
            //     }
            // },
        },
        { accessor: 'totalhour', textAlign: 'left', title: 'Total Hour' },

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

        if (value.state_of_residence == null || value.state_of_residence == '') {
            showMessage('Select State', 'error');
            return false;
        }

        if (value.travel_date == null || value.travel_date == '') {
            showMessage('Select Travel Date', 'error');
            return false;
        }

        if (value.assigned_to == null || value.assigned_to == '') {
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
            <div className='mt-5'>
                <TableLayout
                    title="Time Sheet"
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
            </div>
        </>
    );
};

export default ListAttendanceTable;
