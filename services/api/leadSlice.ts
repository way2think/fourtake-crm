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
    }),
});

export const { useGetLeadsQuery } = leadSlice;
