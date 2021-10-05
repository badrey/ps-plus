const {getApiRequest, search, categoryStrandResponseToTitles} = require("./responseApi");

const PAGE_SIZE = 11;

function getCategoryStrandApiRequest({categoryId, size, offset}) {
    return getApiRequest({
        operationName: "categoryStrandRetrieve",
        variables: {
            id: categoryId,
            pageArgs: {size, offset},
            maxResults: null,
        },
        extensions: {
            persistedQuery: {
                version: 1,
                sha256Hash:
                    "3d034d23d4f6f6fc5c93c796ab96f8e98c48d164ee65365e6d0ef6dea06e6401",
            },
        },
    });
}

function categoryStrandSearch({storeLocale, categoryId, size, offset}) {
    if (!storeLocale || !categoryId) {
        return null;
    }
    const apiRequest = getCategoryStrandApiRequest({categoryId, size, offset});
    return search(apiRequest, storeLocale);
}

async function getTitles({storeLocale, containerId, pageSize, start}) {
    const response = await categoryStrandSearch({
        storeLocale,
        categoryId: containerId,
        size: pageSize,
        offset: start,
    });

    return categoryStrandResponseToTitles(response);
}

async function getAllPsPlusTitles(storeLocale) {
    return getTitles({
        storeLocale,
        containerId: "7952068b-53fb-42fd-8315-1a6e3d21765a",
        pageSize: PAGE_SIZE,
        start: 0,
    });
}

module.exports = {
    getAllPsPlusTitles,
};
