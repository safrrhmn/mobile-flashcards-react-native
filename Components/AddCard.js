import React, {Component} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {connect} from "react-redux";

import {addNewCard} from "../actions";
import {saveCardToDeck} from "../utils/api";
import {gray, blue, white} from "../utils/helpers";

const TextInputComponent = ({value, name, onChangeText, ...props}) => (
    <TextInput
        value={value}
        onChangeText={value => onChangeText(value, name)}
        {...props}
    />
);

class NewCard extends Component {
    state = {
        question: "",
        answer: "",
        errorMessage: false
    };

    changeTextHandler = (value, name) => {
        const {question, answer} = this.state;

        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));

        if ((question !== "") && (answer !== "")) {
            this.setState(prevState => ({
                ...prevState,
                errorMessage: false
            }));
        }
    };

    submitHandler = () => {
        const {question, answer, errorMessage} = this.state;
        const {closeCard, dispatch, title} = this.props;

        //Verify if something is missing on the and tell the user
        if (question === "" || answer === "") {
            this.setState(prevState => ({
                ...prevState,
                errorMessage: !errorMessage
            }));
        }

        if ((errorMessage === false) & (question !== " ") & (answer !== "")) {
            //Update the store of the app
            const card = {question, answer};
            dispatch(addNewCard(title, card));

            //Update the our "DB"
            saveCardToDeck(title, card);
            // Clean the state
            this.setState(prevState => ({
                ...prevState,
                question: "",
                answer: ""
            }));
            // Go back / close the modal
            closeCard();
        }
    };

    closeHandler = () => {
        this.props.closeCard();
    };

    render() {
        const {question, answer, errorMessage} = this.state;
        const {title} = this.props;

        let showMessage = null;
        if (errorMessage === true) {
            showMessage = (
                <Text style={{textAlign: "center", marginBottom: 10, fontSize: 18}}>
                    ☝️ missing something ☝️
                </Text>
            );
        }

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    enabled
                >
                    <Text style={styles.headerText}>Add a new card</Text>
                    <Text
                        style={{color: gray, alignSelf: "flex-start", marginBottom: 50}}
                    >
                        {`You can add more questions on your ${title} deck!`}
                    </Text>
                    <View style={styles.formContainer}>
                        <TextInputComponent
                            style={[styles.textInput, {marginBottom: 70}]}
                            placeholder="Your question here..."
                            multiline={true}
                            textAlignVertical="top"
                            value={question}
                            name={"question"}
                            onChangeText={(value, name) =>
                                this.changeTextHandler(value, name)
                            }
                        />
                        <TextInputComponent
                            style={styles.textInput}
                            placeholder="The correct answer here..."
                            multiline={true}
                            textAlignVertical="top"
                            value={answer}
                            name={"answer"}
                            onChangeText={(value, name) =>
                                this.changeTextHandler(value, name)
                            }
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        {showMessage}
                        <TouchableOpacity
                            onPress={() => this.submitHandler()}
                            style={
                                Platform.OS === "ios"
                                    ? styles.iosSubmitBtn
                                    : styles.androidSubmitBtn
                            }
                        >
                            <Text style={{color: white, fontSize: 20}}>Submit</Text>
                        </TouchableOpacity>
                        <View style={{margin: 5}}/>
                        <TouchableOpacity
                            onPress={() => this.closeHandler()}
                            style={[
                                Platform.OS === "ios"
                                    ? styles.iosSubmitBtn
                                    : styles.androidSubmitBtn,
                                {backgroundColor: gray}
                            ]}
                        >
                            <Text style={{color: white, fontSize: 20}}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        );
    }
}

export default connect()(NewCard);

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "flex-end",
        margin: 20,
        marginTop: 50,
        flex: 1
    },
    headerText: {
        color: blue,
        fontSize: 30,
        fontWeight: "900",
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        marginBottom: 10
    },
    formContainer: {flex: 2, width: `100%`, justifyContent: "flex-start"},
    btnContainer: {flex: 0, width: `100%`, justifyContent: "flex-end"},
    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: blue,
        paddingBottom: 10,
        width: "100%",
        fontSize: 17
    },
    iosSubmitBtn: {
        backgroundColor: blue,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: "100%",
        alignItems: "center"
    },
    androidSubmitBtn: {
        backgroundColor: blue,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        alignSelf: "flex-end"
    }
});
