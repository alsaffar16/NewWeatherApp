import { cities } from "@/constants/cities";
import { FAVORITE, SET_CITIES, DELETE } from "../actions/city";
import { City } from "@/constants/types";


export type CityAction = {
    type: string;
    cityID: number;
}
interface CityState {
    cities: City[];
    favoriteCities: City[]
}
const intialState: CityState = {
    cities: cities,
    favoriteCities: [],
};

//return state & put break
const cityReducer = (state = intialState, action: CityAction) => {
    switch (action.type) {
        case FAVORITE:
            const city = state.cities.find((city) => {
                return city.geonameid === action.cityID;
            });
            const index = state.favoriteCities.findIndex(
                (city) => city.geonameid === action.cityID
            );
            if (!city) {
                return state
            }
            if (index >= 0) {
                return state;
            } else {
                const newArray = state.favoriteCities.concat(city);

                return { ...state, favoriteCities: newArray };
            }

        case SET_CITIES:
            const theCity = state.cities.find((theCity) => {
                return theCity.geonameid === action.cityID;
            });
            if (city) {
                return state;
            }
            else if (theCity) {
                const Array = state.favoriteCities.concat(theCity);

                return { ...state, favoriteCities: Array };
            }
            return state;
        case DELETE:
            const existingIndex = state.favoriteCities.findIndex(
                (city) => city.geonameid === action.cityID
            );
            if (existingIndex >= 0) {
                const updatedCities = [...state.favoriteCities];
                updatedCities.splice(existingIndex, 1);
                return { ...state, favoriteCities: updatedCities };
            }
            break;
        default:
            return state;
    }
};

export default cityReducer;
