import React from 'react';
import  axios  from 'axios';
import cookie from "js-cookie";
import { REACT_APP_API_URL } from '../../../env.js';
// import { useNavigate } from "react-router-dom";




export default function Logout() {
    // const navigate = useNavigate();
    const removeCookie = (key) => {
            cookie.remove(key, { expires: 1 });
        }

    const logout = async () => {
        await axios ({
            method: 'get',
            url: `${REACT_APP_API_URL}/api/user/logout`,
            withCredentials: true,
        })
        .then(() => removeCookie('jwt'))
        .catch((err) => console.log(err))
        window.location.replace("/"); 

    }

    return (
        <div>
            <li onClick={logout}>
                <img src='public/img/icons/logout.svg' />
            </li>
        </div>
    )
}
