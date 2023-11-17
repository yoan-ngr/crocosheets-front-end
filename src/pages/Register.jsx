import React, {useState} from "react";
import Input from "../components/Input.jsx";
import {Link} from "react-router-dom";
import axios from "axios";
import {AlertError, AlertSuccess} from "../components/Alert.jsx";
import bcrypt from "bcrypt";

function Register () {

    const [email, setEmail] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [prenomError, setprenomError] = useState('');
    const [nomError, setnomError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [generalError, setGeneralError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSignUp = () => {
        bcrypt.hash(password, 10,function (err, result){
            if (!err){
                axios.post("http://localhost:3000/api/user/", {
                    "email" : email,
                    "password" : result,
                    "nom" : nom,
                    "prenom" : prenom
                })
                    .then(() => {
                        setGeneralError("");
                        setSuccess(true)
                    })
                    .catch((e) => {
                        setGeneralError(e.response.data.error);
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
            setEmailError("veuillez entrer une email valide")
        }
        console.log(emailError)
        setEmail(e.target.value)
    };

    const handlePrenom = (e) => {

        if (e.target.value.length >= 2){
            setprenomError("")

        }else {
            setprenomError("veuillez entrer un prenom valide")
        }
        setPrenom(e.target.value)
    };

    const handleNom = (e) => {

        if (e.target.value.length >= 2){
            setnomError("")

        }else {
            setnomError("veuillez entrer un nom valide")
        }
        setNom(e.target.value)
    };

    const handleMotDePasse = (e) => {

        const re = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}:;<>,.?~\\[\\]\\-\\\\\\/])[\\w!@#$%^&*()_+{}:;<>,.?~\\[\\]\\-\\\\\\/]{8,}$")
        if (re.test(e.target.value)){
            setPasswordError("")
        }else {
            setPasswordError("veuillez entrer un mot de passe d'au moins 8 caractères, une majuscule, une minuscule et un caractère spécial")
        }
        setPassword(e.target.value)
    };


    return <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold">Inscription</h1>
            <p className="text-sm">Creez un compte pour accéder à CrocoSHEET</p>
        </div>

        {generalError !== "" && <AlertError title={"Oups ! Une erreur est survenue."} details={"" + generalError} />}
        {success && <AlertSuccess title={"Succès !"} details={"votre inscription a été réalisée avec succès !"} />}

        <div className="form-group">
            <Input
                label="Adresse email"
                type="Email"
                placeholder="mail@exemple.fr"
                error={emailError}
                value={email}
                onChange={handleMailType}
            />



            <Input
                label="Prénom"
                type="Prenom"
                placeholder="prenom"
                error={prenomError}
                value={prenom}
                onChange={handlePrenom}
            />

            <Input
                label="Nom"
                type="nom"
                placeholder="nom"
                error={nomError}
                value={nom}
                onChange={handleNom}
            />

            <Input
                label="Password"
                type="Password"
                placeholder="Mot de passe"
                error={passwordError}
                value={password}
                onChange={handleMotDePasse}
            />

            <div className="form-field">
                <label className="form-label">Confirmation du mot de passe</label>
                <div className="form-control">
                    <input
                        placeholder="Confirmation mot de passe"
                        type="password"
                        className="input max-w-full"
                        value={confirmPassword}
                        onChange={(e) => setPassword(e.target.value)}
                    />                </div>
            </div>

            <div className="form-field pt-5">
                <div className="form-control justify-between">
                    <button type="button" className="btn btn-success w-full" onClick={handleSignUp}>
                        Sign Up
                    </button>
                </div>
            </div>

            <div className="form-field">
                <div className="form-control justify-center">
                    <Link to="/login" className="link link-underline-hover link-primary text-sm">Don't have an account yet? Sign up.</Link>
                </div>
            </div>
        </div>
    </div>
}

export default Register;