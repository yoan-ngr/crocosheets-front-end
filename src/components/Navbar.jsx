import {useEffect, useState} from "react";
import {Link, redirect} from "react-router-dom";
import Logo from "../assets/crocosheets.png";
import {useCookies} from "react-cookie";
import axios from "axios";

function Navbar () {

    const [loggedIn, setLoggedIn] = useState(true);

    const [cookies, setCookies] = useCookies(["user"])

    const handleLogOut = () => {
        setCookies("user", null);
        axios.post('http://localhost:3000/api/auth/logout', {
            id : cookies.user.id
        })
        .then(result => {
            console.log("Déconnecté")
        }).catch(err => {
            console.log(err)
        });
    }

    return <div className="navbar rounded-lg">
        <div className="navbar-start">
            <Link className="navbar-item text-lg font-semibold" to='/' ><img src={Logo} className="w-8 h-8 inline" /><span className="align-middle ml-1">CrocoSheets</span></Link>
        </div>
        <div className="navbar-end">
            {
                cookies.user ? <div className="avatar avatar-ring avatar-md">
                    <div className="dropdown-container">
                        <div className="dropdown">
                            <label className="btn btn-ghost flex cursor-pointer px-0" tabIndex="0">
                                <div>{cookies.user?.first_name?.charAt(0).toUpperCase() + cookies.user?.last_name?.charAt(0).toUpperCase()}</div>
                            </label>
                            <div className="dropdown-menu dropdown-menu-bottom-left">
                                <Link to='/dashboard' className="dropdown-item text-sm">Mes documents</Link>
                                <Link to='/profile' tabIndex="-1" className="dropdown-item text-sm">Mon profil</Link>
                                <a tabIndex="-1" className="dropdown-item text-sm" onClick={handleLogOut}>Déconnexion</a>
                            </div>
                        </div>
                    </div>
                </div> :
                    <div>
                        <Link to='/login' className="link">S'identifier</Link>
                    </div>
            }
        </div>
    </div>
}

export default Navbar;