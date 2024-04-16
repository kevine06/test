import LeftNav from "../LetNav";
import {useSelector, useDispatch } from 'react-redux'
import UploadImg from "./UploadImg";
import { useState } from "react";
import { updateBio } from "../../actions/user.action";
import  {dateParser}  from "../Utils"


export default function UpdateProfil () {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false)
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch()


    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio))
        setUpdateForm(false)
    }

    return (
        <div className="profil-container">
            <LeftNav />
            <h1>Profil de {userData.pseudo}</h1>
            <div className="update-container">
            <   div className="left-part">
                    <h3>Photo de Profil</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg  />
                </div>
                <div className="right-part">
                    <div className="bio-update">
                <h3>Bio</h3>
                { updateForm === false && (
                    <>
                        <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                        <button onClick={() => setUpdateForm(!updateForm)}>Modifier bio</button>
                    </>
                )}
                 { updateForm && (
                    <>
                        <textarea type='text' defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                        <button onClick={handleUpdate}>Valider modifications</button>
                    </>
                )}
                    </div>
                    <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
                </div>
            </div>
        </div>

    )
}

