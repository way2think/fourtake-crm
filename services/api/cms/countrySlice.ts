import { generateURLWithPagination } from '@/utils/rtk-http';
import { apiSlice } from '../apiSlice';

export const countrySlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply', // dev env, That is probably due to hot module reloading reloading the file when you apply changes to it.
    endpoints: (build) => ({
        createCountry: build.mutation({
            query: ({ body }) => ({
                method: 'POST',
                url: `/cms/country`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: [{ type: 'Country', id: 'LIST' }],
        }),
        getCountries: build.query({
            providesTags: (result, error, arg) => (result ? [{ type: 'Country', id: 'LIST' }, ...result.items.map(({ id }) => ({ type: 'Country', id }))] : [{ type: 'Country', id: 'LIST' }]),
            query: (args) => {
                const url = generateURLWithPagination({
                    endpoint: '/cms/country',
                    page: args?.page,
                    limit: args?.limit,
                    sortField: args?.sortField,
                    sortOrder: args?.sortOrder,
                    search: args?.search,
                    filter: args?.filter,
                });

                return {
                    method: 'GET',
                    url,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
        }),
        updateCountry: build.mutation({
            query: ({ id, body }) => ({
                method: 'PATCH',
                url: `/cms/country/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Country', id }],
        }),
        deleteCountry: build.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/cms/country/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Country', id }],
        }),
    }),
});

export const { useCreateCountryMutation, useGetCountriesQuery, useUpdateCountryMutation, useDeleteCountryMutation } = countrySlice;
