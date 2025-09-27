const BASE_URL = "http://localhost:3001";

export const endpoint = {
    SIGNUP_URL: BASE_URL + "/signup",
    SIGNIN_URL: BASE_URL + "/signin"
}

export const dashboardEndpoint = {
    CREATE_ROOM: BASE_URL + "/room",
    GET_USER_ROOMS: BASE_URL + "/getAllRoomsOfUser"

}