import { dashboardEndpoint } from "../api";
import { apiConnector } from "../apiConnector";

const {CREATE_ROOM, GET_USER_ROOMS} = dashboardEndpoint;

export const createRoom = async (roomName:string) => {
    console.log("Roomnameee", roomName);
    try{
        const response = await apiConnector("POST", CREATE_ROOM, {roomName});
        console.log("response", response);
        // return response
    }catch(error){
        console.log("Error", error);
    }
}

export const getRooms = async () => {
    try{
        const response = await apiConnector("GET", GET_USER_ROOMS);
        // console.log("GET_USER_ROOMS", response);
        return response.data.response.createdRooms;
    }catch(error){
        console.log(error);
    }
}