"use strict";
function getTitleIds(response) {
    // ChihiroFacetedSearchResponse
    if (!response || !response.links || !response.links.length) {
        return [];
    }
    return response.links.map((link) => link.id);
}

module.exports = {
    getTitleIds,
};
