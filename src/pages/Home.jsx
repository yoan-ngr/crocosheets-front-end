import Input from "../components/Input.jsx";
import {useState} from "react";
import {Link} from "react-router-dom";

function Home () {

    return <div>
        <div className="bg-green-8 py-20">
            <h1 className="text-7xl font-bold text-center">CrocoSheets</h1>
            <h2 className="text-center text-xl text-content2 mt-3">Gérez vos feuilles de calcul simplement et efficacement, en direct avec vos collaborateurs !</h2>
        </div>
        <div>
            1 : c'est simple
        </div>
        <div>
            2 : c'est en live
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