 import axios from 'axios';
import { REACT_APP_API_URL } from '../../env';


export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE"
export const UPDATE_BIO = "UPDATE_BIO"



export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`${REACT_APP_API_URL}/api/user/${uid}`)
            .then((res) => {
                dispatch({
                    type: GET_USER,
                    payload: res.data
                });
            })
            .catch((err) => console.log(err));
    };
};

export const uploadPicture = (data, id) => {
    return (dispatch) => {
        return axios
            .post(`${REACT_APP_API_URL}/api/user/upload`, data)
            .then((res) => {
                return axios
                .get(`${REACT_APP_API_URL}/api/user/${id}`)
                .then((res) => {
                    dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
                })

            })
            .catch((err) => console.log(err))
    }
}


export const updateBio = (userId, bio) => {
    return (dispatch) => {
        return axios ({
            method: "put",
            url: `${REACT_APP_API_URL}/api/user/` + userId,
            data: { bio }
        })
        .then ((res) => {
            dispatch({ type: UPDATE_BIO, paylod: bio })
        })
        .catch((err) => console.log(err))
    }
} 
