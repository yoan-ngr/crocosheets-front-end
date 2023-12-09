import Avatar from "./Avatar.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {AlertError, AlertSuccess} from "./Alert.jsx";
import {useParams} from "react-router-dom";

function InviteModal () {

    const [members, setMembers] = useState([]);
    const [notMembers, setNotMembers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const params = useParams();

    useEffect(() => {
        refreshMemberList()
        refreshNotMemberList()
    }, []);

    useEffect(() => {
        refreshSuggestions()
    }, [notMembers]);

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

    function refreshNotMemberList () {
        axios.get('http://localhost:3000/api/sheet/' + params.id + '/notmembers')
            .then(res => {
                setError("")
                setNotMembers(res.data.data)
            })
            .catch(err => {
                console.log(err)
                setSuccess("")
                setError("Une erreur est survenue lors de la récupération des membres. Veuillez réessayer.")
            });
    }

    function refreshSuggestions () {
        let tmp = [];
        if(search.length >= 2){
            for (let i = 0; i < notMembers.length; i++) {
                if(notMembers[i].first_name.toLowerCase().includes(search.toLowerCase()) ||
                    notMembers[i].last_name.toLowerCase().includes(search.toLowerCase()) ||
                    notMembers[i].email.toLowerCase().includes(search.toLowerCase()))
                    tmp.push(notMembers[i])
            }
        }
        setSuggestions(tmp)
    }

    function addMember (id) {
        axios.post('http://localhost:3000/api/sheet/adduser/' + params.id, {idUser : id})
            .then(() => {
                setSuccess("Membre ajouté avec succès !")
                setError("")
                refreshMemberList()
                refreshNotMemberList()
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
                refreshNotMemberList()
            })
            .catch(err => {
                console.log(err)
                setSuccess("")
                setError("Une erreur est survenue lors de l'ajout du membre. Veuillez réessayer.")
            });
    }

    const handleSearchType = (e) => {
        setSearch(e.target.value)
        refreshSuggestions()
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

                    <div className="w-full dropdown">
                        <input className="input input-block input-ghost-secondary"
                               placeholder="Adresse e-mail ou nom..."
                               value={search}
                               onChange={handleSearchType}
                        />
                        <div className="dropdown-menu w-full">
                            {
                                suggestions.map(suggestion => {
                                    return <a key={suggestion.id} onClick={() => addMember(suggestion.id)} className="dropdown-item text-sm">
                                        <div className="flex">
                                            <span>{suggestion.first_name + " " + suggestion.last_name.toUpperCase()}</span>
                                            <span className="ml-1 text-content3">({suggestion.email})</span>
                                        </div></a>
                                })
                            }
                        </div>
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