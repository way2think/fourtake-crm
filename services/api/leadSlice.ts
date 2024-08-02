import { generateURLWithPagination } from '@/utils/rtk-http';
import { apiSlice } from './apiSlice';

export const leadSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createLead: build.mutation({
            query: ({ body }) => ({
                method: 'POST',
                url: `/lead`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: [{ type: 'Lead', id: 'LIST' }],
        }),
        getLeads: build.query({
            providesTags: (result, error, arg) => (result ? [{ type: 'Lead', id: 'LIST' }, ...result.items.map(({ id }: { id: any }) => ({ type: 'Lead', id }))] : [{ type: 'Lead', id: 'LIST' }]),
            query: (args) => {
                const url = generateURLWithPagination({
                    endpoint: '/lead',
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
        updateLead: build.mutation({
            query: ({ id, body }) => ({
                method: 'PATCH',
                url: `/lead/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Lead', id }],
        }),
        deleteLead: build.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/lead/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Lead', id }],
        }),
    }),
});

export const { useCreateLeadMutation, useUpdateLeadMutation, useGetLeadsQuery, useDeleteLeadMutation } = leadSlice;
