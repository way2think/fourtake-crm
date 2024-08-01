import { generateURLWithPagination } from '@/utils/rtk-http';
import { apiSlice } from '../apiSlice';

export const visaChecklistSlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply', // dev env, That is probably due to hot module reloading reloading the file when you apply changes to it.
    endpoints: (build) => ({
        createVisaChecklist: build.mutation({
            query: ({ body }) => {
                const bodyFormData = new FormData();
                bodyFormData.append('country', body.country);
                bodyFormData.append('visa_type', body.visa_type);
                bodyFormData.append('embassy_vfs', body.embassy_vfs);
                bodyFormData.append('checklist', body.checklist);
                bodyFormData.append('fee', body.fee);

                if (body.forms) {
                    body.forms.forEach((file: File) => {
                        bodyFormData.append('forms', file);
                    });
                }

                return {
                    url: '/cms/visa-checklist',
                    method: 'POST',
                    body: bodyFormData,
                };
            },
            invalidatesTags: [{ type: 'VisaChecklist', id: 'LIST' }],
        }),
        getVisaChecklist: build.query({
            providesTags: (result, error, arg) =>
                result ? [{ type: 'VisaChecklist', id: 'LIST' }, ...result.items.map(({ id }: { id: any }) => ({ type: 'VisaChecklist', id }))] : [{ type: 'VisaChecklist', id: 'LIST' }],
            query: (args) => {
                const url = generateURLWithPagination({
                    endpoint: '/cms/visa-checklist',
                    page: args?.page,
                    limit: args?.limit,
                    sortField: args?.sortField,
                    sortOrder: args?.sortOrder,
                    search: args?.search,
                    filter: args?.filter,
                });

                return {
                    method: 'GET',
                    url,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
        }),
        updateVisaChecklist: build.mutation({
            query: ({ id, body }) => {
                // method: 'PATCH',
                // url: `/cms/visa-checklist/${id}`,
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body,
                console.log('body: ', body);

                const bodyFormData = new FormData();
                bodyFormData.append('country', body.country);
                bodyFormData.append('visa_type', body.visa_type);
                bodyFormData.append('embassy_vfs', body.embassy_vfs);
                bodyFormData.append('checklist', body.checklist);
                bodyFormData.append('fee', body.fee);

                if (body.forms) {
                    body.forms.forEach((file: File) => {
                        bodyFormData.append('forms', file);
                    });
                }

                return {
                    url: `/cms/visa-checklist/${id}`,
                    method: 'PATCH',
                    body: bodyFormData,
                };
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'VisaChecklist', id }],
        }),
        deleteVisaChecklist: build.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/cms/visa-checklist/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'VisaChecklist', id }],
        }),
    }),
});

export const { useCreateVisaChecklistMutation, useGetVisaChecklistQuery, useDeleteVisaChecklistMutation, useUpdateVisaChecklistMutation } = visaChecklistSlice;
