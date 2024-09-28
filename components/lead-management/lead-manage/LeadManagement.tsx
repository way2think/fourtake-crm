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
            accessor: 'destination_country',
            textAlign: 'left',
            title: 'Country',
            render: (row: any) => {
                return row.destination_country.name;
            },
        },
        {
            accessor: 'visa_type',
            
            textAlign: 'left',
            title: 'Visa Type',
            render: (row: any) => {
                return row?.visa_type?.name;
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

        if (value.service_type == null || value.service_type == '') {
            showMessage('Select Service Type', 'error');
            return false;
        }

        if (value.assigned_to == null || value.assigned_to == '') {
            showMessage('Select Assignee ', 'error');
            return false;
        }

        if (value.service_type == 'visa service' || value.service_type == 'appointment/slot booking service' || value.service_type == 'forex service') {
            if (value.destination_country == null || value.destination_country == '') {
                showMessage('Select Country', 'error');
                return false;
            }
        }

        if (value.service_type == 'visa service' || value.service_type == 'appointment/slot booking service') {
            if (value.visa_type == null || value.visa_type == '') {
                showMessage('Select Visa Type', 'error');
                return false;
            }
        }

        if (value.service_type == 'appointment/slot booking service' || value.service_type == 'travel insurance') {
            if (value.date_range == null) {
                showMessage('Select Date Range', 'error');
                return false;
            }
        }

        if (value.service_type == 'appointment/slot booking service') {
            if (value.location == null || value.location == '') {
                showMessage('Select Location', 'error');
                return false;
            }

            if (value.location == null || value.location == '') {
                showMessage('Select Location', 'error');
                return false;
            }
        }

        if (value.service_type == 'visa service') {
            if (value.state_of_residence == null || value.state_of_residence == '') {
                showMessage('Select State', 'error');
                return false;
            }

            if (value.travel_date == null || value.travel_date == '') {
                showMessage('Select Travel Date', 'error');
                return false;
            }
        }

        if (value.service_type == 'attestation service') {
            if (value.attestation_document == '' || value.attestation_document == null) {
                showMessage('Select Attestation Document ', 'error');
                return false;
            }

            if (value.attestation_service_type == '' || value.attestation_service_type == null) {
                showMessage('Select Attestation Service Type ', 'error');
                return false;
            }

            if (value.attestation_document !== '' || value.attestation_document !== null) {
                value.attestation_document = [value.attestation_document];
            }

            if (value.attestation_service_type !== '' || value.attestation_service_type !== null) {
                value.attestation_service_type = [value.attestation_service_type];
            }
        }

        if (value.service_type == 'passport service') {
            if (value.passport_service_type == null || value.passport_service_type == '') {
                showMessage('Select Passport Service Type ', 'error');
                return false;
            }
            if (value.passport_service_category == null || value.passport_service_category == '') {
                showMessage('Select Passport Category', 'error');
                return false;
            }

            if (value.passport_size == null || value.passport_size == '') {
                showMessage('Select Passport Size', 'error');
                return false;
            }
        }

        if (value.service_type == 'forex service') {
            if (value.currency_exchange_from == null || value.currency_exchange_from == '') {
                showMessage('Enter Currency Exchange from', 'error');
                return false;
            }

            if (value.currency_volume == null || value.currency_volume == '') {
                showMessage('Enter Currency Volume', 'error');
                return false;
            }

            if (value.valid_visa == null || value.valid_visa == '') {
                showMessage('Select Valid visa ', 'error');
                return false;
            }

            if (value.exchange_mode == null || value.exchange_mode == '') {
                showMessage('Select Exchange Mode', 'error');
                return false;
            }
        }

        if (value.service_type == 'travel insurance') {
            if (value.insurance_plan == null || value.insurance_plan == '') {
                showMessage('Select Insurance Plan', 'error');
                return false;
            }
            if (value.trip_type == null || value.trip_type == '') {
                showMessage('Select Trip type', 'error');
                return false;
            }

            if (value.ped == null || value.ped == '') {
                showMessage('Select PED', 'error');
                return false;
            }
            if (value.travellers_count == null || value.travellers_count == '') {
                showMessage('Select Travellers Count', 'error');
                return false;
            }
            if (value.eldest_age == null || value.eldest_age == '') {
                showMessage('Select Eldest Age', 'error');
                return false;
            }

            if (value.sum_insured == null || value.sum_insured == '') {
                showMessage('Select Sum Insured', 'error');
                return false;
            }
        }

        console.log('value submit', value);

        if (
            value.service_type == 'flight itinerary' ||
            value.service_type == 'hotel itinerary' ||
            value.service_type == 'photographs' ||
            value.service_type == 'courier' ||
            value.service_type == 'passport collection' ||
            value.service_type == 'documents pickup & delivery' ||
            value.service_type == 'visa application submission & collection - applicants' ||
            value.service_type == 'visa application submission & collection - associate partners B2B' ||
            value.service_type == 'DS-160 Form' ||
            value.service_type == 'others'
        ) {
            if (value.other_details == null || value.other_details == '') {
                showMessage('Enter Fee & Other Details', 'error');
                return false;
            }
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

    const exportColumns = ['id', 'leadname', 'email', 'contact', 'destination_country', 'visatype', 'stateofresidence', 'emailsentdate', 'lastfollowup', 'nextfollowup', 'status'];

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
                filterby="destination_country"
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
