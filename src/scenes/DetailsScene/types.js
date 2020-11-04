/* @flow */
import type {LanguageCodesType, TitleFileSize, TitleRating} from "../../api";

export type TitleData = {
    +description: string,
    +fileSize: TitleFileSize,
    +genres: $ReadOnlyArray<string>,
    +providerName: string,
    +releaseDate: string,
    +starRating: TitleRating,
    +subtitleLanguageCodes: $ReadOnlyArray<LanguageCodesType>,
    +voiceLanguageCodes: $ReadOnlyArray<LanguageCodesType>,
};
