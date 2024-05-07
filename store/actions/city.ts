export const FAVORITE = 'FAVORITE';
export const DELETE = 'DELETE';
export const SET_CITIES = 'SET_CITIES';
import db from '@/constants/firebaseConfig';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { Dispatch } from 'redux';


export const fetchFavotites = (uid: string) => {
    return async (dispatch: Dispatch) => {
        const ref = query(collection(db, 'favoriteCities'), where('userID', '==', uid))

        const response = await getDocs(ref);
        const loadedCities = [];
        response.forEach((doc) => {
            loadedCities.push({
                cityID: doc.data().cityID,
                cityName: doc.data().cityName,
                userId: doc.data().userId,
            });
            dispatch({ type: SET_CITIES, cityID: doc.data().cityID });
            console.log(doc.data().cityID);
        });
    };
};

export function changeCity(cityID: string) {
    return {
        type: FAVORITE,
        cityID: cityID,
    };
}

export function deleteCity(cityID: string) {
    return {
        type: DELETE,
        cityID: cityID,
    };
}
