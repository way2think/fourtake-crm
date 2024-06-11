const getData = async ({ url }) => {
    const res = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            Authorization:
                'Bearer ' +
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0Mjk1ZDIxLTIxOGMtNDFiNC1hOTYyLTE0MGNiOWMxMTQyOCIsImVtYWlsIjoia3NhbmpheTAwMTk3QGdtYWlsLmNvbSIsInBob25lIjoiODQyODA2NjcxMyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIiwiaWF0IjoxNzE3NjczNjg0LCJleHAiOjE3MTc2NzQ1ODQsImF1ZCI6ImZvdXJ0YWtlLXZpc2FzIiwiaXNzIjoiRm91cnRha2UgVmlzYSIsInN1YiI6IjI0Mjk1ZDIxLTIxOGMtNDFiNC1hOTYyLTE0MGNiOWMxMTQyOCJ9.09HwYysx3MjpT1bjVAQ9sSoXj8PJgZByBIfDr-CIdJI',
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();


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
