const getData = async ({ endpoint }: { endpoint: string }) => {
    console.log('env', `${process.env.API_BASE_URL}/${endpoint}`);
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/${endpoint}`, {
            method: 'GET',
            headers: {
                Authorization:
                    'Bearer ' +
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkMjY1ZjVhLWU0Y2MtNDlmOC04ZTBlLWMxMmMzMTRiYTJiZSIsImVtYWlsIjoia3NhbmpheTAwMTk3QGdtYWlsLmNvbSIsInBob25lIjoiODQyODA2NjcxMyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIiwicm9sZSI6InN1cGVyX2FkbWluIiwiY2VudGVyIjoxLCJpc19hY3RpdmUiOnRydWUsImlhdCI6MTcyMDQzNjQxNywiZXhwIjoxNzIwNDM3MzE3LCJhdWQiOiJmb3VydGFrZS12aXNhcyIsImlzcyI6IkZvdXJ0YWtlIFZpc2EiLCJzdWIiOiIzZDI2NWY1YS1lNGNjLTQ5ZjgtOGUwZS1jMTJjMzE0YmEyYmUifQ.dl_1aYkSAQGP8ZtUQi81C63diru4UXMddppBSHbrDRs',
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        console.log('data', data);

        if (res.ok) {
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
    } catch (e) {
        console.error('errr', e);
        // return e;
    }

    // if (res.status >= 200 && res.status < 300) {
    //     return {
    //         data,
    //         isError: false,
    //     };
    // } else if (res.status === 401) {
    //     // get new access token & refresh token
    //     // and then call the api, if refresh token, is also giving same error, then user is logged out
    //     return { data, isError: false }; // data
    //     // return { data: null, isError: true, error: data }; // for logout
    // } else {
    //     // errors
    //     return {
    //         data: null,
    //         isError: true,
    //         error: data,
    //     };
    // }
};

export { getData };
