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
        }),
        getVisaStatuses: build.query({
            query: () => ({
                method: 'GET',
                url: '/cms/visa-status',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
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
        }),
    }),
});

export const { useCreateVisaStatusMutation, useGetVisaStatusesQuery, useUpdateVisaStatusMutation, useDeleteVisaStatusMutation } = visaStatusSlice;
