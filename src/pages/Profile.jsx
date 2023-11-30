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
            <div className="mx-[42rem] my-12" >
                <div className=" flex justify-between text-xl text-left my-5"><p>Nom</p><p>{cookies.user.last_name}</p></div>
                <div className=" flex justify-between text-xl text-left my-5"><p>Prénom</p><p>{cookies.user.first_name}</p></div>
                <div className=" flex justify-between text-xl text-left my-5"><p>Email</p><p>okapigenant@hotmail.fr</p></div>
                <div className=" flex justify-between text-xl text-left my-5"><p>Mot de passe</p><p>**********</p></div>
            </div>
        </div>

    </div>
}

export default Profile;