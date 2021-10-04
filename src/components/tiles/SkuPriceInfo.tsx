import * as React from "react";
import {Text, View} from "react-native";
import type {SkuPrice} from "../../model/ps5/response-types";
import {replaceAll} from "../../common/utils";
import {priceStyles} from "./styles/priceStyles";

export const SERVICE_BRANDINGS = {
    PS_PLUS: "PS_PLUS",
    EA_ACCESS: "EA_ACCESS",
    PS_NOW: "PS_NOW",
};

type Props = {
    shortFormat?: boolean;
    skuPrice?: SkuPrice;
    styles?: any;
};

export function extractNumber(str: string): number {
    const n = replaceAll(str, /[^0-9]/, "");
    return Number(n);
}

function getOtherBrandingText(price: SkuPrice, shortFormat: boolean) {
    const {serviceBranding, upsellServiceBranding, upsellText} = price;
    if (!!upsellText) {
        if (shortFormat && upsellText.includes("%")) {
            return null;
        }
        if (serviceBranding || upsellServiceBranding) {
            return upsellText;
        }
    }

    return null;
}

function getBrandingText(price: SkuPrice, branding: string, shortFormat: boolean) {
    const {serviceBranding, upsellServiceBranding, upsellText, discountText} = price;
    const prefix = getBrandingPrefix(branding);
    if (!!upsellText && !!prefix) {
        if (upsellServiceBranding && upsellServiceBranding.includes(branding)) {
            if (upsellText.includes(prefix)) {
                return upsellText;
            }
            return `${prefix}. ${upsellText.trim()}`;
        }
        if (shortFormat && upsellText.includes("%") && !!discountText) {
            return null;
        }
        if (serviceBranding && serviceBranding.includes(branding)) {
            if (shortFormat && !upsellText.includes(prefix)) {
                return `${prefix}. ${upsellText.trim()}`;
            }
            return upsellText.trim();
        }
    }

    return null;
}

function hasBranding(price: SkuPrice, branding: string) {
    const {serviceBranding, upsellText, discountText} = price;
    if (!!upsellText && (!upsellText.includes("%") || !discountText)) {
        return false;
    }
    return serviceBranding && serviceBranding.includes(branding);
}

function getBrandingPrefix(branding: string) {
    switch (branding) {
        case SERVICE_BRANDINGS.PS_PLUS: {
            return "PS Plus";
        }
        case SERVICE_BRANDINGS.EA_ACCESS: {
            return "EA Play";
        }
        case SERVICE_BRANDINGS.PS_NOW: {
            return "PS Now";
        }
    }
    return "";
}

function getPrefixedDiscountedPrice(price: SkuPrice) {
    const {
        discountedPrice,
        serviceBranding,
        upsellServiceBranding,
        upsellText,
        discountText,
    } = price;
    const branding = serviceBranding?.[0] ?? upsellServiceBranding?.[0];
    if (!branding || !!upsellText) {
        return discountedPrice;
    }
    const prefix = getBrandingPrefix(branding);
    if (!prefix || discountedPrice !== discountText) {
        return discountedPrice;
    }
    return `${prefix}. ${discountedPrice}`;
}

export const SkuPriceInfo = React.memo<Props>(
    ({shortFormat, skuPrice, styles}: Props) => {
        const _priceStyles = priceStyles;
        if (!skuPrice) {
            return null;
        }

        const {basePrice, discountText, discountedPrice, isFree} = skuPrice;
        const psPlusText = getBrandingText(
            skuPrice,
            SERVICE_BRANDINGS.PS_PLUS,
            !!shortFormat
        );
        const eaAccessText = getBrandingText(
            skuPrice,
            SERVICE_BRANDINGS.EA_ACCESS,
            !!shortFormat
        );
        const psNowText = getBrandingText(
            skuPrice,
            SERVICE_BRANDINGS.PS_NOW,
            !!shortFormat
        );
        const otherBrandingText =
            !psPlusText &&
            !eaAccessText &&
            !psNowText &&
            getOtherBrandingText(skuPrice, !!shortFormat);
        const hasPsPlusBranding =
            (shortFormat || !psPlusText) &&
            hasBranding(skuPrice, SERVICE_BRANDINGS.PS_PLUS);
        const hasEaBranding =
            (shortFormat || !eaAccessText) &&
            hasBranding(skuPrice, SERVICE_BRANDINGS.EA_ACCESS);
        const hasPsNowBranding =
            (shortFormat || !psNowText) &&
            hasBranding(skuPrice, SERVICE_BRANDINGS.PS_NOW);

        const _styles = styles || _priceStyles;
        const plusStyles = [_priceStyles.plusPriceText, _styles.plusPriceText];
        const eaStyles = [_priceStyles.eaPriceText, _styles.eaPriceText];
        const nowStyles = [_priceStyles.nowPriceText, _styles.nowPriceText];

        const hasBrandingText =
            !!psPlusText || !!eaAccessText || !!psNowText || !!otherBrandingText;
        const notShowPrice =
            hasBrandingText &&
            ((!!discountText && extractNumber(discountText) === 0) ||
                extractNumber(discountedPrice) === 0);
        return (
            <>
                {!!psPlusText && (
                    <Text
                        style={[
                            _priceStyles.containerText,
                            _priceStyles.plusPriceText,
                            ...plusStyles,
                            notShowPrice && _styles.containerTextSize,
                        ]}
                    >
                        {psPlusText}
                    </Text>
                )}
                {!!eaAccessText && (
                    <Text
                        style={[
                            _priceStyles.containerText,
                            _styles.containerText,
                            ...eaStyles,
                            notShowPrice && _styles.containerTextSize,
                        ]}
                    >
                        {eaAccessText}
                    </Text>
                )}
                {!!psNowText && (
                    <Text
                        style={[
                            _priceStyles.containerText,
                            _styles.containerText,
                            ...nowStyles,
                            notShowPrice && _styles.containerTextSize,
                        ]}
                    >
                        {psNowText}
                    </Text>
                )}
                {!!otherBrandingText && (
                    <Text
                        style={[
                            _priceStyles.containerText,
                            _priceStyles.otherPriceText,
                            _styles.containerText,
                            _styles.otherPriceText,
                            notShowPrice && _styles.containerTextSize,
                        ]}
                    >
                        {otherBrandingText}
                    </Text>
                )}
                {!notShowPrice && (
                    <View style={[_priceStyles.container, _styles.container]}>
                        {discountedPrice !== discountText && (
                            <DiscountPercentage
                                discountPercentage={discountText}
                                style={[
                                    _priceStyles.discountPercentageText,
                                    _styles.discountPercentageText,
                                ]}
                            />
                        )}
                        <Text
                            style={[
                                _priceStyles.containerText,
                                _styles.containerText,
                                hasPsPlusBranding && _priceStyles.plusPriceColor,
                                hasEaBranding && _priceStyles.eaPriceColor,
                                hasPsNowBranding && _priceStyles.nowPriceColor,
                            ]}
                        >
                            <Text
                                style={[
                                    _priceStyles.containerText,
                                    _priceStyles.nonPlusPriceText,
                                    isFree && _priceStyles.freePriceText,
                                    !!discountText && _priceStyles.discountedPriceText,
                                    _styles.containerText,
                                    _styles.nonPlusPriceText,
                                    isFree && _styles.freePriceText,
                                    !!discountText && _styles.discountedPriceText,
                                    hasPsPlusBranding && _priceStyles.plusPriceColor,
                                    hasEaBranding && _priceStyles.eaPriceColor,
                                    hasPsNowBranding && _priceStyles.nowPriceColor,
                                ]}
                            >
                                {getPrefixedDiscountedPrice(skuPrice)}{" "}
                                {!!discountText && (
                                    <Text
                                        style={[
                                            _priceStyles.originalPriceText,
                                            _styles.originalPriceText,
                                        ]}
                                    >
                                        {basePrice}
                                    </Text>
                                )}
                            </Text>
                        </Text>
                    </View>
                )}
            </>
        );
    }
);

type DiscountPercentageProps = {
    discountPercentage?: string;
    style: any;
};
const DiscountPercentage = ({discountPercentage, style}: DiscountPercentageProps) => {
    if (!discountPercentage) {
        return null;
    }
    return <Text style={style}>{discountPercentage}</Text>;
};
