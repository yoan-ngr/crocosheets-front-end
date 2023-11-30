import PageTitle from "../components/PageTitle.jsx";
import Trashbin from "../components/icons/Trashbin.jsx";
import {Link} from "react-router-dom";
import bcrypt from "bcryptjs";
import axios from "axios";
import SheetTableElement from "../components/SheetTableElement.jsx";
import {useCookies} from "react-cookie";

function Dashboard () {

    const [cookies, setCookies] = useCookies();
    const handleCreateSheet = () => {

                axios.post('http://localhost:3000/api/sheet/', {
                    proprietaire: cookies.user?.id
                })
                    .then(function (response) {
                        console.log(response);
                        setCookies("user", response.data);
                        //setGeneralError("");
                    })
                    .catch(function (error) {
                        //setGeneralError("id du compte invalid.");
                        console.log(error)
                        //alert(error);
                    });

        };


    return <div className="w-3/4 mx-auto">

        <PageTitle text="Dashboard" />
        <Link to="/sheet" className="btn btn-outline-primary mb-6" onClick={handleCreateSheet} >Nouveau document</Link>
        <div className="flex overflow-x-auto">
            <table className="table-hover table-zebra table">
                <thead>
                <tr>
                    <th className="w-3/5">Nom du fichier</th>
                    <th>Date de modification</th>
                    <th>Supprimer</th>
                </tr>
                </thead>
                <tbody>
                <SheetTableElement
                    name={"Document de test"}
                    modificationDate={"30/11/2023 13:44"}
                />
                <tr>
                    <th>Moyenne semestre</th>
                    <td>26/10/2023 13:29</td>
                    <td><button className="btn btn-solid-error "><Trashbin /></button></td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>26/10/2023 13:29</td>
                    <td><button className="btn btn-solid-error "><Trashbin /></button></td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>26/10/2023 13:29</td>
                    <td><button className="btn btn-solid-error "><Trashbin /></button></td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>26/10/2023 13:29</td>
                    <td><button className="btn btn-solid-error "><Trashbin /></button></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
}

export default Dashboard;