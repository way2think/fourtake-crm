import { generateURLWithPagination } from '@/utils/rtk-http';
import { apiSlice } from './apiSlice';

export const mailSlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply', // dev env, That is probably due to hot module reloading  the file when you apply changes to it.
    endpoints: (build) => ({
        createMail: build.mutation({
            query: ({ body }) => {
                const bodyFormData = new FormData();
                bodyFormData.append('to', body.to);
                bodyFormData.append('from', body.from);
                bodyFormData.append('subject', body.subject);
                bodyFormData.append('visa_checklist', body.visa_checklist);
                bodyFormData.append('addional_info', body.addional_info);
                bodyFormData.append('cc', body.cc);

                if (body.attachments) {
                    body.attachments.forEach((file: File) => {
                        bodyFormData.append('attachments', file);
                    });
                }

                return {
                    method: 'POST',
                    url: '/mail',
                    body: bodyFormData,
                };
            },
            // invalidatesTags: [{ type: 'Mail', id: 'LIST' }],
        }),
    }),
});

export const { useCreateMailMutation } = mailSlice;
