import React, { useState, useEffect, useCallback } from "react";
import {
    Keyboard,
    Dimensions,
    Alert,
    TouchableWithoutFeedback,
    Platform,
} from "react-native";
import {
    useFonts,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
} from "@expo-google-fonts/comfortaa";
import { StyleSheet, View } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import { userID } from "@/store/actions/uid";
import { PhoneAuthProvider, User, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { auth } from "@/constants/firebaseConfig";
import OTPTextInput from 'react-native-otp-textinput';

type AthinticateionType = {
    id: string
}

export default function Athinticateion() {
    const { id } = useLocalSearchParams<AthinticateionType>()

    const [uid, setUid] = useState("");
    const navigation = useNavigation();

    useEffect(() => {

        if (uid != "") {
            dispatchHandler();
            navigation.reset({
                index: 0,
                routes: [{ name: '(tabs)' } as never],
            });
        }
    }, [uid])
    const dispatch = useDispatch();
    const dispatchHandler = useCallback(() => {
        dispatch(userID(uid));
    }, [dispatch, uid]);

    const [message, showMessage] = useState({});


    // const onAuthStateChanged = (user) => {
    //   this.setState({ isAuthinticationReady: true });
    //   this.setState({ isAthinticated: !!user });
    // };

    const onInputCompleted = async (text: string) => {

        try {
            const credential = PhoneAuthProvider.credential(
                id,
                text
            );

            await signInWithCredential(auth, credential);
            onAuthStateChanged(auth, (user: User | null) => {
                if (user) {
                    setUid(user.uid);
                }

            });

        } catch (err) {
            showMessage({ text: `Error: ${err}`, color: "red" });
        }
    };

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
            style={{
                flex: 1,
                backgroundColor: "#e5e5e5",
            }}
        >
            <View style={styles.mainContainer}>
                <View style={styles.code}>

                    <OTPTextInput
                        //  ref={e => (otpInput = e)} 
                        keyboardType="numeric"
                        autoFocus={true}
                        inputCount={6}
                        containerStyle={{
                            paddingVertical: 40, paddingRight: 58, paddingLeft: 20, borderRadius: 10, backgroundColor: "#e5e5e5",

                        }}
                        handleTextChange={(text: string) => {
                            if (text.length === 6) {
                                onInputCompleted(text)
                            }
                        }}

                    />
                    {/* <SMSVerifyCode
                            autoFocus={true}
                            containerPaddingVertical={40}
                            containerPaddingRight={58}
                            containerPaddingLeft={20}
                            codeViewBorderRadius={10}
                            codeFontSize={26}
                            verifyCodeLength={6}
                            containerBackgroundColor={"#e5e5e5"}
                            // ref={(ref) => (this.verifycode = ref)}
                            onInputCompleted={onInputCompleted}
                        /> */}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#e5e5e5",
        height: "100%",
        width: "100%",
    },
    code: {
        paddingVertical: Dimensions.get('window').height * 0.2,
        width: "90%",
        height: "25%",
        borderRadius: 10,
        borderWidth: 1.5,
        backgroundColor: "#e5e5e5",
        borderColor: "#49a9bf",
        //paddingRight: Dimensions.get("window").height * 0.3,
        marginHorizontal: Dimensions.get("window").width * 0.03,
        paddingTop: Dimensions.get("window").width * 0.1,
        marginTop: Dimensions.get("window").height * 0.25,
        //paddingHorizontal: Dimensions.get("window").width * 0.01,

    },
});
