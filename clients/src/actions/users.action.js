import axios from "axios";
import { REACT_APP_API_URL } from "../../env";


export const GET_USERS = "GET_USERS";

export const getUsers = () => {
    return (dispatch) => {
        return axios 
        .get(`${REACT_APP_API_URL}/api/user`)
        .then((res) => {
            dispatch({ type : GET_USERS, payload: res.data })
        })
        .catch((err) => console.log(err))
    }
}