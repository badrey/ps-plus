import {COLORS} from "../common/colors";

class ColorsService {
    _primaryColor: string = COLORS.DARK_GREY;

    _primaryFadedColor: string = COLORS.DARK_GREY_FADED;

    _secondaryColor: string = COLORS.GREY;

    _secondaryFadedColor: string = COLORS.GREY_FADED;

    _ternaryColor: string = COLORS.LIGHT_GREY;

    _backgroundColor: string = COLORS.BACKGROUND;

    _backgroundFadedColor: string = COLORS.BACKGROUND_FADED;

    get primaryColor() {
        return this._primaryColor;
    }

    set primaryColor(color: string) {
        this._primaryColor = color;
    }

    get primaryFadedColor() {
        return this._primaryFadedColor;
    }

    set primaryFadedColor(color: string) {
        this._primaryFadedColor = color;
    }

    get secondaryColor() {
        return this._secondaryColor;
    }

    set secondaryColor(color: string) {
        this._secondaryColor = color;
    }

    get secondaryFadedColor() {
        return this._secondaryFadedColor;
    }

    set secondaryFadedColor(color: string) {
        this._secondaryFadedColor = color;
    }

    get ternaryColor() {
        return this._ternaryColor;
    }

    set ternaryColor(color: string) {
        this._ternaryColor = color;
    }

    get backgroundColor() {
        return this._backgroundColor;
    }

    set backgroundColor(color: string) {
        this._backgroundColor = color;
    }

    get backgroundFadedColor() {
        return this._backgroundFadedColor;
    }

    set backgroundFadedColor(color: string) {
        this._backgroundFadedColor = color;
    }
}

const colorsService = new ColorsService();
export {colorsService};
