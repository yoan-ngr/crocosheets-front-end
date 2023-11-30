import PageTitle from "../components/PageTitle.jsx";
import Trashbin from "../components/icons/Trashbin.jsx";
import {Link} from "react-router-dom";
import SheetTableElement from "../components/SheetTableElement.jsx";
import {useCookies} from "react-cookie";
import React from "react";

function Profile () {
    const [cookies, setCookies] = useCookies(["user"])
    return <div >

        <PageTitle text="Profil" />
        <div className="mx-16 text-center">
            <p className="text-xl" >Vos informations</p>
            <div className="mx-[36rem] my-12" >
                <p className="text-xl text-left my-5" >Nom</p>
                <p className="text-xl text-left my-5" >Prénom</p>
                <p className="text-xl text-left my-5" >Email</p>
                <p className="text-xl text-left my-5" >Mot de passe</p>
            </div>
        </div>

    </div>
}

export default Profile;