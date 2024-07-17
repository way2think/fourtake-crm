'use client';
import TableLayout from '@/components/layouts/table-layout';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { showMessage } from '@/utils/notification';
import Swal from 'sweetalert2';
import { useCreateVisaTypeMutation, useDeleteVisaTypeMutation, useGetVisaTypesQuery, useUpdateVisaTypeMutation, visaTypeSlice } from '@/services/api/cms/visaTypeSlice';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { VisaType } from '@/models/visa-type.entity';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';
import VisaTypesActionModal from '@/components/CMS/visa-types/VisaTypesActionModal';

const VisaTypes: React.FC<{ visatypedata: any }> = ({ visatypedata }) => {
    const [createVisaType, {}] = useCreateVisaTypeMutation();
    const [updateVisaType, {}] = useUpdateVisaTypeMutation();
    const [deleteVisaType, {}] = useDeleteVisaTypeMutation();
    const { data: visatypes, isFetching, isLoading } = useGetVisaTypesQuery(undefined);
    const { items = [], meta = {} } = visatypes || {};

    const [data, setData] = useState(visatypedata);

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'S.NO' },
        { accessor: 'name', textAlign: 'left', title: 'Visa Type' },
    ];

    // const handleSubmit = (value: any) => {
    //     if (value.visatype == '' || value.visatype == null) {
    //         showMessage('Enter Visa Type', 'error');
    //         return false;
    //     }

    //     if (value.id) {
    //         //update user
    //         let formData: any = data.find((d: any) => d.id === value.id);
    //         formData.visatype = value.visatype;

    //         return formData;
    //     } else {
    //         //add user
    //         let maxUserId = data.length ? data.reduce((max: any, character: any) => (character.id > max ? character.id : max), data[0].id) : 0;

    //         let formData = {
    //             id: +maxUserId + 1,
    //             visatype: value.visatype,
    //         };
    //         setData([...data, formData]);
    //         return formData;
    //     }
    // };
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
    // const handleDelete = (row: any) => {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         showCancelButton: true,
    //         confirmButtonText: 'Delete',
    //         padding: '2em',
    //         customClass: 'sweet-alerts',
    //     }).then((result) => {
    //         if (result.value) {
    //             setData(data.filter((item: any) => item.id !== row.id));
    //             Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
    //             return true;
    //         }
    //     });
    // };
    const exportColumns = ['id', 'visatype'];

    return (
        <>
            <TableLayout
                title="Visa Types"
                setData={setData}
                filterby="name"
                data={items}
                totalPages={data?.length || 0}
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
