import * as React from "react";
import {ScrollView, View} from "react-native";
import {titleDetailsSceneStyles as styles} from "./styles";
import {SectionHeader} from "../../components/SectionHeader/SectionHeader";
import {TitlePriceSection} from "./components/TitlePriceSection";
import {TitleInfoSection} from "./components/TitleInfoSection";
import {TitleDetailsSection} from "./components/TitleDetailsSection";
import {TitleDescriptionSection} from "./components/TitleDescriptionSection";
import {NavigationProps} from "../types";
import {commonStyles} from "../styles";
import {Title} from "../../model/types";
import {TitleThumbnail} from "../../components/tiles/TitleThumbnail";
import {largeThumbnailSize} from "../../services/images-caching";
import {AppHeader} from "../AppHeader/AppHeader";

type TitleDetailsSceneProps = NavigationProps;

export const TitleDetailsSceneBase = ({title}: {title: Title}) => {
    const scrollViewRef = React.useRef<ScrollView>(null);
    const scrollToDescSection = React.useRef(false);
    const onDescSectionLayout = React.useCallback(
        ({nativeEvent: {layout}}) => {
            if (scrollViewRef.current && scrollToDescSection.current) {
                scrollViewRef.current.scrollTo({
                    x: 0,
                    y: layout.y,
                    animated: true,
                });
            }
            scrollToDescSection.current = false;
        },
        [scrollToDescSection, scrollViewRef]
    );

    const onDescSectionExpand = React.useCallback(() => {
        scrollToDescSection.current = true;
    }, [scrollToDescSection]);
    const {name} = title;
    return (
        <>
            <AppHeader />
            <ScrollView
                contentContainerStyle={commonStyles.paddingHorizontal}
                ref={scrollViewRef}
                style={styles.container}
            >
                <>
                    <SectionHeader main header={name} />
                    <TitleInfoSection title={title} />
                    <View>
                        <TitleThumbnail
                            size={largeThumbnailSize}
                            thumbnailUrl={title.thumbnailUrl}
                        />
                    </View>
                    <TitlePriceSection title={title} />
                    <TitleDetailsSection title={title} />
                    <TitleDescriptionSection
                        title={title}
                        onLayout={onDescSectionLayout}
                        onSeeMore={onDescSectionExpand}
                    />
                </>
            </ScrollView>
        </>
    );
};

export const TitleDetailsScene = React.memo<TitleDetailsSceneProps>(
    ({route}: TitleDetailsSceneProps) => {
        return <TitleDetailsSceneBase title={route.params?.title ?? {}} />;
    }
);
