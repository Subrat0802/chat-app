import { toast } from "sonner";
import { dashboardEndpoint } from "../api";
import { apiConnector } from "../apiConnector";

const {CREATE_ROOM, GET_USER_ROOMS, GET_ROOM_DETAILS} = dashboardEndpoint;

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

export const getRoomDetails = async (roomId: string) => {
    try{
        const response = await apiConnector("GET", `${GET_ROOM_DETAILS}/${roomId}`);
        console.log("ROOM DETAILS", response);
        if(response.status === 404){
            toast.error("Error while getting room Details")
            return response.status
        }
        // toast.success("Getting room details")
        return response.data.data;
    }catch(error){
        console.log("ERROR", error);
    }
}