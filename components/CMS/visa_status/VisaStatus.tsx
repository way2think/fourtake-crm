'use client';
import TableLayout from '@/components/layouts/table-layout';
import React from 'react';
import VisaStatusActionModal from '@/components/cms/visa_status/VisaStatusActionModal';
import { showMessage } from '@/utils/notification';
import { useCreateVisaStatusMutation, useDeleteVisaStatusMutation, useGetVisaStatusesQuery, useUpdateVisaStatusMutation, visaStatusSlice } from '@/services/api/cms/visaStatusSlice';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';
import type { VisaStatus } from '@/entities/visa-status.entity';

const VisaStatus: React.FC<{ visastatusdata: any }> = ({ visastatusdata }) => {
    const [createVisaStatus, {}] = useCreateVisaStatusMutation();
    const [updateVisaStatus, {}] = useUpdateVisaStatusMutation();
    const [deleteVisaStatus, {}] = useDeleteVisaStatusMutation();
    const { data, isFetching, isLoading } = useGetVisaStatusesQuery(undefined);
    const { items = [], meta = {} } = data || {};

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const exportColumns = ['id', 'name', 'type'];

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        { accessor: 'name', textAlign: 'left', title: 'Visa Status' },
        { accessor: 'type', textAlign: 'left', title: 'Status Type' },
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
            <TableLayout
                title="Visa Status"
                handleDelete={handleDeleteVisaStatus}
                data={items}
                filterby="name"
                totalPages={items?.length || 0}
                tableColumns={tableColumns}
                ActionModal={VisaStatusActionModal}
                exportColumns={exportColumns}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default VisaStatus;
