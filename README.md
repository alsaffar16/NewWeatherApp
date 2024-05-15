﻿# NewWeatherApp
 This app will take your location and show the current weather

 1. you will need to make a new free account on `https://www.weatherapi.com` and get API key

 2. create new Firebase project
    - create web app and save the credentials to add them to `.env` file.
    - In authtication section enable phone sign in method
    - enable Firestore 
  
3. create .env file and add the follwing:
```
EXPO_PUBLIC_API_KEY=xxxx                         //from step two, the app credentials
EXPO_PUBLIC_AUTH_DOMAIN=xxxx                    //from step two, the app credentials
EXPO_PUBLIC_PROJECT_ID=xxxx                    //from step two, the app credentials
EXPO_PUBLIC_STORAGE_BUCKET=xxxx                //from step two, the app credentials
EXPO_PUBLIC_MESSAGING_SENDER_ID=xxxx          //from step two, the app credentials
EXPO_PUBLIC_APP_ID=xxxx                      //from step two, the app credentials
EXPO_PUBLIC_MEASUREMENT_ID=xxxx             //from step two, the app credentials
EXPO_PUBLIC_WEATHER_API_KEY=xxxx           //from step one, weather api key
```

4. run
```
yarn
```

6. run
```
npx expo start
```
