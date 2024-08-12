import { generateURLWithPagination } from '@/utils/rtk-http';
import { apiSlice } from './apiSlice';

export const centerSlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply', // dev env, That is probably due to hot module reloading reloading the file when you apply changes to it.
    endpoints: (build) => ({
        getCenters: build.query({
            // providesTags: (result, error, arg) =>
            //     result ? [{ type: 'Center', id: 'LIST' }, ...result.items.map(({ id }: { id: any }) => ({ type: 'Center', id }))] : [{ type: 'Center', id: 'LIST' }],
            query: () => {
                return {
                    method: 'GET',
                    url: '/center',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
        }),
    }),
});

export const { useGetCentersQuery } = centerSlice;
