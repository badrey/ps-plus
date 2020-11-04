/* @flow */
import * as React from "react";
import {View} from "react-native";
import {useNavigation, useRoute, useNavigationState} from "@react-navigation/native";
import {IconButton} from "../../components/index";
import {SvgIconNames} from "../../components/icons/SvgIcon";
import {appHeaderStyles as styles} from "./styles";
import {colorsService} from "../../services/colors_service";

type Props = {
    onRightButton?: () => void,
    rightButtonText?: string,
    rightComponent?: React.Node,
};

const AppHeaderBase = React.memo<Props>((props: Props) => {
    const {rightButtonText, rightComponent, onRightButton} = props;
    const navigation = useNavigation();
    const route = useRoute();
    const {prevSceneDisplayName = ""} = route.params ?? {};
    const canGoBack = useNavigationState((state) => state.routes.length > 1);

    const onBack = React.useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const hasNoLeftComponent = !canGoBack;
    return (
        <>
            <View
                style={[
                    styles.container,
                    hasNoLeftComponent && styles.rightComponentContainer,
                ]}
            >
                {canGoBack && (
                    <IconButton
                        buttonStyle={styles.flexOne}
                        name={SvgIconNames.leftArrow}
                        text={String(prevSceneDisplayName)}
                        textColor={colorsService.primaryColor}
                        textStyle={styles.flexOne}
                        onPress={onBack}
                    />
                )}
                {!!onRightButton ? (
                    <IconButton
                        buttonStyle={styles.button}
                        text={rightButtonText}
                        textColor={colorsService.primaryColor}
                        onPress={onRightButton}
                    />
                ) : (
                    rightComponent
                )}
            </View>
        </>
    );
});

export const AppHeader = AppHeaderBase;
