import LeftNav from "../LetNav";
import {useSelector } from 'react-redux'
import UploadImg from "./UploadImg";



export default function UpdateProfil () {
    const userData = useSelector((state) => state.userReducer)


    return (
        <div className="profil-container">
            <LeftNav />
        <h1>Profil de {userData.pseudo}</h1>
        <img src={userData.picture} alt="user-pic" />
        <UploadImg  />
        </div>
    )
}

