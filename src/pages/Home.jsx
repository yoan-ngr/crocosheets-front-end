import Input from "../components/Input.jsx";
import {useState} from "react";
import {Link} from "react-router-dom";
import PromoBanner1 from '../assets/promo_banner_1.png'
import PromoBanner2 from '../assets/promo_banner_2.png'

function Home () {

    return <div>
        <div className="bg-green-8 py-20">
            <h1 className="text-7xl font-bold text-center">CrocoSheets</h1>
            <h2 className="text-center text-xl text-content2 mt-3">Gérez vos feuilles de calcul simplement et efficacement, en direct avec vos collaborateurs !</h2>
        </div>
        <div className="flex">
            <div className="w-5/12">
                <div className="my-16">
                    <p className="text-center text-3xl font-semibold">Une application simple</p>
                    <p className="text-justify mx-8 mt-3"><span className="font-semibold">CrocoSheets</span> a un
                        fonctionnement simple, à la portée de tous. Son interface claire et ergonomique vous permettra
                        de gérer aisément toutes vos feuilles de calcul, sans prise de tête !</p>
                </div>
            </div>
            <div className="w-7/12 ">
                <img className="h-72 w-full object-cover" src={PromoBanner1} />
            </div>
        </div>
        <div className="flex">
            <div className="w-7/12 ">
                <img className="h-72 w-full object-top object-cover" src={PromoBanner2} />
            </div>
            <div className="w-5/12">
                <div className="my-16">
                    <p className="text-center text-3xl font-semibold">Travaillez à plusieurs</p>
                    <p className="text-justify mx-8 mt-3">Profitez des fonctionnalités de CrocoSheets pour travailler à plusieurs sur le même document, en temps réel ! Efefctuez vos modifications et voyez celles-ci immédiatement reportées sur l'ordinateur de vos collaborateurs !</p>
                </div>
            </div>
        </div>
        <div className="bg-gray-6 py-16">
            <h2 className="text-5xl font-semibold text-center">Prêt(e) à démarrer?</h2>
            <p className="text-center mt-2">Inscrivez-vous pour commencer à utiliser CrocoSheets !</p>
            <div className="flex justify-center mt-6"><Link to={'/login'} className="btn btn-outline-success">Commencer</Link></div>
        </div>

        <div className="flex justify-between px-8 my-6">
            <div>
                <p className="text-lg font-semibold">CrocoSheets</p>
                <p className="text-sm text-content3">
                    Projet de Design Patterns<br/>
                    Master 1 Informatique - Année 2023-2024<br/>
                    Faculté des Sciences & Technologies de Nancy
                </p>
            </div>
            <div >
                <p>Membres du projet</p>
                <ul className="text-content3 text-sm">
                    <li><span className="mr-3">-</span>Hugo BIENVENOT</li>
                    <li><span className="mr-3">-</span>Julien FERAUX</li>
                    <li><span className="mr-3">-</span>Matthieu GALANTE</li>
                    <li><span className="mr-3">-</span>Yoan NOUGUÉ-RUIZ</li>
                </ul>
            </div>
        </div>
    </div>
}

export default Home;