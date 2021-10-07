/**
 * Функция запроса к серверу работает с форматом JSON
 */
export const serviceJson = async (address, body, method, errorBackHandler) => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
    let serverAddress = address || '/';
    if (body) {
        serverAddress = `${serverAddress}?`;
        const fields = Object.keys(body);
        fields.forEach((field, index) => {
            serverAddress = `${serverAddress}${field}=${body[field]}${index === fields.length - 1 ? '' : ','}`
        });
    }
    const params = {
        method: 'GET',
        headers: new Headers(headers)
    };
    const response = await fetch(serverAddress, params).catch((e) => {throw e});
    return (response.ok && await response.json()) || (errorBackHandler && errorBackHandler(response));
};
