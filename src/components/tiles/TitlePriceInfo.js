/* @flow */
import * as React from "react";
import {StyleSheet, Text} from "react-native";
import {priceStyles} from "./styles";
import type {ROPriceInfo} from "../../model/types";

type TitlePriceInfoProps = {
    +priceInfo?: ROPriceInfo,
    +styles?: StyleSheet.Styles,
};

class TitlePriceInfo extends React.PureComponent<TitlePriceInfoProps> {
    render() {
        const {priceInfo} = this.props;
        if (!priceInfo) {
            return null;
        }

        const {plusPrice, nonPlusPrice, freePrice} = priceInfo;
        const plusPriceDisplayValue =
            plusPrice.discountPercentage > nonPlusPrice.discountPercentage &&
            plusPrice.actualDisplay;
        const nonPlusPriceDisplayValue = nonPlusPrice.actualDisplay;
        const isForFree = nonPlusPrice.actualValue === 0;
        const originalDisplayPriceValue =
            (nonPlusPrice.discountPercentage > 0 && nonPlusPrice.originalDisplay) ||
            (plusPrice.discountPercentage > 0 && plusPrice.originalDisplay);
        const _styles = this.props.styles || priceStyles;
        const priceItemsNumber =
            (!!freePrice ? 1 : 0) +
            (plusPriceDisplayValue ? 1 : 0) +
            1 +
            (originalDisplayPriceValue ? 1 : 0);
        return (
            <Text style={_styles.containerText}>
                {!!freePrice && (
                    <Text
                        style={[
                            _styles.freePriceText,
                            freePrice.isPlus && _styles.plusPriceText,
                        ]}
                    >
                        {freePrice.displayName}{" "}
                    </Text>
                )}
                {plusPriceDisplayValue && (
                    <Text style={_styles.plusPriceText}>
                        {plusPriceDisplayValue}
                        {
                            <DiscountPercentage
                                discountPercentage={plusPrice.discountPercentage}
                                style={_styles.discountPercentageText}
                            />
                        }
                        {priceItemsNumber === 4 ? "\n" : " "}
                    </Text>
                )}
                {nonPlusPriceDisplayValue !== originalDisplayPriceValue && (
                    <Text
                        style={[
                            _styles.nonPlusPriceText,
                            nonPlusPrice.discountPercentage > 0 &&
                                _styles.discountedPriceText,
                            isForFree && _styles.freePriceText,
                        ]}
                    >
                        {nonPlusPriceDisplayValue}
                        {
                            <DiscountPercentage
                                discountPercentage={nonPlusPrice.discountPercentage}
                                style={_styles.discountPercentageText}
                            />
                        }
                        {priceItemsNumber === 3 ? "\n" : " "}
                    </Text>
                )}
                {originalDisplayPriceValue && (
                    <Text style={_styles.originalPriceText}>
                        {originalDisplayPriceValue}
                    </Text>
                )}
            </Text>
        );
    }
}

type DiscountPercentageProps = {
    +discountPercentage: number,
    +style: StyleSheet.Styles,
};
const DiscountPercentage = ({discountPercentage, style}: DiscountPercentageProps) => {
    return (
        discountPercentage > 0 &&
        discountPercentage < 100 && <Text style={style}> (-{discountPercentage}%)</Text>
    );
};

export {TitlePriceInfo};
