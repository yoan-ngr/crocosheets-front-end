import React, { useState } from 'react';
import {Link} from "react-router-dom";
import EyeSlashIcon from "../components/icons/EyeSlashIcon.jsx";
import EyeIcon from "../components/icons/EyeIcon.jsx";
import axios, {Axios} from "axios";
import bcrypt from "bcrypt";
import {AlertError, AlertSuccess} from "../components/Alert.jsx";


function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [generalError, setGeneralError] = useState("");
    const [success, setSuccess] = useState(false);
    const handleSignIn = () => {

        bcrypt.hash(password, 10,function (err, result){
            if (!err){
                axios.post('api/user/auth', {
                    email: email,
                    password: password
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        alert(error);
                    });
            }else {
                setGeneralError("problème de hachage");
                setSuccess(false)
            }
        });


    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return <div className="mx-auto flex w-full max-w-sm flex-col gap-6 mt-12">
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-semibold">Connexion</h1>
            <p className="text-sm">Connectez-vous à votre compte CrocoSheets</p>
        </div>
        {generalError !== "" && <AlertError title={"Oups ! Une erreur est survenue."} details={"" + generalError} />}
        {success && <AlertSuccess title={"Succès !"} details={"votre inscription a été réalisée avec succès !"} />}
        <div className="form-group">
            <div className="form-field">
                <label className="form-label">Adresse email</label>

                <input
                    placeholder="mail@exemple.fr"
                    type="email"
                    className="input max-w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />                <label className="form-label">

                </label>
            </div>
            <div className="form-field">
                <label className="form-label">Mot de passe</label>
                <div className="form-control">
                    <input
                        placeholder="••••••••••"
                        type={showPassword ? 'text' : 'password'}
                        className="input max-w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" className="btn btn-ghost px-1.5" onClick={togglePasswordVisibility}>
                        {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </button>
                </div>
            </div>
            <div className="form-field mt-3">
                <div className="form-control justify-between">
                    <div className="flex gap-2">
                        <input type="checkbox" className="switch" />
                        <a href="#">Se souvenir de moi</a>
                    </div>
                    <label className="form-label">
                        <a className="link link-underline-hover link-primary text-sm">Mot de passe oublié?</a>
                    </label>
                </div>
            </div>
            <div className="form-field pt-5">
                <div className="form-control justify-between">
                    <button type="button" className="btn btn-primary w-full" onClick={handleSignIn}>
                        Se connecter
                    </button>
                </div>
            </div>

            <div className="form-field">
                <div className="form-control justify-center">
                    <Link to='/register' className="link link-underline-hover link-primary text-sm">Vous n'avez pas encore de compte? Inscrivez-vous!</Link>
                </div>
            </div>
        </div>
    </div>
}

export default Login;