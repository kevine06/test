import { NavLink } from "react-router-dom";




function LeftNav() {
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to='/' exact activeclassName='active-left-nav'>
                        <img src="../../public/img/icons/home.svg" alt="home" />
                    </NavLink>
                    <NavLink to='/treding' exact activeclassName='active-left-nav'>
                        <img src="../../public/img/icons/rocket.svg" alt="rocket" />
                    </NavLink>
                    <NavLink to='/profil' exact activeclassName='active-left-nav'>
                        <img src="../../public/img/icons/user.svg" alt="user" />
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default LeftNav