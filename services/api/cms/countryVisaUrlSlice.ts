import { apiSlice } from '../apiSlice';

export const countryVisaUrlSlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply', // dev env, That is probably due to hot module reloading reloading the file when you apply changes to it.
    endpoints: (build) => ({
        createCountryVisaUrl: build.mutation({
            query: ({ body }) => ({
                method: 'POST',
                url: `/cms/country-visa-url`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
        }),
        getCountryVisaUrls: build.query({
            query: () => ({
                method: 'GET',
                url: '/cms/country-visa-url',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updateCountryVisaUrl: build.mutation({
            query: ({ id, body }) => ({
                method: 'PATCH',
                url: `/cms/country-visa-url/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
        }),
        deleteCountryVisaUrl: build.mutation({
            query: (id) => {
                return {
                    method: 'DELETE',
                    url: `/cms/country-visa-url/${id}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
        }),
    }),
});

export const { useGetCountryVisaUrlsQuery, useCreateCountryVisaUrlMutation, useUpdateCountryVisaUrlMutation, useDeleteCountryVisaUrlMutation } = countryVisaUrlSlice;
