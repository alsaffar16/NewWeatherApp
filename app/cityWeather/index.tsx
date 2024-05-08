import React, { useState, useEffect, useCallback } from 'react';
import { useFonts, Comfortaa_400Regular, Comfortaa_500Medium } from '@expo-google-fonts/comfortaa';
import { StyleSheet, TouchableHighlight, Text, Image, View, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { ReduxState } from '@/constants/types';
import Loading from '@/components/loadingScreen';
import { changeCity } from '@/store/actions/city';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/constants/firebaseConfig';

type CityWeatherType = {
    id: string,
    name: string
}

export default function CityWeather() {
    const { id, name } = useLocalSearchParams<CityWeatherType>();
    const navigation = useNavigation();
    const router = useRouter();
    const uid = useSelector((state: ReduxState) => {
        return state.userID.uid;
    });

    const [cState, setcState] = useState(true);
    const [fState, setfState] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cityName, setCity] = useState('');
    const [fetching, setFetching] = useState(false);
    const [found, setFound] = useState(false);
    const [tempreture, settempreture] = useState('');
    const [weatherState, setweatherState] = useState('');
    const [backColor, setbackColor] = useState('');
    const [icon, setIcon] = useState(' ');

    const dispatch = useDispatch();
    const dispatchHandler = useCallback(() => {
        dispatch(changeCity(id));
    }, [dispatch, id]);

    useEffect(() => {
        (async () => {
            setCity(name);
            getWheatherData();
        })();
    }, []);

    function getWheatherData() {
        setFetching(true);

        fetch(`http://api.weatherapi.com/v1/current.json?q=${name}&key=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {

                settempreture(responseJson.current.temp_c);
                setFound(true);
                setweatherState(responseJson.current.condition.text);
                setLoading(false);
                setIcon(`https:${responseJson.current.condition.icon}`);
                backroundCol(responseJson.current.condition.text);
            })
            .catch((err) => {
                console.log(err);
                alert('No information about this city');
                router.back()
            });
    }

    function backroundCol(state: string) {
        if (state === 'Clouds') setbackColor('#d0cccc');
        else if (state === 'Sunny') setbackColor('#F2F27A');
        else if (state === 'Rain') setbackColor('#AFC3CC');
        else if (state === 'Snow') setbackColor('#fffafa');
        else if (state === 'Clear') setbackColor('#66bbdd');
    }

    return loading ? (
        Loading()
    ) : (
        <View style={[styles.MainContainer]}>
            <View style={[styles.currentInfo, { backgroundColor: backColor }]}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <Image
                        source={{
                            uri: icon,
                        }}
                        style={{
                            width: Dimensions.get('window').width * 0.4,
                            height: Dimensions.get('window').height * 0.1,
                            // marginLeft: Dimensions.get("window").width * 0.7,
                            marginTop: Dimensions.get('window').height * 0.02,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 30,
                            alignContent: 'center',
                            fontFamily: 'Comfortaa_400Regular',
                            marginLeft: Dimensions.get('window').width * 0.05,
                            marginTop: Dimensions.get('window').height * 0.01,
                            paddingRight: 150,
                        }}
                    >
                        {weatherState}
                    </Text>
                </View>

                <Text
                    style={{
                        fontSize: 32,
                        fontFamily: 'Comfortaa_500Medium',
                        marginLeft: Dimensions.get('window').width * 0.3,
                        marginRight: Dimensions.get('window').width * 0.1,
                        marginTop: Dimensions.get('window').height * 0.06,
                        alignContent: 'center',
                        justifyContent: 'center',
                        flex: 1,
                    }}
                >
                    °{tempreture}
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableHighlight
                    style={[
                        {
                            backgroundColor: cState ? '#708090' : '#C0C0C0',
                        },
                        styles.button,
                    ]}
                    onPress={() => {
                        if (!cState) {
                            setcState(true);
                            setfState(false);
                            settempreture((((parseFloat(tempreture) - 32) * 5.0) / 9.0).toFixed(2).toString());
                        }
                    }}
                >
                    <Text style={styles.buttonText}>C°</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[{ backgroundColor: fState ? '#708090' : '#C0C0C0' }, styles.button]}
                    onPress={() => {
                        if (!fState) {
                            setcState(false);
                            setfState(true);
                            settempreture(((parseFloat(tempreture) * 9.0) / 5.0 + 32).toFixed(2).toString());
                        }
                    }}
                >
                    <Text style={styles.buttonText}>°F</Text>
                </TouchableHighlight>
            </View>

            <View
                style={{
                    marginTop: Dimensions.get('window').height * 0.25,
                }}
            >
                <TouchableHighlight
                    style={{
                        borderRadius: 15,
                        backgroundColor: '#F38F38',
                        paddingHorizontal: 30,
                        justifyContent: 'center',
                        //alignContent: "center",
                    }}
                    onPress={async () => {
                        try {

                            const ref = doc(collection(db, 'favoriteCities'))
                            await setDoc(ref, {
                                userID: uid,
                                cityID: id,
                                cityName: name,
                            })
                            router.back()

                            dispatchHandler();
                            alert('City Added To Favorite');
                        } catch (e) {
                            console.log(e)
                        }
                    }}
                >
                    <Text style={[styles.buttonText, { marginTop: 10 }]}>Add to favorite </Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    MainContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    currentInfo: {
        flexDirection: 'row',
        marginHorizontal: Dimensions.get('window').width * 0.02,
        justifyContent: 'center',
        alignContent: 'center',
        paddingBottom: 30,
        marginTop: Dimensions.get('window').width * 0.1,
        fontFamily: 'Comfortaa_400Regular',
        borderRadius: 20,
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    button: {
        height: 60,
        width: 150,
        padding: 20,
        borderRadius: 10,
        marginVertical: Dimensions.get('window').height * 0.027,
        marginLeft: 10,
        fontFamily: 'Comfortaa_400Regular',
    },
    buttonText: {
        color: '#FFFFE0',
        height: 50,
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 27,
        fontFamily: 'Comfortaa_400Regular',
    },

    temp: {
        flex: 1,
        position: 'relative',
        marginVertical: Dimensions.get('window').height * 0.027,
        fontSize: 43,
        fontFamily: 'Comfortaa_400Regular',
    },
});
