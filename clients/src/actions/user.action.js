 import axios from 'axios';
import { REACT_APP_API_URL } from '../../env';


 export const GET_USER = "GET_USER";



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
