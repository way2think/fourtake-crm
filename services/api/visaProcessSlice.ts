import { generateURLWithPagination } from '@/utils/rtk-http';
import { apiSlice } from './apiSlice';

export const visaProcessSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createVisaApplicant: build.mutation({
            query: ({ body }) => ({
                method: 'POST',
                url: `/visa-process`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: [{ type: 'visaProcess', id: 'LIST' }],
        }),
        getVisaApplicants: build.query({
            providesTags: (result, error, arg) =>
                result ? [{ type: 'visaProcess', id: 'LIST' }, ...result.items.map(({ id }: { id: any }) => ({ type: 'visaProcess', id }))] : [{ type: 'visaProcess', id: 'LIST' }],
            query: (args) => {
                const url = generateURLWithPagination({
                    endpoint: '/visa-process',
                    page: args?.page,
                    limit: args?.limit,
                    sortField: args?.sortField,
                    sortOrder: args?.sortOrder,
                    search: args?.search,
                    filter: args?.filter,
                    showDeleted: args?.showDeleted,
                    filterByLeadid: args?.filterByLeadid,
                });
                // console.log('args', args);
                console.log('url1', url);

                return {
                    method: 'GET',
                    url,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
        }),
        getOneVisaApplicantGroup: build.query({
            query: (id) => ({
                method: 'GET',
                url: `/visa-process/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: (result, error, id) => [{ type: 'visaProcess', id }],
        }),

        updateVisaApplicantGroup: build.mutation({
            query: ({ id, body }) => ({
                method: 'PUT',
                url: `/visa-process/${encodeURIComponent(id)}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: (result, error, { id }) => {
                console.log('result of applicant update', id);
                const decodedId = decodeURIComponent(id);

                return [{ type: 'visaProcess', id:decodedId }];
            },
        }),
        deleteApplicant: build.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/visa-process/delete/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'visaProcess', id }],
        }),

        deleteGroup: build.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/visa-process/delete-group/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'visaProcess', id }],
        }),
        restoreApplicant: build.mutation({
            query: ({ id }) => {
                console.log('id in slice', id);
                return {
                    method: 'PATCH',
                    url: `/visa-process/restore/${id}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'visaProcess', id }],
        }),

        restoreGroup: build.mutation({
            query: ({ id }) => ({
                method: 'PATCH',
                url: `/visa-process/restore-group/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'visaProcess', id }],
        }),
    }),
});

export const {
    useCreateVisaApplicantMutation,
    useUpdateVisaApplicantGroupMutation,
    useGetVisaApplicantsQuery,
    useLazyGetVisaApplicantsQuery,
    useGetOneVisaApplicantGroupQuery,
    useDeleteApplicantMutation,
    useDeleteGroupMutation,
    useRestoreApplicantMutation,
    useRestoreGroupMutation,
} = visaProcessSlice;
