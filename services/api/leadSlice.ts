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
                console.log('country details', args.country);
                const url = generateURLWithPagination({
                    endpoint: '/lead',
                    page: args?.page,
                    limit: args?.limit,
                    sortField: args?.sortField,
                    sortOrder: args?.sortOrder,
                    search: args?.search,
                    filter: args?.filter,
                    country: args?.country,
                    status: args?.status,
                    stage: args?.stage,
                    priority: args?.priority,
                    assigned_to: args?.assigned_to,
                    source: args?.source,
                    fromDate: args?.fromDate,
                    toDate: args?.toDate,
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
            invalidatesTags: (result, error, { id }) => {
                // console.log('inval-update: ', result, error, id);

                const decodedId = decodeURIComponent(id);

                return [{ type: 'Lead', id: decodedId }];
            },
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

export const { useCreateLeadMutation, useUpdateLeadMutation, useGetLeadsQuery, useLazyGetLeadsQuery, useDeleteLeadMutation } = leadSlice;
