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

    const exportColumns = ['country', 'visa_type', 'embassy_vfs'];
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
            accessor: 'visaType',
            textAlign: 'left',
            title: 'Visa type',
            render: (row: any) => {
                return row?.visa_type?.name;
            },
        },
        {
            accessor: 'embassy_vfs',
            textAlign: 'left',
            title: 'Embassy',
            render: (row: any) => {
                if (row?.embassy_vfs && Array.isArray(row.embassy_vfs)) {
                    return row.embassy_vfs.map((obj: any) => obj.name).join(', ');
                }
                return ''; // Return an empty string or a placeholder if `embassy_vfs` is undefined or not an array
            },
        },
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
        console.log('value', value);
        if (value.country == '' || value.country == null) {
            showMessage('Select country ', 'error');
            return false;
        }
        if (value.visa_type == '' || value.visa_type == null) {
            showMessage('Select Visa type', 'error');
            return false;
        }
        if (value.embassy_vfs == '' || value.embassy_vfs == null) {
            showMessage('Select Embassy Location', 'error');
            return false;
        }

        // console.log('value', value);

        // console.log('formdata: ', formData, formData.get('country'));

        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }

        if (value.id) {
            const embassy_vfs = value.embassy_vfs.map((item: any) => item.id);
            value = { ...value, embassy_vfs };
            if (value?.country?.id) {
                value = { ...value, country: value?.country?.id };
            }
            if (value?.visa_type?.id) {
                value = { ...value, visa_type: value?.visa_type?.id };
            }
            console.log('value', embassy_vfs, value);
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
            const embassy_vfs = value.embassy_vfs.map((item: any) => item.id);
            value = { ...value, embassy_vfs };

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
