import {useState} from "react";
import {Link} from "react-router-dom";

function Navbar () {

    const [loggedIn, setLoggedIn] = useState(false);

    return <div className="navbar rounded-lg">
        <div className="navbar-start">
            <Link className="navbar-item text-lg font-semibold" to='/' >CrocoSheets</Link>
        </div>
        <div className="navbar-end">
            {
                loggedIn ? <div className="avatar avatar-ring avatar-md">
                    <div className="dropdown-container">
                        <div className="dropdown">
                            <label className="btn btn-ghost flex cursor-pointer px-0" tabIndex="0">
                                <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar"/>
                            </label>
                            <div className="dropdown-menu dropdown-menu-bottom-left">
                                <Link to='/dashboard' className="dropdown-item text-sm">Mes documents</Link>
                                <Link to='/profile' tabIndex="-1" className="dropdown-item text-sm">Mon profil</Link>
                                <a tabIndex="-1" className="dropdown-item text-sm">Déconnexion</a>
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