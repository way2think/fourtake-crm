'use client';
import TableLayout from '@/components/layouts/table-layout';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { showMessage } from '@/utils/notification';
import Swal from 'sweetalert2';
import { useCreateVisaTypeMutation, useDeleteVisaTypeMutation, useGetVisaTypesQuery, useUpdateVisaTypeMutation, visaTypeSlice } from '@/services/api/cms/visaTypeSlice';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { VisaType } from '@/entities/visa-type.entity';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';
import VisaTypesActionModal from '@/components/cms/visa-types/VisaTypesActionModal';

const VisaTypes: React.FC<{ visatypedata: any }> = ({ visatypedata }) => {
    const [createVisaType, {}] = useCreateVisaTypeMutation();
    const [updateVisaType, {}] = useUpdateVisaTypeMutation();
    const [deleteVisaType, {}] = useDeleteVisaTypeMutation();
    const { data: visatypes, isFetching, isLoading } = useGetVisaTypesQuery(undefined);
    const { items = [], meta = {} } = visatypes || {};

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'S.NO' },
        { accessor: 'name', textAlign: 'left', title: 'Visa Type' },
    ];
    const exportColumns = ['id', 'name'];

    const handleSubmit = async (value: VisaType) => {
        if (value.name === '' || value.name == null) {
            showMessage('Enter VisaType', 'error');
            return false;
        }

        if (value.id) {
            return handleUpdate({
                updateMutation: updateVisaType,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaTypeSlice,
                endpoint: 'getVisaTypes',
            });
        } else {
            return handleCreate({
                createMutation: createVisaType,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaTypeSlice,
                endpoint: 'getVisaTypes',
            });
        }
    };
    const handleDeleteVisaType = (visatype: VisaType) => {
        handleDelete({
            deleteMutation: deleteVisaType,
            item: visatype,
            items,
            meta,
            handleLocalUpdate: handleLocalRTKUpdate,
            apiObjectRef: visaTypeSlice,
            endpoint: 'getVisaTypes',
        });
    };

    return (
        <>
            <TableLayout
                title="Visa Types"
                filterby="name"
                data={items}
                totalPages={items?.length || 0}
                tableColumns={tableColumns}
                handleDelete={handleDeleteVisaType}
                ActionModal={VisaTypesActionModal}
                exportColumns={exportColumns}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default VisaTypes;
