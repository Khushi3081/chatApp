import axios from "axios"
const baseURL = "http://localhost:5000"

export const getToken = () => localStorage.getItem("accessToken")

export const getAuthorizationHeader = () => `${getToken()}`

export const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: getAuthorizationHeader() },
})
