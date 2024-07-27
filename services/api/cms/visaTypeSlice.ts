import { generateURLWithPagination } from '@/utils/rtk-http';
import { apiSlice } from '../apiSlice';

export const visaTypeSlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply',
    endpoints: (build) => ({
        createVisaType: build.mutation({
            query: ({ body }) => ({
                method: 'POST',
                url: `/cms/visa-type`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: [{ type: 'VisaType', id: 'LIST' }],
        }),
        getVisaTypes: build.query({
            providesTags: (result, error, arg) =>
                result ? [{ type: 'VisaType', id: 'LIST' }, ...result.items.map(({ id }: { id: any }) => ({ type: 'VisaType', id }))] : [{ type: 'VisaType', id: 'LIST' }],
            query: (args) => {
                const url = generateURLWithPagination({
                    endpoint: '/cms/visa-type',
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
        updateVisaType: build.mutation({
            query: ({ id, body }) => ({
                method: 'PATCH',
                url: `/cms/visa-type/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'VisaType', id }],
        }),
        deleteVisaType: build.mutation({
            query: (id) => {
                return {
                    method: 'DELETE',
                    url: `/cms/visa-type/${id}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'VisaType', id }],
        }),
    }),
});

export const { useCreateVisaTypeMutation, useGetVisaTypesQuery, useUpdateVisaTypeMutation, useDeleteVisaTypeMutation } = visaTypeSlice;
