import Log from '../Log'
import React , {useContext } from 'react';
import { UidContext } from "../AppContext"
import UpdateProfil from '../Profil/updateProfil';


function Profil() {
    const uid = useContext(UidContext)

    return (
        <div className="profil-page">
            { uid ? (
                <UpdateProfil />
            ) : (
                <div className="log-container">
                    <Log signin={false} signup={true}/>
                <div className='img-container'>
                    <img src='../../public/img/log.svg' alt='img-log' />
                </div>
            </div>   
            )}      
        </div>
    )
}
export default Profil;