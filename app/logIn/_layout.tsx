import { Stack } from 'expo-router';
import React from 'react';

export default function CityWeatherLayout() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" options={{
                title: 'LogIn',

            }} />
            <Stack.Screen name="verify"
                options={{
                    title: 'verify',

                }} />
        </Stack>
    );
}
