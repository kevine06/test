import axios from "axios";
import { REACT_APP_API_URL } from "../../env";


export const  GET_POSTS = "GET_POSTS";


export const getPosts = () => {
    return (dispatch) => {
        return axios
        .get(`${REACT_APP_API_URL}/api/post/`)
        .then((res) => {
            dispatch({ type: GET_POSTS, payload: res.data })
        })
        .catch((err) => console.log(err))
    }
}