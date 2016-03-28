export default function handleError(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}