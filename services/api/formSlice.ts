import { apiSlice } from './apiSlice';

export const formSlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply', // dev env, That is probably due to hot module reloading reloading the file when you apply changes to it.
    endpoints: (build) => ({
        deleteForm: build.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/cms/form/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            // invalidatesTags: (result, error, { id }) => [{ type: 'Form', id }],
        }),
    }),
});

export const { useDeleteFormMutation } = formSlice;
