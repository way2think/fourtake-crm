import { generateURLWithPagination } from '@/utils/rtk-http';
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
            invalidatesTags: [{ type: 'EntryType', id: 'LIST' }],
        }),
        getEntryTypes: build.query({
            providesTags: (result, error, arg) =>
                result ? [{ type: 'EntryType', id: 'LIST' }, ...result.items.map(({ id }: { id: any }) => ({ type: 'EntryType', id }))] : [{ type: 'EntryType', id: 'LIST' }],
            query: (args) => {
                const url = generateURLWithPagination({
                    endpoint: '/cms/entry-type',
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
        updateEntryType: build.mutation({
            query: ({ id, body }) => ({
                method: 'PATCH',
                url: `/cms/entry-type/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'EntryType', id }],
        }),
        deleteEntryType: build.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/cms/entry-type/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'EntryType', id }],
        }),
    }),
});

export const { useCreateEntryTypeMutation, useGetEntryTypesQuery, useUpdateEntryTypeMutation, useDeleteEntryTypeMutation } = entryTypeSlice;
