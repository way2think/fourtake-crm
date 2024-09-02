'use client';
import { showMessage } from '@/utils/notification';

import Swal from 'sweetalert2';

import { Tab } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import PaginationExpand from '@/components/Reusable/Table/PaginationExpand';
import PaginationTable from '@/components/Reusable/Table/PaginationTable';
import ListVisaApplicationListLine from './ListVisaApplicationListLine';
import { usePaginationOptions } from '@/hooks/usePaginationOptions';
import { useDeleteApplicantMutation, useDeleteGroupMutation, useGetVisaApplicantsQuery, visaProcessSlice } from '@/services/api/visaProcessSlice';
import CountryActionModal from '@/components/cms/countries/CountryActionModal';
import TableLayout from '@/components/layouts/table-layout';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { handleDelete } from '@/utils/rtk-http';

const ListVisaApplication = () => {
    const [deleteApplicant, {}] = useDeleteApplicantMutation();
    const [deleteGroup, {}] = useDeleteGroupMutation();

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const { page, limit, sortField, sortOrder, search, filter, setFilter, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10, initialFilter: 'all' });

    const { data: visaApplicants, isFetching, isLoading } = useGetVisaApplicantsQuery({ page, limit, sortField: 'updated_time', sortOrder: 'DESC', search, filter, showDeleted: false });
    const { items = [], meta = {} } = visaApplicants || {};

    const [data, setData] = useState(visaApplicants);
    const exportColumns = ['id', 'applydate', 'refno', 'apptype', 'applname', 'cosultantname', 'destination', 'type', 'duration', 'entry'];

    const transformedData = items
        .map((applicants: any) => {
            return applicants.visa_applicants.map((item: any) => {
                const { visa_applicants, id, ...rest } = applicants;
                return { ...item, ...rest, group_id: applicants.id };
            });
        })
        .flat();

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'SNo' },
        {
            accessor: 'apply_date',
            textAlign: 'left',
            title: 'Apply Date',
            render: (row: any) => {
                const dateObject = new Date(row.apply_date);

                return dateObject.toLocaleDateString('en-GB');
            },
        },
        {
            accessor: 'id',
            textAlign: 'left',
            title: 'ReferenceNo',
            render: (row: any) => {
                if (row.is_group) {
                    return `${row.id} -  ${row.group_id}`;
                } else {
                    return row.id;
                }
            },
        },
        {
            accessor: 'is_primary',
            textAlign: 'left',
            title: 'Is Primary',
            render: (row: any) => {
                return row.is_primary ? 'Yes' : 'No';
            },
        },
        { accessor: 'customer_type', textAlign: 'left', title: 'App Type' },
        {
            accessor: 'first_name',
            textAlign: 'left',
            title: 'Applicant Name',
            render: (row: any) => {
                return `${row.first_name} ${row.last_name}`;
            },
        },
        {
            accessor: 'assigned_to',
            textAlign: 'left',
            title: 'Assigned To',
            render: (row: any) => {
                return row.assigned_to.username;
            },
        },
        {
            accessor: 'destination_country',
            textAlign: 'left',
            title: 'Destination',
            render: (row: any) => {
                return row.destination_country.name;
            },
        },
        {
            accessor: 'visa_type',
            textAlign: 'left',
            title: 'Type',
            render: (row: any) => {
                return row.visa_type.name;
            },
        },
        { accessor: 'visa_duration', textAlign: 'left', title: 'Duration' },
        // {
        //     accessor: 'entry',
        //     textAlign: 'left',
        //     title: 'Entry',
        //     render: (row: any) => {
        //         return row.entry_type.name;
        //     },
        // },
        {
            accessor: 'visa_status',
            textAlign: 'left',
            title: 'Status',
            render: (row: any) => {
                return row.visa_status.name;
            },
        },
    ];

    const handleDeleteApplicant = (applicant: any) => {
        console.log('applicant', applicant);

        if (applicant.id) {
            handleDelete({
                deleteMutation: deleteApplicant,
                item: applicant,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaProcessSlice,
                endpoint: 'getVisaProcess',
            });
        }
    };

    const handleDeleteGroup = (group: any) => {
        console.log('group', group);
        if (group.id) {
            handleDelete({
                deleteMutation: deleteGroup,
                item: group,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaProcessSlice,
                endpoint: 'getVisaProcess',
            });
        }
    };

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            <div className="mb-5">
                {isMounted && (
                    <Tab.Group>
                        <Tab.List className="mt-3 flex flex-wrap">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-primary text-white !outline-none' : ''}' -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`}
                                    >
                                        All
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-primary text-white !outline-none' : ''} -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`}
                                    >
                                        Group
                                    </button>
                                )}
                            </Tab>
                            {/* <Tab as={Fragment}>
                            {({ selected }) => (
                                <button className={`${selected ? 'bg-primary text-white !outline-none' : ''} -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`}>
                                    Contact
                                </button>
                            )}
                        </Tab> */}
                            {/* <Tab className="pointer-events-none -mb-[1px] block rounded p-3.5 py-2 text-white-light dark:text-dark">Disabled</Tab> */}
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="active pt-5">
                                    <TableLayout
                                        title="List Visa Application"
                                        filterby="country"
                                        handleDelete={handleDeleteApplicant}
                                        data={transformedData}
                                        // totalPages={items?.length || 0}
                                        tableColumns={tableColumns}
                                        exportColumns={exportColumns}
                                        ActionModal={CountryActionModal}
                                        ActionModalListLine={ListVisaApplicationListLine}
                                        // handleSubmit={handleSubmit}
                                        meta={meta}
                                        setSearch={setSearch}
                                        setPage={setPage}
                                        setLimit={setLimit}
                                    />
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div>
                                    <div className=" pt-5">
                                        <div className="flex-auto">
                                            <PaginationExpand
                                                getSubData={items}
                                                data={items}
                                                tableColumns={tableColumns}
                                                handleDeleteApplicant={handleDeleteApplicant}
                                                handleDeleteGroup={handleDeleteGroup}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                )}
            </div>
        </>
    );
};

export default ListVisaApplication;
