'use client';

import TableLayout from '@/components/layouts/table-layout';
import React from 'react';
import VisaChecklistActionModal from './VisaChecklistActionModal';
import { showMessage } from '@/utils/notification';
import { useCreateVisaChecklistMutation, useDeleteVisaChecklistMutation, useGetVisaChecklistQuery, useUpdateVisaChecklistMutation, visaChecklistSlice } from '@/services/api/cms/visaChecklistSlice';
import type { VisaChecklist } from '@/entities/visa-checklist.entity';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { usePaginationOptions } from '@/hooks/usePaginationOptions';

const VisaChecklist: React.FC = () => {
    const [createVisaChecklist, {}] = useCreateVisaChecklistMutation();
    const [updateVisaChecklist, {}] = useUpdateVisaChecklistMutation();
    const [deleteVisaChecklist, {}] = useDeleteVisaChecklistMutation();

    const { page, limit, sortField, sortOrder, search, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10 });

    const { data, isFetching, isLoading } = useGetVisaChecklistQuery({ page, limit, sortField, sortOrder, search });
    const { items = [], meta = {} } = data || {};

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    console.log('item visa checklist', items);

    const exportColumns = ['country', 'type', 'embassy'];
    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        {
            accessor: 'country',
            textAlign: 'left',
            title: 'Country',
            render: (row: any) => {
                return row?.country?.name;
            },
        },
        {
            accessor: 'type',
            textAlign: 'left',
            title: 'Visa type',
            render: (row: any) => {
                return row?.type_type?.name;
            },
        },
        { accessor: 'embassy', textAlign: 'left', title: 'Embassy' },
    ];

    const handleDeleteVisaChecklist = (visachecklist: VisaChecklist) =>
        handleDelete({
            deleteMutation: deleteVisaChecklist,
            item: visachecklist,
            items,
            meta,
            handleLocalUpdate: handleLocalRTKUpdate,
            apiObjectRef: visaChecklistSlice,
            endpoint: 'getVisaChecklist',
        });

    const handleSubmit = async (value: VisaChecklist) => {
        if (value.country == '' || value.country == null) {
            showMessage('Select country ', 'error');
            return false;
        }
        if (value.type == '' || value.type == null) {
            showMessage('Select Visa type', 'error');
            return false;
        }
        if (value.embassy == '' || value.embassy == null) {
            showMessage('Select Embassy Location', 'error');
            return false;
        }

        // console.log('value', value);

        // console.log('formdata: ', formData, formData.get('country'));

        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }

        if (value.id) {
            return handleUpdate({
                updateMutation: updateVisaChecklist,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaChecklistSlice,
                endpoint: 'getVisaChecklist',
            });
        } else {
            return handleCreate({
                createMutation: createVisaChecklist,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaChecklistSlice,
                endpoint: 'getVisaChecklist',
            });
        }
    };

    // const handleDelete = (row: any) => {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: 'Are you sure?',
    //         text: `You want to delete ${row.country}`,
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

    // const handleSubmit = (value: any) => {
    //     if (value.country == '' || value.country == null) {
    //         showMessage('Select country ', 'error');
    //         return false;
    //     }
    //     if (value.type == '' || value.type == null) {
    //         showMessage('Select Visa type', 'error');
    //         return false;
    //     }
    //     if (value.embassy == '' || value.embassy == null) {
    //         showMessage('Select Embassy Location', 'error');
    //         return false;
    //     }
    //     if (value.id) {
    //         //update user
    //         let formData: any = data.find((d: any) => d.id === value.id);
    //         formData.country = value.country;
    //         formData.type = value.type;
    //         formData.embassy = value.embassy;
    //         formData.checklist = value.checklist;
    //         formData.fee = value.fee;
    //         formData.form = value.form;

    //         return formData;
    //     } else {
    //         //add user
    //         let maxUserId = data.length ? data.reduce((max: any, character: any) => (character.id > max ? character.id : max), data[0].id) : 0;

    //         let formData = {
    //             id: +maxUserId + 1,
    //             country: value.country,
    //             type: value.type,
    //             embassy: value.embassy,
    //             checklist: value.checklist,
    //             fee: value.fee,
    //             form: value.form,
    //         };
    //         setData([...data, formData]);
    //         return formData;
    //     }
    // };

    return (
        <>
            <TableLayout
                title="Visa Checklist"
                data={items}
                meta={meta}
                tableColumns={tableColumns}
                ActionModal={VisaChecklistActionModal}
                handleDelete={handleDeleteVisaChecklist}
                exportColumns={exportColumns}
                filterby={['country', 'type', 'embassy']}
                handleSubmit={handleSubmit}
                setSearch={setSearch}
                setPage={setPage}
                setLimit={setLimit}
            />
        </>
    );
};

export default VisaChecklist;
