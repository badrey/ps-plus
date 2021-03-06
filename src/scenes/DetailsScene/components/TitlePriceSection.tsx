import * as React from "react";
import {View, Text, TextStyle} from "react-native";
import {priceStyles, sharedStyles} from "./styles";
import {TitlePriceInfo} from "../../../components";
import {lDateTime} from "../../../services/localization-service";
import {ROPriceInfo, Title} from "../../../model/types";
import {extractPriceDates} from "../../../model/prices-api";

type TitlePriceSectionProps = {
    readonly title?: Title;
};

class TitlePriceSection extends React.PureComponent<TitlePriceSectionProps> {
    extractPriceDates(
        priceInfo: ROPriceInfo
    ): {end: string; start: string; style: TextStyle} | null | undefined {
        const priceDates = extractPriceDates(priceInfo);
        if (!priceDates) return null;
        return {
            start: priceDates.start,
            end: priceDates.end,
            style: priceDates.isPlus
                ? sharedStyles.psPlusTextColor
                : sharedStyles.discountTextColor,
        };
    }

    render() {
        const {title} = this.props;
        if (!title?.priceInfo) {
            return null;
        }
        const {priceInfo} = title;

        const priceDates = priceInfo && this.extractPriceDates(priceInfo);
        return (
            <View style={sharedStyles.sectionContainer}>
                {priceInfo && (
                    <TitlePriceInfo priceInfo={priceInfo} styles={priceStyles} />
                )}
                {priceDates && (
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={5}
                        style={[sharedStyles.noteText]}
                    >
                        {`This price is only available from ${lDateTime(
                            priceDates.start
                        )} to ${lDateTime(priceDates.end)}.`}
                    </Text>
                )}
            </View>
        );
    }
}

export {TitlePriceSection};
