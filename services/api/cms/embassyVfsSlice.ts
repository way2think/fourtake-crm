import { generateURLWithPagination } from '@/utils/rtk-http';
import { apiSlice } from '../apiSlice';

export const embassyVfsSlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply', // dev env, That is probably due to hot module reloading reloading the file when you apply changes to it.
    endpoints: (build) => ({
        createEmbassyVfs: build.mutation({
            query: ({ body }) => ({
                method: 'POST',
                url: `/cms/embassy-vfs`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
        }),
        getEmbassyVfs: build.query({
            query: (args) => {
                const url = generateURLWithPagination({
                    endpoint: '/cms/embassy-vfs',
                    page: args?.page,
                    limit: args?.limit,
                    sortField: args?.sortField,
                    sortOrder: args?.sortOrder,
                    search: args?.search,
                    filter: args?.filter,
                });
                console.log('url', url);
                return {
                    method: 'GET',
                    url,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
        }),
        updateEmbassyVfs: build.mutation({
            query: ({ id, body }) => ({
                method: 'PATCH',
                url: `/cms/embassy-vfs/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
        }),
        deleteEmbassyVfs: build.mutation({
            query: (id) => {
                console.log('id:: ', id);
                return {
                    method: 'DELETE',
                    url: `/cms/embassy-vfs/${id}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
        }),
    }),
});

export const { useCreateEmbassyVfsMutation, useGetEmbassyVfsQuery, useLazyGetEmbassyVfsQuery, useUpdateEmbassyVfsMutation, useDeleteEmbassyVfsMutation } = embassyVfsSlice;
