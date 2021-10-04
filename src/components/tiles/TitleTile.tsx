import * as React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {tileStyles as styles} from "./styles";
import {Title} from "../../model/types";
import {TitleThumbnail} from "./TitleThumbnail";
import {SkuPriceInfo} from "./SkuPriceInfo";
import {SkuPrice} from "../../model/ps5/response-types";

type Props = {
    onTitleSelected: (arg0: Title) => void;
    title: Title;
};

export const TitleTile = React.memo<Props>((props: Props) => {
    const {title} = props;

    const onTitleSelected = React.useCallback(() => {}, [props]);

    const {name, platforms, skuPrices} = title;
    const hasSkuPrice = !!skuPrices?.length;
    return (
        <View style={styles.container}>
            <View style={styles.heartContainer}>
                <TitleThumbnail thumbnailUrl={title.thumbnailUrl} />
            </View>
            <TouchableOpacity
                accessible
                style={styles.priceInfoTouchable}
                onLongPress={onTitleSelected}
                onPress={onTitleSelected}
            >
                <>
                    <Text ellipsizeMode="tail" numberOfLines={2} style={styles.titleText}>
                        {name.trim()} {platforms.map((p) => `[${p}]`)}
                    </Text>
                    {hasSkuPrice
                        ? skuPrices.map((skuPrice: SkuPrice) => (
                              <SkuPriceInfo
                                  shortFormat
                                  key={JSON.stringify(skuPrice)}
                                  skuPrice={skuPrice}
                              />
                          ))
                        : null}
                </>
            </TouchableOpacity>
        </View>
    );
});
