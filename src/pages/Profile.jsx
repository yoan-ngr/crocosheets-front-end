import PageTitle from "../components/PageTitle.jsx";
import {useCookies} from "react-cookie";
import React from "react";
import {Link} from "react-router-dom";
import CrocoSurf from '../assets/surfing.png';

function Profile () {
    const [cookies, setCookies] = useCookies(["user"])
    return <div className="w-3/4 mx-auto">

        <div className="my-12">
            <PageTitle text="Profil" />
            <div className="mx-16 text-center">
                <p className="text-xl" >Vos informations</p>
                <div className="mt-8 w-96 mx-auto">
                    <div className=" flex justify-between text-left my-5">
                        <p className="font-semibold">Nom</p>
                        <p className="text-content3">{cookies.user.last_name}</p>
                    </div>
                    <div className=" flex justify-between text-left my-5">
                        <p className="font-semibold">Prénom</p>
                        <p className="text-content3">{cookies.user.first_name}</p>
                    </div>
                    <div className=" flex justify-between text-left my-5">
                        <p className="font-semibold">Email</p>
                        <p className="text-content3">{cookies.user.email}</p>
                    </div>
                </div>

                <img src={CrocoSurf} className="w-52 mx-auto mt-16" />
                <p className="mt-3 text-sm text-content3">Crocodile stickers created by Stickers - <a className="link link-primary link-ghost-primary text-sm" href="https://www.flaticon.com/free-stickers/crocodile" title="crocodile stickers">Flaticon</a></p>
            </div>
        </div>

    </div>
}

export default Profile;