import React, { useState, useEffect, useCallback } from 'react';
import { Keyboard, Dimensions, Alert, TouchableWithoutFeedback, Platform } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useLocalSearchParams } from 'expo-router';
import { userID } from '@/store/actions/uid';
import { PhoneAuthProvider, User, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import { auth } from '@/constants/firebaseConfig';
import OTPInputView from '@twotalltotems/react-native-otp-input';

type AthinticateionType = {
  id: string;
};

export default function Athinticateion() {
  const { id } = useLocalSearchParams<AthinticateionType>();

  const [uid, setUid] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (uid != '') {
      dispatchHandler();
      navigation.reset({
        index: 0,
        routes: [{ name: '(tabs)' } as never],
      });
    }
  }, [uid]);
  const dispatch = useDispatch();
  const dispatchHandler = useCallback(() => {
    dispatch(userID(uid));
  }, [dispatch, uid]);

  const [message, showMessage] = useState({});

  const onInputCompleted = async (text: string) => {
    try {
      const credential = PhoneAuthProvider.credential(id, text);

      await signInWithCredential(auth, credential);
      onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
          setUid(user.uid);
        }
      });
    } catch (err) {
      showMessage({ text: `Error: ${err}`, color: 'red' });
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      style={{
        flex: 1,
        backgroundColor: '#e5e5e5',
      }}
    >
      <View style={styles.mainContainer}>
        <View style={styles.code}>
          <OTPInputView
            style={{ width: '80%', height: 200, marginHorizontal: 10 }}
            pinCount={6}
            autoFocusOnLoad
            keyboardType="number-pad"
            codeInputFieldStyle={styles.codeInputFieldStyle}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code) => {
              onInputCompleted(code);
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#e5e5e5',
    height: '100%',
    width: '100%',
  },
  code: {
    paddingVertical: Dimensions.get('window').height * 0.2,
    width: '90%',
    height: '25%',
    borderRadius: 10,
    borderWidth: 1.5,
    backgroundColor: '#e5e5e5',
    borderColor: '#49a9bf',
    //paddingRight: Dimensions.get("window").height * 0.3,
    marginHorizontal: Dimensions.get('window').width * 0.03,
    paddingTop: Dimensions.get('window').width * 0.1,
    marginTop: Dimensions.get('window').height * 0.25,
    alignItems: 'center',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
    borderWidth: 2,
  },

  codeInputFieldStyle: {
    width: 30,
    height: 45,
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: '#03DAC6',
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: '#F38F38',
    borderWidth: 2,
  },
});
