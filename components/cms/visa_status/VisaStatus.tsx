'use client';
import TableLayout from '@/components/layouts/table-layout';
import React from 'react';
import VisaStatusActionModal from '@/components/cms/visa_status/VisaStatusActionModal';
import { showMessage } from '@/utils/notification';
import { useCreateVisaStatusMutation, useDeleteVisaStatusMutation, useGetVisaStatusesQuery, useUpdateVisaStatusMutation, visaStatusSlice } from '@/services/api/cms/visaStatusSlice';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';
import type { VisaStatus } from '@/entities/visa-status.entity';
import { usePaginationOptions } from '@/hooks/usePaginationOptions';
import LoadingSpinner from '@/components/Reusable/LoadingSpinner/LoadingSpinner';

const VisaStatus: React.FC<{ visastatusdata: any }> = ({ visastatusdata }) => {
    const [createVisaStatus, { isLoading: isCreateLoading }] = useCreateVisaStatusMutation();
    const [updateVisaStatus, { isLoading: isUpdateLoading }] = useUpdateVisaStatusMutation();
    const [deleteVisaStatus, { isLoading: isDeleteLoading }] = useDeleteVisaStatusMutation();

    const { page, limit, sortField, sortOrder, search, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10 });

    const { data, isFetching, isLoading } = useGetVisaStatusesQuery({ page, limit, sortField, sortOrder, search });
    const { items = [], meta = {} } = data || {};

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const exportColumns = ['id', 'name', 'type'];

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        { accessor: 'name', textAlign: 'left', title: 'Visa Status' },
        { accessor: 'type', textAlign: 'left', title: 'Status Type' },
        {
            accessor: 'is_active',
            textAlign: 'left',
            title: 'Is Active',
            render: (row: any) => {
                return row.is_active ? 'Yes' : 'No';
            },
        },
    ];

    const handleDeleteVisaStatus = (visastatus: VisaStatus) =>
        handleDelete({
            deleteMutation: deleteVisaStatus,
            item: visastatus,
            items,
            meta,
            handleLocalUpdate: handleLocalRTKUpdate,
            apiObjectRef: visaStatusSlice,
            endpoint: 'getVisaStatuses',
        });

    const handleSubmit = async (value: VisaStatus) => {
        if (value.name == '' || value.name == null) {
            showMessage('Enter Visa Status', 'error');
            return false;
        }
        if (value.id) {
            return handleUpdate({
                updateMutation: updateVisaStatus,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaStatusSlice,
                endpoint: 'getVisaStatuses',
            });
        } else {
            return handleCreate({
                createMutation: createVisaStatus,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaStatusSlice,
                endpoint: 'getVisaStatuses',
            });
        }
    };

    return (
        <>
            {(isFetching || isLoading || isCreateLoading || isUpdateLoading || isDeleteLoading) && <LoadingSpinner />}

            <TableLayout
                title="Visa Status"
                handleDelete={handleDeleteVisaStatus}
                data={items}
                meta={meta}
                filterby="name"
                tableColumns={tableColumns}
                ActionModal={VisaStatusActionModal}
                exportColumns={exportColumns}
                handleSubmit={handleSubmit}
                setSearch={setSearch}
                setPage={setPage}
                setLimit={setLimit}
            />
        </>
    );
};

export default VisaStatus;
