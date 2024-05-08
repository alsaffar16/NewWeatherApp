import React, { useRef, useState, useEffect } from "react";
import {
    useFonts,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
} from "@expo-google-fonts/comfortaa";
import {
    FirebaseRecaptchaVerifierModal,
} from "expo-firebase-recaptcha";
import {
    StyleSheet,
    TouchableHighlight,
    Text,
    Alert,
    View,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";
import { auth, firebaseConfig } from "@/constants/firebaseConfig";
import { signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "expo-router";

export default function LogIn() {
    const router = useRouter();
    const recaptchaVerifier = React.useRef(null);
    const attemptInvisibleVerification = true;
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false)
    const [formattedValue, setFormattedValue] = useState("");

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
            style={{}}
        >
            <View style={styles.mainContainer}>
                {
                    <FirebaseRecaptchaVerifierModal
                        ref={recaptchaVerifier}
                        firebaseConfig={firebaseConfig}
                        attemptInvisibleVerification={attemptInvisibleVerification}
                    />
                }

                <View
                    style={{
                        backgroundColor: "#E3E2E2",
                        paddingVertical: Dimensions.get("window").height * 0.07,
                        marginTop: Dimensions.get("window").height * 0.16,
                        borderRadius: 20,
                        marginHorizontal: Dimensions.get("window").width * 0.05,
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <View
                            style={{
                                marginHorizontal: Dimensions.get("window").width * 0.05,
                            }}
                        >
                            <PhoneInput
                                // ref={phoneInput}
                                defaultValue={value}
                                defaultCode="SA"
                                layout="first"
                                //containerStyle={{ borderRadius: 10 }}
                                onChangeText={(text: string) => {
                                    setValue(text);
                                }}
                                onChangeFormattedText={(text: string) => {
                                    setFormattedValue(text);
                                }}
                                withDarkTheme
                                withShadow
                                autoFocus
                            />
                        </View>

                    </View>

                    <View
                        style={{
                            marginTop: Dimensions.get("window").height * 0.05,
                            marginHorizontal: Dimensions.get("window").width * 0.05,
                        }}
                    >
                        <TouchableHighlight
                            style={{
                                borderRadius: 15,
                                backgroundColor: "#F38F38",
                            }}
                            onPress={() => {
                                setLoading(true)
                                signInWithPhoneNumber(
                                    auth,
                                    formattedValue,
                                    recaptchaVerifier.current
                                )
                                    .then((result) => {
                                        setLoading(false)
                                        router.push({ pathname: '/logIn/verify', params: { id: result.verificationId } } as never)

                                    })
                                    .catch((error) => {
                                        alert(error.message);
                                    });
                            }}
                        >
                            {
                                loading ? <ActivityIndicator size={'large'} /> : <Text style={[styles.buttonText, { marginTop: 10 }]}> Next </Text>
                            }

                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "column",
        //alignContent: "center",
        //justifyContent: "center",
        height: "100%",
        width: "100%",
        //marginLeft: 18,

        //padding: Dimensions.get("window").height
    },
    textInput: {
        height: Dimensions.get("window").width * 0.15,
        width: Dimensions.get("window").width * 0.7,
        borderColor: "#708090",
        borderWidth: 1.5,
        fontSize: 25,
        //fontFamily: "Comfortaa_400Regular",
        //marginTop: Dimensions.get("window").height * 0.2,
        marginLeft: Dimensions.get("window").width * 0.09,
        borderRadius: 15,
        shadowColor: "#000",
        textAlign: "center",
        //marginBottom: 20,
        shadowOffset: {
            width: 0,
            height: 5,
        },
    },
    buttonText: {
        color: "#FFFFE0",
        height: 50,
        textAlign: "center",
        justifyContent: "center",
        fontSize: 27,
        //fontFamily: "Comfortaa_400Regular",
    },
});
