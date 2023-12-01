import {useEffect} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

function LoggedRoute (props){
    const [cookies, setCookies] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        if(!cookies.user){
            navigate('/login', {state: {errId : 1}})
            return;
        }
    }, []);

    return cookies.user ? props.element : null;
}

export default LoggedRoute;