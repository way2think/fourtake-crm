const getData = async ({ url }) => {
    const res = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            Authorization:
                'Bearer ' +
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0Mjk1ZDIxLTIxOGMtNDFiNC1hOTYyLTE0MGNiOWMxMTQyOCIsImVtYWlsIjoia3NhbmpheTAwMTk3QGdtYWlsLmNvbSIsInBob25lIjoiODQyODA2NjcxMyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIiwiaWF0IjoxNzE3NjYxNjAyLCJleHAiOjE3MTc2NjI1MDIsImF1ZCI6ImZvdXJ0YWtlLXZpc2FzIiwiaXNzIjoiRm91cnRha2UgVmlzYSIsInN1YiI6IjI0Mjk1ZDIxLTIxOGMtNDFiNC1hOTYyLTE0MGNiOWMxMTQyOCJ9.8Y4DKmGpxTJrHXXXOJ3gqAG9xb-7RqQJmlUVeE7qJIE',
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();

    // console.log('res: ', res);

    if (res.status >= 200 && res.status < 300) {
        console.log('result-data: ', data);
        return {
            data,
            isError: false,
        };
    } else if (res.status === 401) {
        // get new access token & refresh token or logout
        // and then call the api
        return { data };
    } else {
        // errors
        return {
            data,
            isError: true,
        };
    }
};

export { getData };
