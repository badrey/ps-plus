import * as React from "react";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {SearchPSPlusScene} from "../../SearchScene/scenes";
import {TitleDetailsScene} from "../../DetailsScene/TitleDetailsScene";
import {screenNavigationOptions} from "../../shared";

const Stack = createNativeStackNavigator();

export const SearchPSPlusSceneNavStack = () => (
    <Stack.Navigator
        initialRouteName="SearchPSPlusScene"
        screenOptions={screenNavigationOptions}
    >
        <Stack.Screen component={SearchPSPlusScene} name="SearchPSPlusScene" />
        <Stack.Screen component={TitleDetailsScene} name="TitleDetailsScene" />
    </Stack.Navigator>
);
