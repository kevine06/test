import LeftNav from "../LetNav";
import {useSelector } from 'react-redux'



export default function UpdateProfil () {
    const userData = useSelector((state) => state.userReducer)


    return (
        <div className="profil-container">
            <LeftNav />
        <h1>Profil de {userData.pseudo}</h1>
        </div>
    )
}

