export const mockFetchResponse = (ok: boolean, data: any, status = 200, statusText = "OK"): Response =>
    ({
        ok,
        status,
        statusText,
        headers: new Headers(),
        redirected: false,
        type: "basic",
        url: "http://localhost:9090/todos",
        json: () => Promise.resolve(data),
    } as Response);
