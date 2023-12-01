import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function LoggedRoute (props) {

    const [cookies, setCookies] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        if(!cookies.user){
            navigate('/login', {state: {errId:1}});
        }
    }, []);

    return <>{props.element}</>
}

export default LoggedRoute;