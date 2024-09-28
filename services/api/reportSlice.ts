import { generateURLWithPagination } from '@/utils/rtk-http';
import { apiSlice } from './apiSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user.store';

export const reportSlice = apiSlice.injectEndpoints({
    overrideExisting: (module as any).hot?.status() === 'apply', // dev env, That is probably due to hot module reloading reloading the file when you apply changes to it.
    endpoints: (build) => ({
        getDailyReport: build.query({
            query: (args) => {
                const url = generateURLWithPagination({
                    endpoint: `/report/daily-report`,
                    page: args?.page,
                    limit: args?.limit,
                    sortField: args?.sortField,
                    sortOrder: args?.sortOrder,
                    search: args?.search,
                    filter: args?.filter,
                    filterByCenter: args?.filterByCenter,
                    filterByUser: args?.filterByUser,
                    fromDate: args?.fromDate,
                    toDate: args?.toDate,
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
        getOutScanReport: build.query({
            query: (args) => {
                const url = generateURLWithPagination({
                    endpoint: `/report/outscan-report`,
                    page: args?.page,
                    limit: args?.limit,
                    sortField: args?.sortField,
                    sortOrder: args?.sortOrder,
                    filterByCenter: args?.filterByCenter,
                    fromDate: args?.fromDate,
                    toDate: args?.toDate,
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
        getInScanReport: build.query({
            query: (args) => {
                const url = generateURLWithPagination({
                    endpoint: `/report/inscan-report`,
                    page: args?.page,
                    limit: args?.limit,
                    sortField: args?.sortField,
                    sortOrder: args?.sortOrder,
                    filterByCenter: args?.filterByCenter,
                    fromDate: args?.fromDate,
                    toDate: args?.toDate,
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
    }),
});

export const { useGetDailyReportQuery, useLazyGetDailyReportQuery ,useLazyGetOutScanReportQuery,useLazyGetInScanReportQuery} = reportSlice;
