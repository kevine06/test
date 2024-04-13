import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import { useSelector } from 'react-redux'

function Navbar() {
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer);

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/" >
                        <div className="logo">
                        <img src="../../public/img/icon.png" alt="icon" />
                        <h3>Raccoont</h3>
                        </div>
                    </NavLink>
                </div>
                { uid ? ( 
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact to="/profil">
                                <h5>Bienvenue { userData.pseudo }</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink exact to='/profil'>
                                <img src="../../public/img/icons/login.svg" alt=""/>
                            </NavLink>
                        </li>
                    </ul>
                )
                }
            </div>
        </nav>
    )
}
export default Navbar;