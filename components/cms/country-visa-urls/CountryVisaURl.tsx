'use client';

import TableLayout from '@/components/layouts/table-layout';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { showMessage } from '@/utils/notification';
import CountryVisaURlActionModal from '@/components/cms/country-visa-urls/CountryVisaURlActionModal';
import {
    countryVisaUrlSlice,
    useCreateCountryVisaUrlMutation,
    useDeleteCountryVisaUrlMutation,
    useGetCountryVisaUrlsQuery,
    useUpdateCountryVisaUrlMutation,
} from '@/services/api/cms/countryVisaUrlSlice';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { CountryVisaUrl } from '@/entities/country-visa-url.entity';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';
import { usePaginationOptions } from '@/hooks/usePaginationOptions';
import LoadingSpinner from '@/components/Reusable/LoadingSpinner/LoadingSpinner';

const CountryVisaURl: React.FC = ({}) => {
    const [createCountryVisaUrl, { isLoading: isCreateLoading }] = useCreateCountryVisaUrlMutation();
    const [updateCountryVisaUrl, { isLoading: isUpdateLoading }] = useUpdateCountryVisaUrlMutation();
    const [deleteCountryVisaUrl, { isLoading: isDeleteLoading }] = useDeleteCountryVisaUrlMutation();

    const { page, limit, sortField, sortOrder, search, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10 });

    const { data, isFetching, isLoading } = useGetCountryVisaUrlsQuery({ page, limit, sortField, sortOrder, search });
    const { items = [], meta = {} } = data || {};

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        {
            accessor: 'country',
            textAlign: 'left',
            title: 'Country',
            render: (row: any) => {
                return row.country.name;
            },
        },
        { accessor: 'url', textAlign: 'left', title: 'URL' },
    ];

    const exportColumns = ['id', 'country', 'url'];

    const handleDeleteCountryVisaUrl = (countryVisaUrl: CountryVisaUrl) =>
        handleDelete({
            deleteMutation: deleteCountryVisaUrl,
            item: countryVisaUrl,
            items,
            meta,
            handleLocalUpdate: handleLocalRTKUpdate,
            apiObjectRef: countryVisaUrlSlice,
            endpoint: 'getCountryVisaUrls',
        });

    const handleSubmit = async (value: CountryVisaUrl) => {
        console.log('value', value);
        if (!value.country) {
            showMessage('Select Country', 'error');
            return false;
        }
        if (!value.url) {
            showMessage('Fill URL', 'error');
            return false;
        }

        if (value.id) {
            return handleUpdate({
                updateMutation: updateCountryVisaUrl,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: countryVisaUrlSlice,
                endpoint: 'getCountryVisaUrls',
            });
        } else {
            // pass country object, to create as it expects id inside the object
            const updatedValue = {
                url: value.url,
                country: {
                    id: value.country,
                },
            };
            return handleCreate({
                createMutation: createCountryVisaUrl,
                value: updatedValue,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: countryVisaUrlSlice,
                endpoint: 'getCountryVisaUrls',
            });
        }
    };

    return (
        <>
            {(isLoading || isCreateLoading || isUpdateLoading || isDeleteLoading) && <LoadingSpinner />}

            <TableLayout
                title="Country Visa Urls"
                filterby="country.name"
                data={items}
                meta={meta}
                handleDelete={handleDeleteCountryVisaUrl}
                tableColumns={tableColumns}
                exportColumns={exportColumns}
                ActionModal={CountryVisaURlActionModal}
                handleSubmit={handleSubmit}
                setSearch={setSearch}
                setPage={setPage}
                setLimit={setLimit}
            />
        </>
    );
};

export default CountryVisaURl;
