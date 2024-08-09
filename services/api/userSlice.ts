import { generateURLWithPagination } from '@/utils/rtk-http';
import { apiSlice } from './apiSlice';

export const userSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createUser: build.mutation({
            query: ({ body }) => ({
                method: 'POST',
                url: `/user`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
        getUsers: build.query({
            providesTags: (result, error, arg) => (result ? [{ type: 'User', id: 'LIST' }, ...result.items.map(({ id }: { id: any }) => ({ type: 'User', id }))] : [{ type: 'User', id: 'LIST' }]),
            query: (args) => {
                const url = generateURLWithPagination({
                    endpoint: '/user',
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
        updateUser: build.mutation({
            query: ({ id, body }) => ({
                method: 'PATCH',
                url: `/user/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/user/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
        }),
    }),
});

export const { useCreateUserMutation, useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } = userSlice;
