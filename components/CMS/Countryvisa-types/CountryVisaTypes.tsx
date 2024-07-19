'use client';

import TableLayout from '@/components/layouts/table-layout';
import React from 'react';
import CountryVisaTypeActionModal from '@/components/cms/Countryvisa-types/CountryVisaTypesActionModal';

import { showMessage } from '@/utils/notification';
import {
    countryVisaTypeSlice,
    useCreateCountryVisaTypeMutation,
    useDeleteCountryVisaTypeMutation,
    useGetCountryVisaTypesQuery,
    useUpdateCountryVisaTypeMutation,
} from '@/services/api/cms/countryVisaTypeSlice';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { CountryVisaType } from '@/entities/country-visa-type.entity';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';

const CountryVisaTypes: React.FC = () => {
    const [createCountryVisaType, {}] = useCreateCountryVisaTypeMutation();
    const [updateCountryVisaType, {}] = useUpdateCountryVisaTypeMutation();
    const [deleteCountryVisaType, {}] = useDeleteCountryVisaTypeMutation();
    const { data, isFetching, isLoading } = useGetCountryVisaTypesQuery(undefined);
    const { items = [], meta = {} } = data || {};

    console.log('items', items, data);

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        {
            accessor: 'country',
            textAlign: 'left',
            title: 'Country Name',
            render: (row: any) => {
                return row.country.name;
            },
        },
    ];

    const exportColumns = ['id', 'country', 'type'];

    const handleDeleteCountryVisaType = (countryvisatype: CountryVisaType) =>
        handleDelete({
            deleteMutation: deleteCountryVisaType,
            item: countryvisatype,
            items,
            meta,
            handleLocalUpdate: handleLocalRTKUpdate,
            apiObjectRef: countryVisaTypeSlice,
            endpoint: 'getCountryVisaTypes',
        });

    const handleSubmit = async (value: CountryVisaType) => {
        if (value.type == '' || value.type == null || value.type.length === 0) {
            showMessage('Select VisaTypes', 'error');
            return false;
        }

        if (value.id) {
            return handleUpdate({
                updateMutation: updateCountryVisaType,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: countryVisaTypeSlice,
                endpoint: 'getCountryVisaTypes',
            });
        } else {
            return handleCreate({
                createMutation: createCountryVisaType,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: countryVisaTypeSlice,
                endpoint: 'getCountryVisaTypes',
            });
        }
    };

    // const handleSubmit = (value: any) => {
    //     console.log('value', value);
    //     if (value.visatypes == '' || value.visatypes == null || value.visatypes.length === 0) {
    //         showMessage('Select VisaTypes', 'error');
    //         return false;
    //     }

    //     //edit
    //     let formData: any = data.find((d: any) => d.id === value.id);
    //     formData.visatypes = value.visatypes;
    //     return true;

    //     // else {
    //     //     //add user
    //     //     let maxUserId = data.length ? data.reduce((max: any, character: any) => (character.id > max ? character.id : max), data[0].id) : 0;

    //     //     let formData = {
    //     //         id: +maxUserId + 1,
    //     //         country: value.country,
    //     //         language: value.language,
    //     //         dailingcode: value.dailingcode,
    //     //         capital: value.capital,
    //     //         cities: value.cities,
    //     //         countrydetails: value.countrydetails,
    //     //         climate: value.climate,
    //     //         currency: value.currency,
    //     //         timezone: value.timezone,
    //     //         additionalinfo: value.additionalinfo,
    //     //         website: value.website,
    //     //         ispopular: value.ispopular,
    //     //         isoutsource: value.isoutsource,
    //     //         isjurisdiction: value.isjurisdiction,
    //     //         image: value.image,
    //     //         flag: value.flag,
    //     //     };
    //     //     setData([...data, formData]);
    //     //     return formData;

    //     //     //   searchContacts();
    //     // }

    //     // showMessage('User has been saved successfully.');
    //     // setAddContactModal(false);
    //     // setIsEdit(false);
    // };
    return (
        <>
            <TableLayout
                title="Country Visa Types"
                data={items || []}
                filterby="country"
                totalPages={items?.length || 0}
                handleDelete={handleDeleteCountryVisaType}
                tableColumns={tableColumns}
                exportColumns={exportColumns}
                ActionModal={CountryVisaTypeActionModal}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default CountryVisaTypes;
