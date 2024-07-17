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
        }),
        getVisaTypes: build.query({
            query: () => ({
                method: 'GET',
                url: '/cms/visa-type',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
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
        }),
    }),
});

export const { useCreateVisaTypeMutation, useGetVisaTypesQuery, useUpdateVisaTypeMutation, useDeleteVisaTypeMutation } = visaTypeSlice;
