'use client';
import TableLayout from '@/components/layouts/table-layout';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { showMessage } from '@/utils/notification';
import CountryVisaURlActionModal from '@/components/CMS/Country_Visa_Urls/CountryVisaURlActionModal';
import {
    countryVisaUrlSlice,
    useCreateCountryVisaUrlMutation,
    useDeleteCountryVisaUrlMutation,
    useGetCountryVisaUrlsQuery,
    useUpdateCountryVisaUrlMutation,
} from '@/services/api/cms/countryVisaUrlSlice';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { CountryVisaUrl } from '@/models/country-visa-url.entity';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';

const CountryVisaURl: React.FC = ({}) => {
    const [createCountryVisaUrl, {}] = useCreateCountryVisaUrlMutation();
    const [updateCountryVisaUrl, {}] = useUpdateCountryVisaUrlMutation();
    const [deleteCountryVisaUrl, {}] = useDeleteCountryVisaUrlMutation();
    const { data, isFetching, isLoading } = useGetCountryVisaUrlsQuery(undefined);
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

    console.log('items', items);

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
        if (value.country == null) {
            showMessage('Select Country', 'error');
            return false;
        }
        if (value.url == '' || value.url == null) {
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
            return handleCreate({
                createMutation: createCountryVisaUrl,
                value,
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
            <TableLayout
                title="Country Visa Urls"
                filterby="country.name"
                handleDelete={handleDeleteCountryVisaUrl}
                data={items}
                totalPages={items?.length || 0}
                tableColumns={tableColumns}
                exportColumns={exportColumns}
                ActionModal={CountryVisaURlActionModal}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default CountryVisaURl;
