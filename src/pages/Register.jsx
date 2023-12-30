import React, {useState} from "react";
import Input from "../components/Input.jsx";
import {Link} from "react-router-dom";
import axios from "axios";
import {AlertError, AlertSuccess} from "../components/Alert.jsx";
import bcrypt from "bcryptjs";
import PasswordInput from "../components/PasswordInput.jsx";

function Register () {

    const [email, setEmail] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [prenomError, setprenomError] = useState('');
    const [nomError, setnomError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [generalError, setGeneralError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSignUp = () => {

        bcrypt.hash(password, 10, function (err, result){
            if (!err){
                axios.post("http://82.165.236.248:3000/api/user/", {
                    "email" : email,
                    "password" : password,
                    "last_name" : nom,
                    "first_name" : prenom
                })
                    .then(() => {
                        setGeneralError("");
                        setSuccess(true)
                    })
                    .catch((e) => {
                        console.log(e)
                        setGeneralError(e.response);
                        setSuccess(false)
                    });
            }else {
                setGeneralError("problème de hachage");
                setSuccess(false)
            }
        });


    };

    const handleMailType = (e) => {

        const re = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
        if (re.test(e.target.value)){
            setEmailError("")
        }else {
            setEmailError("Veuillez entrer une adresse email valide.")
        }
        //console.log(emailError)
        setEmail(e.target.value)
    };

    const handlePrenom = (e) => {

        if (e.target.value.length >= 2){
            setprenomError("")

        }else {
            setprenomError("Veuillez entrer un prénom valide, d'au moins 2 caractères.")
        }
        setPrenom(e.target.value)
    };

    const handleNom = (e) => {

        if (e.target.value.length >= 2){
            setnomError("")

        }else {
            setnomError("Veuillez entrer un nom valide, d'au moins 2 caractères.")
        }
        setNom(e.target.value)
    };

    const handleMotDePasse = (e) => {

        const re = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}:;<>,.?~\\[\\]\\-\\\\\\/])[\\w!@#$%^&*()_+{}:;<>,.?~\\[\\]\\-\\\\\\/]{8,}$")
        if (re.test(e.target.value)){
            setPasswordError("")
        }else {
            setPasswordError("Veuillez entrer un mot de passe composé d'au moins 8 caractères, dont une majuscule, une minuscule et un caractère spécial.")
        }
        setPassword(e.target.value);
        setConfirmPasswordError(e.target.value != confirmPassword ? "Les mots de passe doivent être identiques." : "");
    };

    const handleMdpConfirmation = (e) => {
        setConfirmPasswordError(e.target.value != password ? "Les mots de passe doivent être identiques." : "");
        setConfirmPassword(e.target.value);
    }


    return <div className="mx-auto flex w-full max-w-sm flex-col gap-6 mt-12">
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-semibold">Inscription</h1>
            <p className="text-sm">Creez un compte pour accéder à CrocoSheets</p>
        </div>

        {generalError !== "" && <AlertError title={"Oups ! Une erreur est survenue."} details={"" + generalError} />}
        {success && <AlertSuccess title={"Succès !"} details={"Votre inscription a été réalisée avec succès !"} />}

        <div className="form-group">
            <Input
                label="Adresse email"
                type="email"
                placeholder="mail@exemple.fr"
                error={emailError}
                value={email}
                onChange={handleMailType}
            />



            <Input
                label="Prénom"
                type="text"
                placeholder="Prénom"
                error={prenomError}
                value={prenom}
                onChange={handlePrenom}
            />

            <Input
                label="Nom"
                type="text"
                placeholder="Nom"
                error={nomError}
                value={nom}
                onChange={handleNom}
            />

            <PasswordInput
                label="Mot de passe"
                error={passwordError}
                value={password}
                onChange={handleMotDePasse}
                />

            <PasswordInput
                label="Confirmer le mot de passe"
                error={confirmPasswordError}
                value={confirmPassword}
                onChange={handleMdpConfirmation}
            />

            <div className="form-field pt-5">
                <div className="form-control justify-between">
                    <button type="button" className="btn btn-success w-full" onClick={handleSignUp}>
                        S'inscrire
                    </button>
                </div>
            </div>

            <div className="form-field mb-6">
                <div className="form-control justify-center">
                    <Link to="/login" className="link link-underline-hover link-primary text-sm">Vous avez déjà un compte? Connectez-vous !</Link>
                </div>
            </div>
        </div>
    </div>
}

export default Register;