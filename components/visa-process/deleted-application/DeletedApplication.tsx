'use client';
import { Tab } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import PaginationExpand from '@/components/Reusable/Table/PaginationExpand';
import PaginationTable from '@/components/Reusable/Table/PaginationTable';
import { usePaginationOptions } from '@/hooks/usePaginationOptions';
import { useDeleteApplicantMutation, useDeleteGroupMutation, useGetVisaApplicantsQuery, useRestoreApplicantMutation, useRestoreGroupMutation, visaProcessSlice } from '@/services/api/visaProcessSlice';
import CountryActionModal from '@/components/cms/countries/CountryActionModal';
import TableLayout from '@/components/layouts/table-layout';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { handleUpdate } from '@/utils/rtk-http';

const DeletedApplication = () => {
    const [restoreApplicant, {}] = useRestoreApplicantMutation();
    const [restoreApplicantGroup, {}] = useRestoreGroupMutation();

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const { page, limit, sortField, sortOrder, search, filter, setFilter, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10, initialFilter: 'all' });

    const { data: visaApplicants, isFetching, isLoading } = useGetVisaApplicantsQuery({ page, limit, sortField: 'updated_time', sortOrder: 'DESC', search, filter, showDeleted: true });
    const { items = [], meta = {} } = visaApplicants || {};

    console.log('deleted Application list', visaApplicants);

    const [data, setData] = useState(visaApplicants);
    const exportColumns = ['id', 'applydate', 'refno', 'apptype', 'applname', 'cosultantname', 'destination', 'type', 'duration', 'entry'];

    let transformedData = items
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

    const handleRestoreApplicant = (applicant: any) => {
        console.log('restoring applicant', applicant);

        if (applicant.id && applicant.is_group) {
            handleUpdate({
                updateMutation: restoreApplicant,
                value: applicant,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaProcessSlice,
                endpoint: 'getVisaApplicants',
            });
        } else if (applicant.id && !applicant.is_group) {
            const applicantData = { ...applicant, id: applicant.group_id };
            handleUpdate({
                updateMutation: restoreApplicantGroup,
                value: applicantData,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaProcessSlice,
                endpoint: 'getVisaApplicants',
            });
        }
    };

    const handleRestoreGroup = (object: any) => {
        handleUpdate({
            updateMutation: restoreApplicantGroup,
            value: object,
            items,
            meta,
            handleLocalUpdate: handleLocalRTKUpdate,
            apiObjectRef: visaProcessSlice,
            endpoint: 'getVisaApplicants',
        });
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
                                        title="Deleted Visa Application"
                                        filterby="country"
                                        // handleDelete={handleDeleteApplicant}
                                        data={transformedData}
                                        // totalPages={items?.length || 0}
                                        tableColumns={tableColumns}
                                        exportColumns={exportColumns}
                                        ActionModal={CountryActionModal}
                                        handleRestore={handleRestoreApplicant}
                                        // ActionModalListLine={ListVisaApplicationListLine}
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
                                                title="Deleted Visa Application"
                                                getSubData={items}
                                                data={items}
                                                tableColumns={tableColumns}
                                                handleRestoreGroup={handleRestoreGroup}
                                                // handleDeleteApplicant={handleDeleteApplicant}
                                                // handleDeleteGroup={handleDeleteGroup}
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

export default DeletedApplication;
