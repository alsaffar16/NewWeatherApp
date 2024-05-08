import { ReduxState } from "@/constants/types";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableHighlight,
    Text,
} from "react-native";
import { View } from "react-native";
import { useSelector } from "react-redux";

export default function Favorite() {
    const router = useRouter()
    const cities = useSelector((state: ReduxState) => {
        return state.cities.favoriteCities;
    });
    return (
        cities.length === 0 ?
            <View style={{
                alignItems: "center", justifyContent: "center",
                marginTop: Dimensions.get("window").height * 0.35,
            }}>
                <Text style={{
                    textAlign: "center", fontSize: 30,
                    fontFamily: "Comfortaa_500Medium",
                }}>No Favorites</Text>
            </View> :
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: Dimensions.get("window").height * 0.1,
                }}
            >
                <FlatList
                    data={cities}
                    keyExtractor={(item, index) => item.geonameid.toString()}

                    renderItem={({ item }) => (
                        <View style={{}}>
                            <TouchableHighlight
                                onPress={() => router.push({
                                    pathname: 'favoriteCity', params: {
                                        name: item.name,
                                        id: item.geonameid,
                                    }
                                } as never)
                                }

                                style={[styles.city, { backgroundColor: "#49a9bf", padding: 10 }]}
                            >
                                <View style={{ flexDirection: "column" }}>
                                    <Text
                                        style={[
                                            styles.text,
                                            { fontFamily: "Comfortaa_500Medium", fontSize: 25 },
                                        ]}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.text,
                                            { fontFamily: "Comfortaa_400Regular", fontSize: 17 },
                                        ]}
                                    >
                                        {item.country}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    )}
                />
            </View>
    );
}

const styles = StyleSheet.create({
    city: {
        width: Dimensions.get("window").width * 0.8,
        height: 70,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: "#708090",
        marginVertical: 8,
        marginHorizontal: 20,
        textAlign: "center",
        fontFamily: "Comfortaa_500Medium",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
    },
    text: {
        textAlign: "center",
        justifyContent: "center",
    },
});
