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
import LoadingSpinner from '@/components/Reusable/LoadingSpinner/LoadingSpinner';

const Country: React.FC = () => {
    const [createCountry, { isLoading: isCreateLoading }] = useCreateCountryMutation();
    const [updateCountry, { isLoading: isUpdateLoading }] = useUpdateCountryMutation();
    const [deleteCountry, { isLoading: isDeleteLoading }] = useDeleteCountryMutation();

    const { page, limit, sortField, sortOrder, search, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10 });

    const { data: countries, isFetching, isLoading } = useGetCountriesQuery({ page, limit, sortField, sortOrder, search });
    const { items = [], meta = {} } = countries || {};

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        { accessor: 'name', textAlign: 'left', title: 'Country Name' },
    ];

    const exportColumns = ['id', 'name'];

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
            {(isLoading || isCreateLoading || isUpdateLoading || isDeleteLoading) && <LoadingSpinner />}

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
