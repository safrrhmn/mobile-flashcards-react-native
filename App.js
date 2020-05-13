import React, {Component} from "react";
import {StatusBar, View} from "react-native";
import Constants from "expo-constants";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducers";

import HomeStack from "./Components/HomeStack";
import NewDeck from "./Components/NewDeck";
import {gray, setLocalNotification} from "./utils/helpers";

function AppStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );
}

const Tab = createBottomTabNavigator();

class App extends Component {
    componentDidMount() {
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <AppStatusBar backgroundColor={gray} barStyle="light-content"/>
                    <NavigationContainer>
                        <Tab.Navigator
                            initialRouteName="Home"
                            screenOptions={({route}) => ({
                                tabBarIcon: ({color, size}) => {
                                    let icon;
                                    if (route.name === "Add Deck") {
                                        icon = (
                                            <FontAwesome
                                                name="plus-square"
                                                size={size}
                                                color={color}
                                            />
                                        );
                                    } else if (route.name === "Home") {
                                        icon = (
                                            <Ionicons
                                                name="ios-bookmarks"
                                                size={size}
                                                color={color}
                                            />
                                        );
                                    }
                                    return icon;
                                }
                            })}
                        >
                            <Tab.Screen name="Home" component={HomeStack}/>
                            <Tab.Screen name="Add Deck" component={NewDeck}/>
                        </Tab.Navigator>
                    </NavigationContainer>
                </View>
            </Provider>
        );
    }
}

export default App;