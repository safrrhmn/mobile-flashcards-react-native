import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {blue, clearLocalNotifications, gray, setLocalNotification} from "../utils/helpers";

const QuizResults = props => {
    const {correct, numberOfQuestions} = props;
    const result = (correct / numberOfQuestions) * 100;

    useEffect(() => {
        clearLocalNotifications();
        setLocalNotification();
    })

    return (
        <View style={styles.container}>
            <Text style={styles.text}>You got</Text>
            <Text style={styles.scoreText}> {result} % </Text>
            <Text style={styles.text}>Correct</Text>
        </View>
    );
};

export default QuizResults;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    scoreText: {color: blue, fontSize: 40, fontWeight: "900"},
    text: {fontWeight: "900", fontSize: 20, color: gray}
});
