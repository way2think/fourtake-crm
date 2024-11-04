import { SessionAuth } from '@/types/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.API_BASE_URL}`,
        prepareHeaders: async (headers) => {
            const session: SessionAuth | null = await getSession();
            // console.log('session-rtk', session);
            if (session?.user?.accessToken) {
                headers.set('Authorization', `Bearer ${session.user.accessToken}`);
            }
            return headers;
        },
    }),
    tagTypes: ['User', 'Center', 'Country', 'VisaChecklist', 'CountryVisaType', 'EmbassyVfs', 'VisaType', 'VisaStatus', 'EntryType', 'CountryVisaUrl', 'Lead', 'Mail', 'visaProcess', 'Dashboard'],
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (credentials) => ({
                url: '/user/signup',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: credentials,
            }),
        }),
        signinWithEmailAndPassword: builder.mutation({
            query: ({ email, password }) => ({
                url: '/user/login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { email, password },
            }),
        }),
        forgotPassWord: builder.mutation({
            query: ({ email }) => ({
                url: '/user/forgot-password',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { email },
            }),
        }),
        resendVerification: builder.mutation({
            query: ({ email }) => ({
                url: '/user/resend-verfication-email',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { email },
            }),
        }),
        logout: builder.mutation({
            query: ({}) => {
                return {
                    url: '/auth/logout',
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useLogoutMutation, useSigninWithEmailAndPasswordMutation, useSignUpMutation, useForgotPassWordMutation, useResendVerificationMutation } = apiSlice;
