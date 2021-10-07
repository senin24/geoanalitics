/**
 * Функция запроса к серверу работает с форматом JSON
 */
export const serviceJson = async (address, method, body, errorBackHandler) => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
    const serverAddress = address || '/';
    const params = {
        method: method || 'POST',
        headers: new Headers(headers),
        body: JSON.stringify(body),
    };
    const response = await fetch(serverAddress, params).catch((e) => {throw e});
    return (response.ok && await response.json()) || (errorBackHandler && errorBackHandler(response));
};