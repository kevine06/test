import  { useState } from "react";
import axios from "axios";
import { REACT_APP_API_URL } from '../../../env.js';
// import { useNavigate } from "react-router-dom";

export default function SignInFrom() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    // const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error')

        axios({
            method : 'post',
            url: `${REACT_APP_API_URL}/api/user/login`,
            withCredentials: true,
            data: {
                email,
                password
            }
        }).then((res) => {
                console.log(res);
                window.location.replace("/"); 

        })
        .catch((err) => {
            console.log('voici:',err);
            // console.log("ERROR", err.response.data)
            emailError.innerText = err.response.data.email;
            passwordError.innerText = err.response.data.password
        })
    };


    return (
      <form action="" onSubmit={handleLogin} id="sign-up-form">
        <label htmlFor="email">Email</label>
        <br />
        <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            /> 
        <br />
        <div className="email error"></div>
        <br />
        <label htmlFor="password">Mot de passe</label>
        <br />
        <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
        <div className="password error"></div>
        <br />
        <input type="submit" value="Se connecter" />
      </form>
    )
}
