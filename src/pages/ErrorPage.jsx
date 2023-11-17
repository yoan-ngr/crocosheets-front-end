import {Link} from "react-router-dom";
import Crocosad from "../assets/crocosad.png";

function ErrorPage () {
    return <div className="pt-8">
        <img src={Crocosad} className="mx-auto w-48" />
        <h1 className="text-center text-5xl font-semibold">Oups ! Une erreur est survenue.</h1>
        <p className="text-center mt-8">Réessayez plus tard, revenez <Link className="link link-primary" to={-1}>en arrière</Link> ou revenez à l'accueil.</p>

        <div className="flex justify-center mt-6"><Link to={'/'} className="btn btn-outline-primary">Accueil</Link></div>
    </div>
}

export default ErrorPage;