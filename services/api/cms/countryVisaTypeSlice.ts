import { generateURLWithPagination } from '@/utils/rtk-http';
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
            invalidatesTags: [{ type: 'CountryVisaType', id: 'LIST' }],
        }),
        getCountryVisaTypes: build.query({
            providesTags: (result, error, arg) =>
                result ? [{ type: 'CountryVisaType', id: 'LIST' }, ...result.items.map(({ id }: { id: any }) => ({ type: 'CountryVisaType', id }))] : [{ type: 'CountryVisaType', id: 'LIST' }],
            query: (args) => {
                const url = generateURLWithPagination({
                    endpoint: '/cms/country-visa-type',
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
        updateCountryVisaType: build.mutation({
            query: ({ id, body }) => ({
                method: 'PATCH',
                url: `/cms/country-visa-type/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'CountryVisaType', id }],
        }),
        deleteCountryVisaType: build.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/cms/country-visa-type/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'CountryVisaType', id }],
        }),
    }),
});

export const { useGetCountryVisaTypesQuery, useCreateCountryVisaTypeMutation, useUpdateCountryVisaTypeMutation, useDeleteCountryVisaTypeMutation } = countryVisaTypeSlice;
