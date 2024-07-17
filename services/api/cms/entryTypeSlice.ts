import { apiSlice } from '../apiSlice';

export const entryTypeSlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply', // dev env, That is probably due to hot module reloading reloading the file when you apply changes to it.
    endpoints: (build) => ({
        createEntryType: build.mutation({
            query: ({ body }) => ({
                method: 'POST',
                url: `/cms/entry-type`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
        }),
        getEntryTypes: build.query({
            query: () => ({
                method: 'GET',
                url: '/cms/entry-type',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updateEntryType: build.mutation({
            query: ({ id, body }) => ({
                method: 'PATCH',
                url: `/cms/entry-type/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
        }),
        deleteEntryType: build.mutation({
            query: (id) => {
                return {
                    method: 'DELETE',
                    url: `/cms/entry-type/${id}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
        }),
    }),
});

export const { useCreateEntryTypeMutation, useGetEntryTypesQuery, useUpdateEntryTypeMutation, useDeleteEntryTypeMutation } = entryTypeSlice;
