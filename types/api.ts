type THeader = {
    Accept?: string;
    Authorization?: string;
    'Content-Type'?: string;
};

type TResponse = {
    isError: boolean;
    error: object | null;
    data: object | null;
};

type TOptions = {
    prefix?: string;
    url?: string;
    headers?: THeader;
    setAuthorization?: boolean;
    accessToken?: string;
    hasFiles?: boolean;
    showSuccessMsg?: boolean;
};

type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type THttp = {
    method: TMethod;
    url?: string;
    endpoint: string;
    options: TOptions;
    body?: object | string | BodyInit;
};

export type { THeader, TResponse, TOptions, TMethod, THttp };
