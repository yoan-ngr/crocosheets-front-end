import React, {useState} from "react";

function Register () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const handleMailType = (e) => {
        setEmail(e.target.value)
    };

    return <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold">Inscription</h1>
            <p className="text-sm">Creez un compte pour accéder à CrocoSHEET</p>
        </div>
        <div className="form-group">
            <div className="form-field">
                <label className="form-label">Adresse Email</label>

                <input
                    placeholder="adresse mail"
                    type="email"
                    className="input max-w-full"
                    value={email}
                    onChange={handleMailType}
                />                <label className="form-label">
                <span className="form-label-alt">Please enter a valid email.</span>
            </label>
            </div>

            <div className="form-field">
                <label className="form-label">Prénom</label>

                <input
                    placeholder="prenom"
                    type="email"
                    className="input max-w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />                <label className="form-label">
            </label>
            </div>

            <div className="form-field">
                <label className="form-label">Nom</label>

                <input
                    placeholder="nom"
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
                        placeholder="mot de passe"
                        type="password"
                        className="input max-w-full"
                        value={password}
                        onChange={handleMailType}
                    />                </div>
            </div>

            <div className="form-field">
                <label className="form-label">Confirmation du mot de passe</label>
                <div className="form-control">
                    <input
                        placeholder="confirmation mot de passe"
                        type="password"
                        className="input max-w-full"
                        value={password}
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
                    <a className="link link-underline-hover link-primary text-sm">Don't have an account yet? Sign up.</a>
                </div>
            </div>
        </div>
    </div>
}

export default Register;