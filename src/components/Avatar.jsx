import {useEffect, useState} from "react";

function Avatar (props) {

    const [initials, setInitials] = useState("");

    useEffect(() => {
        if(!props.username || props.count)
            return;
        let words = props.username.split(' ');
        let tmp = "";
        for (let i = 0; i < words.length; i++) {
            tmp += words[i].charAt(0).toUpperCase();
        }
        setInitials(tmp)
    }, []);

    return <span className="tooltip tooltip-bottom" data-tooltip={props.count ? "et " + props.count + " autres membres" : props.username}>
        <div className={"avatar truncate" + (props.color ? ' bg-' + props.color + '-8' : '')}>
            <div>{props.count ? "+ " + props.count + "..." : initials}</div>
        </div>
    </span>
}

export default Avatar;