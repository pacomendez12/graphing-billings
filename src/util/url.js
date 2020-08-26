import Url from 'url-parse';

const parseQueryParams = (url) => {
    const { query } = new Url(url);
    const result = {};
    if (query && query.length > 0) {
        const queryStringWithoutInterrogationSign = query.substring(1);
        const allVariablesTokens = queryStringWithoutInterrogationSign.split("&");

        allVariablesTokens.forEach(stringVar => {
            const [key, value] = stringVar.split("=");
            if (key && value) {
                let parsed;
                try {
                    parsed = JSON.parse(value)
                } catch (e) {
                    parsed = value;
                } finally {
                    result[key] = parsed;
                }
            }
        })
    }
    return result;
}

export { parseQueryParams };