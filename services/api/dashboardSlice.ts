import { generateURLWithPagination } from '@/utils/rtk-http';
import { apiSlice } from './apiSlice';
import { visaChecklistSlice } from './cms/visaChecklistSlice';

export const dashboardSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getVisaRequirements: build.query({
            providesTags: (result, error, arg) =>
                result ? [{ type: 'Dashboard', id: 'LIST' }, ...result.map(({ id }: { id: any }) => ({ type: 'Dashboard', id }))] : [{ type: 'Dashboard', id: 'LIST' }],
            query: ({ countryId, visaTypeId, stateOfResidence }) => {
                const url = new URL('/check-visa-requirements', process.env.API_BASE_URL); // replace with your API URL

                // Append query parameters
                if (countryId) url.searchParams.append('countryId', countryId);
                if (visaTypeId) url.searchParams.append('visaTypeId', visaTypeId);
                if (stateOfResidence) url.searchParams.append('stateOfResidence', stateOfResidence);

                return {
                    url: url.toString(),
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
        }),
    }),
});

export const { useGetVisaRequirementsQuery } = dashboardSlice;

// export const dashboardSlice = apiSlice.injectEndpoints({
//     endpoints: (build) => ({
//         getVisaRequirements: build.query({
//             providesTags: (result, error, arg) =>
//                 result ? [{ type: 'Dashboard', id: 'LIST' }, ...result.items.map(({ id }: { id: any }) => ({ type: 'Dashboard', id }))] : [{ type: 'Dashboard', id: 'LIST' }],
//             query: (args) => {
//                 const url = generateURLWithPagination({
//                     endpoint: '/check-visa-requirements',
//                     page: args?.page,
//                     limit: args?.limit,
//                     sortField: args?.sortField,
//                     sortOrder: args?.sortOrder,
//                     search: args?.search,
//                     filter: args?.filter,
//                 });

//                 console.log('url', url);

//                 return {
//                     method: 'GET',
//                     url,
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 };
//             },
//         }),
//     }),
// });

// export const { useGetVisaRequirementsQuery } = dashboardSlice;
