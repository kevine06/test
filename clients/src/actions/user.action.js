 import axios from 'axios';
import { REACT_APP_API_URL } from '../../env';


 export const GET_USER = "GET_USER";
 export const UPLOAD_PICTURE = "UPLOAD_PICTURE"

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
