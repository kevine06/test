import React, { useState } from 'react';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../../env.js';
import SignInFrom from '../Log/SignInFrom.jsx';

export default function SignUpForm() {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById('terms');
        const pseudoError = document.querySelector('.pseudo.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');
        const termsError = document.querySelector('.terms.error');

        if (password !== controlPassword || !terms.checked) {
            if (password !== controlPassword) {
                passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
            }
            if (!terms.checked) {
                termsError.innerHTML = "Veillez valider les conditions générales";
            }
        } else {
            await axios({
                method: 'post',
                url: `${REACT_APP_API_URL}/api/user/register`,
                data: {
                    pseudo,
                    email,
                    password,
                }
            })
            .then((res) => {
                if (res.data.errors) {
                    pseudoError.innerHTML = res.data.errors.pseudo;
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    setFormSubmit(true);
                }
            })
            .catch((err) => console.log(err));
        }
    };

    return (
        <>
            {formSubmit ? (
                <>

                    <SignInFrom />
                    <span></span>
                    <h4 className='success'>Enregistrement réussi, veuillez-vous connecter</h4>
                </>
            ) : (
                <form action='' onSubmit={handleRegister} id='sign-up-form'>
                    <label htmlFor='pseudo'>Pseudo</label>
                    <br />
                    <input
                        type='text'
                        name='pseudo'
                        id='pseudo'
                        onChange={(e) => setPseudo(e.target.value)}
                        value={pseudo}
                    />
                    <div className='pseudo error'></div>
                    <label htmlFor='email'>Email</label>
                    <br />
                    <input
                        type='text'
                        name='email'
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <div className='email error'></div>
                    <label htmlFor='password'>Mot de passe</label>
                    <br />
                    <input
                        type='password'
                        name='password'
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className='password error'></div>
                    <br />
                    <label htmlFor='controlPassword'>Confirm mot de passe</label>
                    <br />
                    <input
                        type='password'
                        name='controlPassword'
                        id='controlPassword'
                        onChange={(e) => setControlPassword(e.target.value)}
                        value={controlPassword}
                    />
                    <div className='password-confirm error'></div>
                    <br />
                    <input type='checkbox' id='terms' />
                    <label htmlFor='terms'>
                        Jaccepte les{' '}
                        <a href='/' target='_blank' rel='noopener noreferrer'>
                            conditions générales
                        </a>
                    </label>
                    <div className='terms error'></div>
                    <input type='submit' value='Valider Inscription' />
                </form>
            )}
        </>
    );
}
