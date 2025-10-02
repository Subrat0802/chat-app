const BASE_URL = "http://localhost:3001";

export const endpoint = {
    SIGNUP_URL: BASE_URL + "/signup",
    SIGNIN_URL: BASE_URL + "/signin",
    ME_ROUTE: BASE_URL + "/me"
}

export const dashboardEndpoint = {
    CREATE_ROOM: BASE_URL + "/room",
    GET_USER_ROOMS: BASE_URL + "/getAllRoomsOfUser",
    GET_ROOM_DETAILS: BASE_URL + "/geRoomsDetails"
}
