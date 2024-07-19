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
    }),
});

export const { useGetLeadsQuery, useDeleteLeadMutation } = leadSlice;
