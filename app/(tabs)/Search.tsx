import React, { useState, useEffect } from "react";
import {
  useFonts,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
} from "@expo-google-fonts/comfortaa";

import {
  StyleSheet,
  TouchableHighlight,
  Text,
  FlatList,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { ReduxState } from "@/constants/types";
import { useRouter } from "expo-router";

export default function SearchScreen({ navigation }: { navigation: any }) {

  const cities = useSelector((state: ReduxState) => {
    return state.cities.cities;
  });
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState(cities);
  const [masterDataSource, setMasterDataSource] = useState(cities);
  const router = useRouter();

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search City"
        />
      </View>
      <View style={{ flexDirection: "column" }}>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => item.geonameid.toString()}
          renderItem={({ item }) => (
            <View style={{}}>
              <TouchableHighlight
                onPress={() => {
                  router.push({ pathname: "cityWeather", params: { name: item.name, id: item.geonameid } } as never);
                  // navigation.navigate("CityWeather", {
                  //   name: item.name,
                  //   id: item.geonameid,
                  // })
                }


                }
                style={[
                  styles.city,
                  { backgroundColor: "#49a9bf", padding: 10 },
                ]}
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
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    alignContent: "center",
    marginLeft: 18,
  },
  textInput: {
    height: 50,
    width: Dimensions.get("window").width * 0.8,
    borderColor: "#708090",
    borderWidth: 1.5,
    marginTop: Dimensions.get("window").width * 0.05,
    marginLeft: Dimensions.get("window").width * 0.05,
    borderRadius: 15,
    shadowColor: "#000",
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
  },

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

  button: {
    width: Dimensions.get("window").width * 0.17,
    marginHorizontal: Dimensions.get("window").width * 0.1,
    height: 50,
    marginTop: 90,
    borderWidth: 1.5,
    borderRadius: 15,
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    // backgroundColor:,
    elevation: 11,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    justifyContent: "center",
  },
});
