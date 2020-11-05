import * as React from "react";
import {View} from "react-native";
import {
    useNavigation,
    useRoute,
    useNavigationState,
    RouteProp,
} from "@react-navigation/native";
import {IconButton} from "../../components/index";
import {appHeaderStyles as styles} from "./styles";
import {colorsService} from "../../services/colors_service";

type RouteParamsNames = "appHeader";
type RouteParams = Record<RouteParamsNames, Params | undefined>;
type Params = {
    prevSceneDisplayName?: string;
};

type Props = {
    onRightButton?: () => void;
    rightButtonText?: string;
    rightComponent?: React.ReactNode;
};

const AppHeaderBase = React.memo<Props>((props: Props) => {
    const {rightButtonText, rightComponent, onRightButton} = props;
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RouteParams, "appHeader">>();
    const prevSceneDisplayName = route.params?.prevSceneDisplayName ?? "";
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
                        name="leftArrow"
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
