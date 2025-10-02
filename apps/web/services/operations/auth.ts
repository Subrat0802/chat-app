
import { endpoint } from "../api";
import { apiConnector } from "../apiConnector";

const {SIGNUP_URL, SIGNIN_URL, ME_ROUTE} = endpoint;

export interface AuthProps {
    username?: string | undefined;
    email: string | undefined; 
    password:string | undefined;
}

export const signup = async ({username, email, password}: AuthProps) => {
    try{
        const response = await apiConnector("POST", SIGNUP_URL, {username, email, password});
        if(response.data.success){
            return response;
        }
    }catch(error){
        console.log("ERROR",error);
        // toast.error(error)
    }
}

export const signin = async ({username, email, password}: AuthProps) => {
    try{
        const response = await apiConnector("POST", SIGNIN_URL, {username, email, password});
        console.log("RESPONSE SIGNUP", response );
        if(response.data.success){
            return response;
        }

    }catch(error){
        console.log("ERROR",error);
    }
}

export const meRoute = async () => {
    try{
        const response = await apiConnector("GET", ME_ROUTE);
        console.log("MEEEEEEE", response);
        return response;
    }catch(error){
        console.log("Error me route", error)
    }
}