import PageTitle from "../components/PageTitle.jsx";
import Trashbin from "../components/icons/Trashbin.jsx";
import {Link} from "react-router-dom";
import SheetTableElement from "../components/SheetTableElement.jsx";
import {useState} from "react";

function Dashboard () {

    const [currentFileNameToDelete, setCurrentFileNameToDelete] = useState("");
    const [currentFileIdToDelete, setCurrentFileIdToDelete] = useState(-1);

    const handleFileDelete = () => {

    }

    return <div className="w-3/4 mx-auto">

        <input className="modal-state" id="delete-modal" type="checkbox" />
        <div className="modal">
            <label className="modal-overlay" htmlFor="delete-modal"></label>
            <div className="modal-content flex flex-col gap-5">
                <label htmlFor="delete-modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                <h2 className="text-xl font-semibold">Attention !</h2>
                <span>Vous êtes sur le point de supprimer le fichier <b>{currentFileNameToDelete}</b>. Cette action est irréversible ! Êtes-vous sûr(e) de votre choix?</span>
                <div className="flex gap-3">
                    <label className="btn btn-error btn-block" htmlFor="delete-modal" onClick={handleFileDelete}>Supprimer</label>
                    <label className="btn btn-block" htmlFor="delete-modal">Annuler</label>
                </div>
            </div>
        </div>

        <PageTitle text="Dashboard" />
        <Link to="/sheet" className="btn btn-outline-primary mb-6">Nouveau document</Link>
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
                    id={0}
                    name={"Document de test"}
                    modificationDate={"30/11/2023 13:44"}
                    setCurrentFileDeleteName={setCurrentFileNameToDelete}
                    setCurrentFileDeleteId={setCurrentFileIdToDelete}
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