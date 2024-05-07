import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
    apiKey: Constants.expoConfig?.extra?.apiKey,
    authDomain: Constants.expoConfig?.extra?.authDomain,
    projectId: Constants.expoConfig?.extra?.projectId,
    storageBucket: Constants.expoConfig?.extra?.storageBucket,
    messagingSenderId: Constants.expoConfig?.extra?.messagingSenderId,
    appId: Constants.expoConfig?.extra?.appId,
    measurementId: Constants.expoConfig?.extra?.measurementId,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export default db;