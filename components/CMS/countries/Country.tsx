'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import TableLayout from '@/components/layouts/table-layout';
import CountryActionModal from './CountryActionModal';
import { showMessage } from '@/utils/notification';
import { countrySlice, useDeleteCountryMutation, useGetCountriesQuery } from '@/services/api/cms/countrySlice';
import type { Country } from '@/models/Country';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { isFetchBaseQueryError, isSerializedError } from '@/utils/validator';

const Country: React.FC<{ countrydata: any }> = ({ countrydata }) => {
    const [deleteCountry, { data: isDeleted, isLoading: isDeletedLoading, isError, error }] = useDeleteCountryMutation();
    const { data: countries, isFetching, isLoading } = useGetCountriesQuery(undefined);
    const { items = [], meta = {} } = countries || {};

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    // console.log('countries: ', countries, isFetching, isLoading);
    // console.log('isDeleted: ', isDeleted, isDeletedLoading, isError, error);

    const [data, setData] = useState(countrydata);

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        { accessor: 'name', textAlign: 'left', title: 'Country Name' },
    ];

    const exportColumns = ['id', 'country'];

    const handleDelete = async (country: Country) => {
        const result = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts',
        });

        if (result.value) {
            const { id } = country;
            // console.log('id: ', id);
            const res = (await deleteCountry({ id })) as any;
            if ('error' in res) {
                // if (isFetchBaseQueryError(res.error)) {
                //     console.log('FetchBaseQueryError data: ', res.error.data);
                //     Swal.fire({ title: `${res.error.data?.error || 'Error'}!`, text: `${res.error.data?.message || 'Please try after sometime'}`, icon: 'error', customClass: 'sweet-alerts' });
                // } else if (isSerializedError(res.error)) {
                //     console.log('SerializedError message: ', res.error.message);
                // } else {
                //     console.log('Unknown error: ', res.error);
                // }
                await Swal.fire({ title: `${res.error.data?.error || 'Error'}!`, text: `${res.error.data?.message || 'Please try after sometime'}`, icon: 'error', customClass: 'sweet-alerts' });
                return true;
            } else {
                // console.log('data: ', res.data);
                const filteredCountries = items.filter((item: Country) => item.id !== country.id);
                // console.log('filteredCountries: ', filteredCountries);
                const updatedObject = {
                    items: [...filteredCountries],
                    meta: {
                        ...meta,
                        itemCount: meta.itemCount - 1,
                        totalItems: meta.totalItems - 1,
                    },
                };
                handleLocalRTKUpdate({ apiObjectRef: countrySlice, endpoint: 'getCountries', updateReceipe: updatedObject });
                Swal.fire({ title: 'Deleted!', text: res.data.message, icon: 'success', customClass: 'sweet-alerts' });
                return true;
            }
        }
    };

    const handleSubmit = (value: any) => {
        if (value.country == '' || value.country == null) {
            showMessage('Enter country name', 'error');
            return false;
        }

        console.log('value: ', value);

        // if (value.id) {
        //     //update user
        //     let formData: any = data.find((d: any) => d.id === value.id);
        //     formData.country = value.country;
        //     formData.language = value.language;
        //     formData.dailingcode = value.dailingcode;
        //     formData.capital = value.capital;
        //     formData.cities = value.cities;
        //     formData.countrydetails = value.countrydetails;
        //     formData.climate = value.climate;
        //     formData.currency = value.currency;
        //     formData.timezone = value.timezone;
        //     formData.additionalinfo = value.additionalinfo;
        //     formData.website = value.website;
        //     formData.ispopular = value.ispopular;
        //     formData.isoutsource = value.isoutsource;
        //     formData.isjurisdiction = value.isjurisdiction;
        //     formData.image = value.image;
        //     formData.flag = value.flag;

        //     return formData;
        // } else {
        //     //add user
        //     let maxUserId = data.length ? data.reduce((max: any, character: any) => (character.id > max ? character.id : max), data[0].id) : 0;

        //     let formData = {
        //         id: +maxUserId + 1,
        //         country: value.country,
        //         language: value.language,
        //         dailingcode: value.dailingcode,
        //         capital: value.capital,
        //         cities: value.cities,
        //         countrydetails: value.countrydetails,
        //         climate: value.climate,
        //         currency: value.currency,
        //         timezone: value.timezone,
        //         additionalinfo: value.additionalinfo,
        //         website: value.website,
        //         ispopular: value.ispopular,
        //         isoutsource: value.isoutsource,
        //         isjurisdiction: value.isjurisdiction,
        //         image: value.image,
        //         flag: value.flag,
        //     };
        //     setData([...data, formData]);
        //     return formData;
        // }
    };

    return (
        <>
            <TableLayout
                title="Country"
                setData={setData}
                filterby="country"
                handleDelete={handleDelete}
                data={items}
                totalPages={data?.length || 0}
                tableColumns={tableColumns}
                exportColumns={exportColumns}
                ActionModal={CountryActionModal}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default Country;
