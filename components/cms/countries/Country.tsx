'use client';

import React from 'react';
import TableLayout from '@/components/layouts/table-layout';
import CountryActionModal from './CountryActionModal';
import { showMessage } from '@/utils/notification';
import { countrySlice, useCreateCountryMutation, useDeleteCountryMutation, useGetCountriesQuery, useUpdateCountryMutation } from '@/services/api/cms/countrySlice';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';
import type { Country as CountryEntity } from '@/entities/country.entity';
import { usePaginationOptions } from '@/hooks/usePaginationOptions';

const Country: React.FC<{ countrydata: any }> = ({ countrydata }) => {
    const [createCountry, {}] = useCreateCountryMutation();
    const [updateCountry, {}] = useUpdateCountryMutation();
    const [deleteCountry, {}] = useDeleteCountryMutation();

    const { page, limit, sortField, sortOrder, search, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10 });

    const { data: countries, isFetching, isLoading } = useGetCountriesQuery({ page, limit, sortField, sortOrder, search });
    const { items = [], meta = {} } = countries || {};

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        { accessor: 'name', textAlign: 'left', title: 'Country Name' },
    ];

    const exportColumns = ['id', 'name'];

    // const handleDelete = async (country: Country) => {
    //     const result = await Swal.fire({
    //         icon: 'warning',
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         showCancelButton: true,
    //         confirmButtonText: 'Delete',
    //         padding: '2em',
    //         customClass: 'sweet-alerts',
    //     });

    //     if (result.value) {
    //         const { id } = country;
    //         // console.log('id: ', id);
    //         const res = (await deleteCountry(id)) as any;
    //         if ('error' in res) {
    //             // if (isFetchBaseQueryError(res.error)) {
    //             //     console.log('FetchBaseQueryError data: ', res.error.data);
    //             //     Swal.fire({ title: `${res.error.data?.error || 'Error'}!`, text: `${res.error.data?.message || 'Please try after sometime'}`, icon: 'error', customClass: 'sweet-alerts' });
    //             // } else if (isSerializedError(res.error)) {
    //             //     console.log('SerializedError message: ', res.error.message);
    //             // } else {
    //             //     console.log('Unknown error: ', res.error);
    //             // }
    //             await Swal.fire({ title: `${res.error.data?.error || 'Error'}!`, text: `${res.error.data?.message || 'Please try after sometime'}`, icon: 'error', customClass: 'sweet-alerts' });
    //             return true;
    //         } else {
    //             // console.log('data: ', res.data);
    //             const filteredCountries = items.filter((item: Country) => item.id !== country.id);
    //             // console.log('filteredCountries: ', filteredCountries);
    //             const updatedObject = {
    //                 items: [...filteredCountries],
    //                 meta: {
    //                     ...meta,
    //                     itemCount: meta.itemCount - 1,
    //                     totalItems: meta.totalItems - 1,
    //                 },
    //             };
    //             handleLocalRTKUpdate({ apiObjectRef: countrySlice, endpoint: 'getCountries', updateReceipe: updatedObject });
    //             Swal.fire({ title: 'Deleted!', text: res.data.message, icon: 'success', customClass: 'sweet-alerts' });
    //             return true;
    //         }
    //     }
    // };

    const handleDeleteCountry = (country: CountryEntity) =>
        handleDelete({
            deleteMutation: deleteCountry,
            item: country,
            items,
            meta,
            handleLocalUpdate: handleLocalRTKUpdate,
            apiObjectRef: countrySlice,
            endpoint: 'getCountries',
        });

    // const handleSubmit = async (value: Country) => {
    //     if (value.name == '' || value.name == null) {
    //         showMessage('Enter country name', 'error');
    //         return false;
    //     }

    //     if (value.id) {
    //         // update user
    //         const result = await Swal.fire({
    //             icon: 'warning',
    //             title: 'Are you sure?',
    //             text: "You won't be able to revert this!",
    //             showCancelButton: true,
    //             confirmButtonText: 'Update',
    //             padding: '2em',
    //             customClass: 'sweet-alerts',
    //         });
    //         if (result.value) {
    //             const res = (await updateCountry({
    //                 id: value.id,
    //                 body: {
    //                     ...value,
    //                 },
    //             })) as any;
    //             if ('error' in res) {
    //                 // if (isFetchBaseQueryError(res.error)) {
    //                 //     console.log('FetchBaseQueryError data: ', res.error.data);
    //                 //     Swal.fire({ title: `${res.error.data?.error || 'Error'}!`, text: `${res.error.data?.message || 'Please try after sometime'}`, icon: 'error', customClass: 'sweet-alerts' });
    //                 // } else if (isSerializedError(res.error)) {
    //                 //     console.log('SerializedError message: ', res.error.message);
    //                 // } else {
    //                 //     console.log('Unknown error: ', res.error);
    //                 // }
    //                 await Swal.fire({ title: `${res.error.data?.error || 'Error'}!`, text: `${res.error.data?.message || 'Please try after sometime'}`, icon: 'error', customClass: 'sweet-alerts' });
    //                 return false;
    //             } else {
    //                 const allItems = [...items];
    //                 const index = allItems.findIndex((item: any) => item.id === value.id);

    //                 allItems[index] = {
    //                     ...allItems[index],
    //                     ...value,
    //                 };

    //                 // console.log('allItems[index]: ', allItems[index]);

    //                 const updatedObject = {
    //                     items: [...allItems],
    //                     meta: {
    //                         ...meta,
    //                         itemCount: meta.itemCount - 1,
    //                         totalItems: meta.totalItems - 1,
    //                     },
    //                 };
    //                 handleLocalRTKUpdate({ apiObjectRef: countrySlice, endpoint: 'getCountries', updateReceipe: updatedObject });
    //                 Swal.fire({ title: 'Updated!', text: res.data.message, icon: 'success', customClass: 'sweet-alerts' });
    //                 return true;
    //             }
    //         }
    //     } else {
    //         // create user
    //         const result = await Swal.fire({
    //             icon: 'warning',
    //             title: 'Are you sure?',
    //             text: "You won't be able to revert this!",
    //             showCancelButton: true,
    //             confirmButtonText: 'Create',
    //             padding: '2em',
    //             customClass: 'sweet-alerts',
    //         });
    //         if (result.value) {
    //             const res = (await createCountry({
    //                 body: {
    //                     ...value,
    //                 },
    //             })) as any;
    //             // console.log('res: ', res?.data?.data?.id);
    //             if ('error' in res) {
    //                 // if (isFetchBaseQueryError(res.error)) {
    //                 //     console.log('FetchBaseQueryError data: ', res.error.data);
    //                 //     Swal.fire({ title: `${res.error.data?.error || 'Error'}!`, text: `${res.error.data?.message || 'Please try after sometime'}`, icon: 'error', customClass: 'sweet-alerts' });
    //                 // } else if (isSerializedError(res.error)) {
    //                 //     console.log('SerializedError message: ', res.error.message);
    //                 // } else {
    //                 //     console.log('Unknown error: ', res.error);
    //                 // }
    //                 await Swal.fire({ title: `${res.error.data?.error || 'Error'}!`, text: `${res.error.data?.message || 'Please try after sometime'}`, icon: 'error', customClass: 'sweet-alerts' });
    //                 return false;
    //             } else {
    //                 const allItems = [...items];
    //                 const newItem = {
    //                     id: res?.data?.data?.id,
    //                     ...value,
    //                 };
    //                 allItems.push(newItem);

    //                 const updatedObject = {
    //                     items: [...allItems],
    //                     meta: {
    //                         ...meta,
    //                         itemCount: meta.itemCount - 1,
    //                         totalItems: meta.totalItems - 1,
    //                     },
    //                 };
    //                 handleLocalRTKUpdate({ apiObjectRef: countrySlice, endpoint: 'getCountries', updateReceipe: updatedObject });
    //                 Swal.fire({ title: 'Created!', text: res.data.message, icon: 'success', customClass: 'sweet-alerts' });
    //                 return true;
    //             }
    //         }
    //     }
    // };

    const handleSubmit = async (value: CountryEntity) => {
        if (value.name === '' || value.name == null) {
            showMessage('Enter country name', 'error');
            return false;
        }
        if (value.id) {
            return handleUpdate({
                updateMutation: updateCountry,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: countrySlice,
                endpoint: 'getCountries',
            });
        } else {
            return handleCreate({
                createMutation: createCountry,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: countrySlice,
                endpoint: 'getCountries',
            });
        }
    };

    return (
        <>
            <TableLayout
                title="Country"
                filterby="name"
                handleDelete={handleDeleteCountry}
                data={items}
                meta={meta}
                tableColumns={tableColumns}
                exportColumns={exportColumns}
                ActionModal={CountryActionModal}
                handleSubmit={handleSubmit}
                setSearch={setSearch}
                setPage={setPage}
                setLimit={setLimit}
            />
        </>
    );
};

export default Country;
