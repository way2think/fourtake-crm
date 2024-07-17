'use client';
import TableLayout from '@/components/layouts/table-layout';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import EntryTypesActionModal from '@/components/CMS/entry-types/EntryTypesActionModal';
import { showMessage } from '@/utils/notification';
import { entryTypeSlice, useCreateEntryTypeMutation, useDeleteEntryTypeMutation, useGetEntryTypesQuery, useUpdateEntryTypeMutation } from '@/services/api/cms/entryTypeSlice';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';
import { EntryType } from '@/models/entry-type.entity';

const EntryTypes: React.FC<{ entrytypedata: any }> = ({ entrytypedata }) => {
    const [createEntryType, {}] = useCreateEntryTypeMutation();
    const [updateEntryType, {}] = useUpdateEntryTypeMutation();
    const [deleteEntryType, {}] = useDeleteEntryTypeMutation();
    const { data, isFetching, isLoading } = useGetEntryTypesQuery(undefined);
    const { items = [], meta = {} } = data || {};

    const exportColumns = ['id', 'name'];
    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'S.NO' },
        { accessor: 'name', textAlign: 'left', title: 'Entry Type' },
    ];

    const handleDeleteEntryType = (entrytype: EntryType) =>
        handleDelete({
            deleteMutation: deleteEntryType,
            item: entrytype,
            items,
            meta,
            handleLocalUpdate: handleLocalRTKUpdate,
            apiObjectRef: entryTypeSlice,
            endpoint: 'getEntryTypes',
        });

    // const handleSubmit = (value: any) => {
    //     if (value.entrytype == '' || value.entrytype == null) {
    //         showMessage('Enter Entry type', 'error');
    //         return false;
    //     }

    //     if (value.id) {
    //         //update user
    //         let formData: any = data.find((d: any) => d.id === value.id);
    //         formData.entrytype = value.entrytype;

    //         return formData;
    //     } else {
    //         //add user
    //         let maxUserId = data.length ? data.reduce((max: any, character: any) => (character.id > max ? character.id : max), data[0].id) : 0;

    //         let formData = {
    //             id: +maxUserId + 1,
    //             entrytype: value.entrytype,
    //         };
    //         setData([...data, formData]);
    //         return formData;

    //         //   searchContacts();
    //     }

    //     // showMessage('User has been saved successfully.');
    //     // setAddContactModal(false);
    //     // setIsEdit(false);
    // };

    const handleSubmit = async (value: EntryType) => {
        if (value.name === '' || value.name == null) {
            showMessage('Enter Entry Type', 'error');
            return false;
        }
        if (value.id) {
            return handleUpdate({
                updateMutation: updateEntryType,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: entryTypeSlice,
                endpoint: 'getEntryTypes',
            });
        } else {
            return handleCreate({
                createMutation: createEntryType,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: entryTypeSlice,
                endpoint: 'getEntryTypes',
            });
        }
    };

    return (
        <>
            <TableLayout
                title="Entry Types"
                filterby="name"
                data={items}
                totalPages={items?.length || 0}
                tableColumns={tableColumns}
                ActionModal={EntryTypesActionModal}
                handleDelete={handleDeleteEntryType}
                exportColumns={exportColumns}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default EntryTypes;
