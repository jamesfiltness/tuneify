export default function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export default function handleServerErrors(response) {
    throw Error(`Server Error${response.statusText}`);
    return response;
}