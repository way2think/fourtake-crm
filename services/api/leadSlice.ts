import { apiSlice } from './apiSlice';

export const leadSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getLeads: build.query({
            query: () => ({
                method: 'GET',
                url: '/lead',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        deleteLead: build.mutation({
            query: (id) => {
                return {
                    method: 'DELETE',
                    url: `/lead/${id}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
        }),
        createLead: build.mutation({
            query: ({ body }) => ({
                method: 'POST',
                url: `/lead`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
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
        }),
    }),
});

export const { useCreateLeadMutation, useUpdateLeadMutation, useGetLeadsQuery, useDeleteLeadMutation } = leadSlice;
