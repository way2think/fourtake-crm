import { generateURLWithPagination } from '@/utils/rtk-http';
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
            invalidatesTags: [{ type: 'CountryVisaUrl', id: 'LIST' }],
        }),
        getCountryVisaUrls: build.query({
            providesTags: (result, error, arg) =>
                result ? [{ type: 'CountryVisaUrl', id: 'LIST' }, ...result.items.map(({ id }: { id: any }) => ({ type: 'CountryVisaUrl', id }))] : [{ type: 'CountryVisaUrl', id: 'LIST' }],
            query: (args) => {
                const url = generateURLWithPagination({
                    endpoint: '/cms/country-visa-url',
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
        updateCountryVisaUrl: build.mutation({
            query: ({ id, body }) => ({
                method: 'PATCH',
                url: `/cms/country-visa-url/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: [{ type: 'CountryVisaUrl', id: 'LIST' }],
        }),
        deleteCountryVisaUrl: build.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/cms/country-visa-url/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: [{ type: 'CountryVisaUrl', id: 'LIST' }],
        }),
    }),
});

export const { useGetCountryVisaUrlsQuery, useCreateCountryVisaUrlMutation, useUpdateCountryVisaUrlMutation, useDeleteCountryVisaUrlMutation } = countryVisaUrlSlice;
