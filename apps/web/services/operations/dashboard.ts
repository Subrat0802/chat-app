import { toast } from "sonner";
import { dashboardEndpoint } from "../api";
import { apiConnector } from "../apiConnector";

const {CREATE_ROOM, GET_USER_ROOMS, GET_ROOM_DETAILS, GET_ROOM_BY_SEARCH, JOIN_ROOM} = dashboardEndpoint;

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
        console.log("GET_USER_ROOMS", response);
        return response.data.response;
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

export const getAllRooms = async (roomsName: string) => {
  console.log("room", roomsName);
  try {
    const response = await apiConnector(
      "GET",
      `${GET_ROOM_BY_SEARCH}?roomsName=${roomsName}`
    );

    console.log("Response search room", response.data);

    
    return response.data;
  } catch (error) {
    //@ts-ignore
    if(error.response.status === 404){
        //@ts-ignore
        toast.error(error.response.data.message);
    }
    console.log("ERROR while searching room", error);
    //@ts-ignore
    return error.response.data.message

    return null; 
  }
};


export const joinRoom = async (roomId: string) => {
    try{
        const response = await apiConnector("POST", `${JOIN_ROOM}${roomId}`);
        console.log("JOIN ROOM RESPONSE,", response);

    }catch(error){  
        console.log("Join room error", error);
    }
}