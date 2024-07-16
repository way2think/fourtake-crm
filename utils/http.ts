import { THeader, THttp, TOptions, TResponse } from '@/types/api';

const getHeaders = ({ headers = {}, hasFiles = false, setAuthorization = true, accessToken = null }: TOptions) => {
    // this headers will have Content-Type, Authorization with Beared Token also
    const newHeaders: THeader = {
        ...headers,
    };

    if (accessToken && setAuthorization) {
        newHeaders.Authorization = `Bearer ${accessToken}`;
    }

    if (!hasFiles && !newHeaders['Content-Type']) {
        newHeaders['Content-Type'] = 'application/json';
    } else if (hasFiles && !newHeaders['Content-Type']) {
        newHeaders['Content-Type'] = 'multipart/form-data';
    }

    return newHeaders;
};

const getBody = (body: object | string, { hasFiles = false }): BodyInit => {
    if (hasFiles) return body as BodyInit;

    return JSON.stringify(body);
};

const generateUrl = (endpoint: string, options: TOptions) => {
    const API_URL = process.env.API_BASE_URL;

    if (options.url) return options.url;

    if (options.prefix) return API_URL + options.prefix + endpoint;

    return `${API_URL}/${endpoint}`;
};

const http = async ({ method, endpoint, options, body }: THttp): Promise<TResponse> => {
    const payload: RequestInit = {
        method,
        headers: getHeaders(options),
    };

    if (body) {
        payload.body = getBody(body, options);
    }

    const finalUrl = generateUrl(endpoint, options);

    const res = await fetch(finalUrl, payload);

    const data = await res.json();

    if (res.ok) {
        console.log('http-result', data);
        // Handle different response statuses
        return {
            isError: false,
            error: null,
            data,
        };
    } else {
        return {
            isError: true,
            error: data,
            data: null,
        };
    }
};

export { http };
