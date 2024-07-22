import { apiSlice } from '../apiSlice';

export const visaChecklistSlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply', // dev env, That is probably due to hot module reloading reloading the file when you apply changes to it.
    endpoints: (build) => ({
        createVisaChecklist: build.mutation({
            query: ({ body }) => ({
                method: 'POST',
                url: `/cms/visa-checklist`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
        }),
        getVisaChecklist: build.query({
            query: () => ({
                method: 'GET',
                url: '/cms/visa-checklist',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updateVisaChecklist: build.mutation({
            query: ({ id, body }) => ({
                method: 'PATCH',
                url: `/cms/visa-checklist/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
        }),
        deleteVisaChecklist: build.mutation({
            query: (id) => {
                return {
                    method: 'DELETE',
                    url: `/cms/visa-checklist/${id}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
        }),
    }),
});

export const { useCreateVisaChecklistMutation, useGetVisaChecklistQuery, useDeleteVisaChecklistMutation, useUpdateVisaChecklistMutation } = visaChecklistSlice;
