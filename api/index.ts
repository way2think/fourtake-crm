type ApiObject = {
    endpoint: any;
};

const getData = async ({ endpoint }: ApiObject) => {
    console.log('env', process.env.API_BASE_URL);
    const res = await fetch(`http://${process.env.API_BASE_URL}/${endpoint}`, {
        method: 'GET',
        headers: {
            Authorization:
                'Bearer ' +
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkMjY1ZjVhLWU0Y2MtNDlmOC04ZTBlLWMxMmMzMTRiYTJiZSIsImVtYWlsIjoia3NhbmpheTAwMTk3QGdtYWlsLmNvbSIsInBob25lIjoiODQyODA2NjcxMyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIiwicm9sZSI6InN1cGVyX2FkbWluIiwiY2VudGVyIjoxLCJpc19hY3RpdmUiOnRydWUsImlhdCI6MTcxOTgyNjI4OCwiZXhwIjoxNzE5ODI3MTg4LCJhdWQiOiJmb3VydGFrZS12aXNhcyIsImlzcyI6IkZvdXJ0YWtlIFZpc2EiLCJzdWIiOiIzZDI2NWY1YS1lNGNjLTQ5ZjgtOGUwZS1jMTJjMzE0YmEyYmUifQ.n2h-qFxRT5uVnzeibALkRpIk59OYura1ED6f4E16_JM',
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();

    console.log('data', data);

    if (res.status >= 200 && res.status < 300) {
        return {
            data,
            isError: false,
        };
    } else if (res.status === 401) {
        // get new access token & refresh token
        // and then call the api, if refresh token, is also giving same error, then user is logged out
        return { data, isError: false }; // data
        // return { data: null, isError: true, error: data }; // for logout
    } else {
        // errors
        return {
            data: null,
            isError: true,
            error: data,
        };
    }
};

export { getData };
