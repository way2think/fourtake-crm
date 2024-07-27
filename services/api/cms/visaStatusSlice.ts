import { generateURLWithPagination } from '@/utils/rtk-http';
import { apiSlice } from '../apiSlice';

export const visaStatusSlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply', // dev env, That is probably due to hot module reloading reloading the file when you apply changes to it.
    endpoints: (build) => ({
        createVisaStatus: build.mutation({
            query: ({ body }) => ({
                method: 'POST',
                url: `/cms/visa-status`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: [{ type: 'VisaStatus', id: 'LIST' }],
        }),
        getVisaStatuses: build.query({
            providesTags: (result, error, arg) =>
                result ? [{ type: 'VisaStatus', id: 'LIST' }, ...result.items.map(({ id }: { id: any }) => ({ type: 'VisaStatus', id }))] : [{ type: 'VisaStatus', id: 'LIST' }],
            query: (args) => {
                const url = generateURLWithPagination({
                    endpoint: '/cms/visa-status',
                    page: args?.page,
                    limit: args?.limit,
                    sortField: args?.sortField,
                    sortOrder: args?.sortOrder,
                    search: args?.search,
                    filter: args?.filter,
                });

                console.log('url', url);

                return {
                    method: 'GET',
                    url,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
        }),
        updateVisaStatus: build.mutation({
            query: ({ id, body }) => ({
                method: 'PATCH',
                url: `/cms/visa-status/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'VisaStatus', id }],
        }),
        deleteVisaStatus: build.mutation({
            query: (id) => {
                return {
                    method: 'DELETE',
                    url: `/cms/visa-status/${id}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'VisaStatus', id }],
        }),
    }),
});

export const { useCreateVisaStatusMutation, useGetVisaStatusesQuery, useUpdateVisaStatusMutation, useDeleteVisaStatusMutation } = visaStatusSlice;
