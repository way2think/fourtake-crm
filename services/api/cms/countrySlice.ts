import { generateURLWithPagination } from '@/utils/rtk-http';
import { apiSlice } from '../apiSlice';

export const countrySlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply', // dev env, That is probably due to hot module reloading reloading the file when you apply changes to it.
    endpoints: (build) => ({
        createCountry: build.mutation({
            query: ({ body }) => {
                const bodyFormData = new FormData();
                Object.entries(body).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        // Ensure value is either a string or Blob before appending
                        if (typeof value === 'string' || value instanceof Blob) {
                            bodyFormData.append(key, value);
                        } else {
                            console.warn(`Value for ${key} is not a string or Blob and will not be appended.`);
                        }
                    }
                });

                return {
                    method: 'POST',
                    url: `/cms/country`,
                    body,
                };
            },
            invalidatesTags: [{ type: 'Country', id: 'LIST' }],
        }),
        getCountries: build.query({
            providesTags: (result, error, arg) =>
                result ? [{ type: 'Country', id: 'LIST' }, ...result.items.map(({ id }: { id: any }) => ({ type: 'Country', id }))] : [{ type: 'Country', id: 'LIST' }],
            query: (args) => {
                const url = generateURLWithPagination({
                    endpoint: '/cms/country',
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
        updateCountry: build.mutation({
            query: ({ id, body }) => {
                const bodyFormData = new FormData();
                // Object.entries(body).forEach(([key, value]) => {
                //     if (value !== undefined && value !== null) {
                //         // Ensure value is either a string or Blob before appending
                //         if (typeof value === 'string' || value instanceof Blob) {
                //             bodyFormData.append(key, value);
                //         } else {
                //             console.warn(`Value for ${key} is not a string or Blob and will not be appended.`);
                //         }
                //     }
                // });

                // for (const key in body) {
                //     if (body.hasOwnProperty(key) && body[key] !== undefined && body[key] !== null) {
                //         bodyFormData.append(key, body[key]);
                //     }
                // }

                if (body.flag) {
                    console.log("inside")
                    bodyFormData.append('flag', body.flag);
                  }
                console.log('bodyFormData', bodyFormData,body.flag);

                return {
                    method: 'PATCH',
                    url: `/cms/country/${id}`,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                    body,
                };
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Country', id }],
        }),
        deleteCountry: build.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/cms/country/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Country', id }],
        }),
    }),
});

export const { useCreateCountryMutation, useGetCountriesQuery, useUpdateCountryMutation, useDeleteCountryMutation } = countrySlice;
