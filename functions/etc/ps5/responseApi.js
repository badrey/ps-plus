const https = require("https");
const fetch = require("node-fetch");

const agent = new https.Agent({keepAlive: true});
const apiBase = "https://web.np.playstation.com/api/graphql/v1/op";

function getApiRequest({operationName, variables, extensions}) {
    return `${apiBase}?operationName=${operationName}&variables=${JSON.stringify(
        variables
    )}&extensions=${JSON.stringify(extensions)}`;
}

function search(searchUrl, locale, retriesCount = 0) {
    return fetch(searchUrl, {
        headers: {
            "x-psn-store-locale-override": locale,
        },
        agent,
    }).then(
        (response) => {
            if (response.ok) {
                return response.json();
            }
            if (response.status === 406 && retriesCount < 3) {
                // sleep and retry
                return new Promise((resolve) =>
                    setTimeout(
                        () => resolve(search(searchUrl, locale, retriesCount + 1)),
                        997 * (retriesCount + 1)
                    )
                );
            }
            console.error(
                `Error ${response.status} with text ${response.statusText} during request to ${searchUrl} with locale: ${locale}`
            );
            throw new Error(JSON.stringify(response));
        },
        (error) => {
            throw error;
        }
    );
}

function categoryStrandResponseToTitles(response) {
    const emptyArray = [];
    if (!response || !response.data || !response.data.categoryStrandRetrieve) {
        return emptyArray;
    }
    const products = response.data.categoryStrandRetrieve.products;
    if (!products) {
        return emptyArray;
    }

    return products.map((product) => product.id);
}

module.exports = {
    getApiRequest,
    search,
    categoryStrandResponseToTitles,
};
