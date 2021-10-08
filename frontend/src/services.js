/**
 * Функция запроса к серверу работает с форматом JSON
 */

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

export const serviceJson = async (address, body, method, errorBackHandler) => {
    let serverAddress = address || '/';
    if (body) {
        serverAddress = `${serverAddress}?`;
        const fields = Object.keys(body).filter((key)=>body[key]);
        fields.forEach((field, index) => {
            serverAddress = `${serverAddress}${field}=${body[field]}${index === fields.length - 1 ? '' : '&'}`
        });
    }
    const params = {
        method: 'GET',
        headers: new Headers(headers)
    };
    const response = await fetch(serverAddress, params).catch((e) => {throw e});
    return (response.ok && await response.json()) || (errorBackHandler && errorBackHandler(response));
};

export const servicePostJson = async (address, body, method, errorBackHandler) => {
    const serverAddress = address || '/';
    const params = {
        method: 'POST',
        headers: new Headers(headers),
        body: JSON.stringify(body)
    };
    const response = await fetch(serverAddress, params).catch((e) => {throw e});
    return (response.ok && await response.json()) || (errorBackHandler && errorBackHandler(response)) || false;
};
