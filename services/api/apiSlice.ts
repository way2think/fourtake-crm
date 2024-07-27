import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.API_BASE_URL}`,
    }),
    tagTypes: ['EmbassyVfs', 'VisaType', 'VisaStatus', 'EntryType'],
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
    }),
});

export const { useSigninWithEmailAndPasswordMutation, useSignUpMutation, useForgotPassWordMutation, useResendVerificationMutation } = apiSlice;
