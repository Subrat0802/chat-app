import axios from "axios";

export const axiosInstance = axios.create({withCredentials:true});

export const apiConnector = (
    method: string,
    url: string,
    bodyData: any = null,
    headers: Record<string, string> = {},
    params: Record<string, any> = {}
) => {
    return axiosInstance({
        method,
        url,
        headers,
        params,
        ...(method.toUpperCase() !== "GET" && { data: bodyData }) // only add data if not GET
    });
}