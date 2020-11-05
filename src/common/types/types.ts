export type LoadingType = keyof typeof LoadingTypes;
export const LoadingTypes = {
    PRELOADING: "PRELOADING",
    INIT: "INIT",
    FACET: "FACET",
    MORE: "MORE",
    FROM_SUGGESTION: "FROM_SUGGESTION",
    NONE: "NONE",
};
