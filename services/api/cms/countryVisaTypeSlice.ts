import { apiSlice } from '../apiSlice';

export const countryVisaTypeSlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply', // dev env, That is probably due to hot module reloading reloading the file when you apply changes to it.
    endpoints: (build) => ({
        createCountryVisaType: build.mutation({
            query: ({ body }) => ({
                method: 'POST',
                url: `/cms/country-visa-type`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
        }),
        getCountryVisaTypes: build.query({
            query: () => ({
                method: 'GET',
                url: '/cms/country-visa-type',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updateCountryVisaType: build.mutation({
            query: ({ id, body }) => ({
                method: 'PATCH',
                url: `/cms/country-visa-type/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
        }),
        deleteCountryVisaType: build.mutation({
            query: (id) => {
                return {
                    method: 'DELETE',
                    url: `/cms/country-visa-type/${id}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
        }),
    }),
});

export const { useGetCountryVisaTypesQuery, useCreateCountryVisaTypeMutation, useUpdateCountryVisaTypeMutation, useDeleteCountryVisaTypeMutation } = countryVisaTypeSlice;
