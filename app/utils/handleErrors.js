export function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function handleServerErrors(response) {
    throw Error(`Server Error${response.statusText}`);
    return response;
}
