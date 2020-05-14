import {AsyncStorage} from "react-native";
import * as Permissions from "expo-permissions";
import Notifications from "expo/build/Notifications/Notifications";


const NOTIFICATION_KEY = "Flashcards:notifications";

export function clearLocalNotifications() {
    AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

function createNotification() {
    return {
        title: "Have you practiced today?",
        body: "Crack on with your learning! Go and practice right now!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: "high",
            vibrant: true,
            sticky: false
        }
    };
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
                    if (status === "granted") {
                        Notifications.cancelAllScheduledNotificationsAsync().then(r => console.log("notification set"));

                        let tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        tomorrow.setHours(20);
                        tomorrow.setMinutes(0);

                        Notifications.scheduleLocalNotificationAsync(createNotification(), {
                            time: tomorrow,
                            repeat: "day"
                        }).then(r => console.log("Notifications.scheduleLocalNotificationAsync()"));

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true)).then(r => console.log(r));
                    }
                });
            }
        });
}

export const white = "white";
export const blue = "blue";
export const gray = "gray";
