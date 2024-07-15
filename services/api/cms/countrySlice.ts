import { apiSlice } from '../apiSlice';

export const countrySlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply', // dev env, That is probably due to hot module reloading reloading the file when you apply changes to it.
    endpoints: (build) => ({
        createCountry: build.mutation({
            query: () => ({
                method: 'POST',
                url: `/cms/country`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getCountries: build.query({
            query: () => ({
                method: 'GET',
                url: '/cms/country',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updateCountry: build.mutation({
            query: ({ id }) => ({
                method: 'PATCH',
                url: `/cms/country/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        deleteCountry: build.mutation({
            query: ({ id }) => {
                console.log('id:: ', id);
                return {
                    method: 'DELETE',
                    url: `/cms/country/${id}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
        }),
    }),
});

export const { useGetCountriesQuery, useDeleteCountryMutation } = countrySlice;
