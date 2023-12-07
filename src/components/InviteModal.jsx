import Avatar from "./Avatar.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {AlertError, AlertSuccess} from "./Alert.jsx";
import {useParams} from "react-router-dom";

function InviteModal () {

    const [members, setMembers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const params = useParams();

    useEffect(() => {
        refreshMemberList()
    }, []);

    function refreshMemberList () {
        axios.get('http://localhost:3000/api/sheet/' + params.id + '/members')
            .then(res => {
                //console.log(res.data.data)
                setError("")
                setMembers(res.data.data)
            })
            .catch(err => {
                console.log(err)
                setSuccess("")
                setError("Une erreur est survenue lors de la récupération des membres. Veuillez réessayer.")
            });
    }

    function addMember (id) {
        axios.post('')
            .then(() => {
                setSuccess("Membre ajouté avec succès !")
                setError("")
                refreshMemberList()
            })
            .catch(err => {
                console.log(err)
                setSuccess("")
                setError("Une erreur est survenue lors de l'ajout du membre. Veuillez réessayer.")
            });
    }

    function deleteMember (id) {
        axios.delete('http://localhost:3000/api/sheet/' + params.id + '/user/' + id)
            .then(() => {
                setSuccess("Membre supprimé avec succès !")
                setError("")
                refreshMemberList()
            })
            .catch(err => {
                console.log(err)
                setSuccess("")
                setError("Une erreur est survenue lors de l'ajout du membre. Veuillez réessayer.")
            });
    }

    const handleSearchType = (e) => {

    }

    return <>
    <input className="modal-state" id="modal-1" type="checkbox" />
    <div className="modal">
        <label className="modal-overlay" htmlFor="modal-1"></label>
        <div className="modal-content flex flex-col gap-5 w-[32rem]">
            <label htmlFor="modal-1" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <h2 className="text-xl">Inviter des collaborateurs</h2>
            <div>
                {
                    error !== "" && <AlertError title="Oups !" details={error}/>
                }
                {
                    success !== "" && <AlertSuccess title="Succès !" details={success} />
                }
                <p className="mb-2 mt-2">Rechercher un utilisateur</p>
                <div className="flex gap-2">
                    <div className="w-full dropdown ">
                        <input className="input input-block input-ghost-secondary"
                               placeholder="Adresse e-mail ou nom..."/>
                        <div className="dropdown-menu w-full">
                            <a className="dropdown-item text-sm">Profile</a>
                            <a className="dropdown-item text-sm">Account settings</a>
                            <a className="dropdown-item text-sm">Subscriptions</a>
                        </div>
                    </div>
                    <button className="btn btn-success">Ajouter</button>
                </div>
            </div>
            <div>
                <p className="mb-3">Membre(s) actuel(s)</p>
                {
                    members.length === 0 ? <p className="text-content3 text-sm">Vous n'avez invité aucun collaborateur pour le moment. Utilisez le
                            champ ci-dessus pour ajouter des membres !</p>
                        : <div className="flex flex-col gap-1.5">
                            {
                                members.map(member => {
                                    return <div key={member.id} className="flex justify-between">
                                        <div className="flex gap-2">
                                            <Avatar username={member.first_name + " " + member.last_name}/>
                                            <div className="text-sm">
                                                <p className="font-semibold">{member.first_name + " " + member.last_name}</p>
                                                <p className="text-content3">{member.email}</p>
                                            </div>
                                        </div>
                                        <button className="btn btn-outline-error btn-sm my-auto" onClick={() => deleteMember(member.id)}>Retirer</button>
                                    </div>
                                })
                            }
                        </div>
                }
            </div>

            <div className="flex gap-3">
                <label htmlFor="modal-1" className="btn w-48 mx-auto">Terminé</label>
            </div>
        </div>
    </div>
    </>
}

export default InviteModal;