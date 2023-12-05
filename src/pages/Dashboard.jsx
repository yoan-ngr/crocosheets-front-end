import PageTitle from "../components/PageTitle.jsx";
import Trashbin from "../components/icons/Trashbin.jsx";
import {Link, redirect, useNavigate} from "react-router-dom";
import axios from "axios";
import SheetTableElement from "../components/SheetTableElement.jsx";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {AlertError, AlertSuccess} from "../components/Alert.jsx";

function Dashboard () {

    const [currentFileNameToDelete, setCurrentFileNameToDelete] = useState("");
    const [currentFileIdToDelete, setCurrentFileIdToDelete] = useState(-1);

    const [cookies, setCookies] = useCookies();
    const navigate = useNavigate();

    const [userDocuments, setUserDocuments] = useState([]);
    const [error, setError] = useState("");
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    useEffect(() => {

        updateSheets();
    }, []);

    const handleFileDelete = () => {
        axios.delete('http://localhost:3000/api/sheet/' + currentFileIdToDelete)
            .then (() => {
                setDeleteSuccess(true);
                setError("");
                updateSheets();
            })
            .catch (err => {
                setError("Une erreur est survenue lors de la suppression du fichier. (" + err.message + ")")
                setDeleteSuccess(false);
                //console.log(err)
            })
    }

    function updateSheets () {
        axios.get('http://localhost:3000/api/sheets/' + cookies.user.id)
            .then(res => {
                setUserDocuments(res.data.data);
            })
            .catch(err => {
                setError("Une erreur est survenue lors de la récupération des documents.")
            });
    }

    function openSheet (id) {
        navigate('/sheet/' + id);
        return;
    }



    const handleCreateSheet = () => {

        axios.post('http://localhost:3000/api/sheet/', {
            proprietaire: cookies.user?.id
        })
            .then(function (response) {
                console.log(response);
                openSheet(response.data.data.maxSheet)
                //setCookies("user", response.data);
                //setGeneralError("");
            })
            .catch(function (error) {
                //setGeneralError("id du compte invalid.");
                console.log(error)
                //alert(error);
            });

    };


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

        {
            error !== "" && <div className="mx-auto max-w-3xl mt-12"><AlertError title="Oups !" details={error}/></div>
        }
        {
            deleteSuccess && <div className="mx-auto max-w-3xl mt-12"><AlertSuccess title="Succès !" details={<span>Le fichier "<span className="font-semibold">{currentFileNameToDelete}</span>" a été supprimé avec succès !</span>}/></div>
        }

        <div className="my-12">
            <PageTitle text="Tableau de bord"/>
            <div className="flex justify-between mt-12">
                <p className="text-lg"><span className="font-semibold">Bienvenue</span>, {cookies.user.first_name}</p>
                <button className="btn btn-outline-primary mb-6" onClick={handleCreateSheet}>Nouveau
                document</button>
            </div>
            <div className="flex overflow-x-auto">
                <table className="table-hover table-zebra table">
                    <thead>
                    <tr>
                        <th className="w-[4%]">#</th>
                        <th className="w-3/5">Nom du fichier</th>
                        <th>Date de modification</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        userDocuments.map(document => <SheetTableElement key={document.idSheet}
                            id={document.idSheet}
                            name={document.nomDocument}
                            modificationDate={document.dateDeModification}
                            setCurrentFileDeleteName={setCurrentFileNameToDelete}
                            setCurrentFileDeleteId={setCurrentFileIdToDelete}
                            onOpen={() => openSheet(document.idSheet)}
                        />)
                    }
                    </tbody>
                </table>
            </div>
            {
                userDocuments.length === 0 && <p className="text-center my-6 text-zinc-500">Il semblerait que vous n'ayez aucun fichier à votre nom.
                Créez-en un à l'aide du bouton <span className="font-semibold text-blue-500">Nouveau document</span> en
                haut à droite !</p>
            }
        </div>
    </div>
}

export default Dashboard;