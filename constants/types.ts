export type City = {
    country: string,
    geonameid: number,
    name: string,
    subcountry: string | null,
}

export type ReduxState = {
    cities: {
        cities: City[];
        favoriteCities: City[]
    },
    userID: {
        uid: string
    },
}