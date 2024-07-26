import { apiSlice } from '../apiSlice';

export const visaChecklistSlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply', // dev env, That is probably due to hot module reloading reloading the file when you apply changes to it.
    endpoints: (build) => ({
        createVisaChecklist: build.mutation({
            query: ({ body }) => {
                const bodyFormData = new FormData();
                bodyFormData.append('country', body.country);
                bodyFormData.append('type', body.type);
                bodyFormData.append('embassy', body.embassy);
                bodyFormData.append('checklist', body.checklist);
                bodyFormData.append('fee', body.fee);

                if (body.forms) {
                    body.forms.forEach((file: File) => {
                        bodyFormData.append('forms', file);
                    });
                }

                // console.log('bodyFormData: ', bodyFormData);
                // const entries = bodyFormData.entries();
                // for (let [key, value] of entries) {
                //     console.log(`${key}: ${value}`);
                // }

                return {
                    url: '/cms/visa-checklist',
                    method: 'POST',
                    body: bodyFormData,
                };
            },
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
