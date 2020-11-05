import * as React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {TitlePriceInfo} from "./TitlePriceInfo";
import {tileStyles as styles} from "./styles";
import {Title} from "../../model/types";
import {TitleThumbnail} from "./TitleThumbnail";

type Props = {
    onTitleSelected: (arg0: Title) => void;
    title: Title;
};

export const TitleTile = React.memo<Props>((props: Props) => {
    const {title} = props;

    const onTitleSelected = React.useCallback(() => {
        props.onTitleSelected(props.title);
    }, [props]);

    const {name, platforms, priceInfo} = title;
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
                    {priceInfo && <TitlePriceInfo priceInfo={priceInfo} />}
                </>
            </TouchableOpacity>
        </View>
    );
});
