
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import cityReducer from '@/store/reducers/cityReducers';
import uidReducer from '@/store/reducers/uidReducers';
import ReduxThunk from 'redux-thunk';


const rootReducer = combineReducers({
    cities: cityReducer,
    userID: uidReducer,
});

const store = configureStore({
    reducer: rootReducer

});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (

        <Provider store={store}>
            <SafeAreaProvider>{children}</SafeAreaProvider>
        </Provider>
    );
}
