import Log from '../Log'
import React from 'react';


function Profil() {
    return (
        <div className="profil-page">
            <div className="log-container">
                <Log signin={false} signup={true}/>
                <div className='img-container'>
                    <img src='../../public/img/log.svg' alt='img-log' />
                </div>
            </div>   
        </div>
    )
}
export default Profil;