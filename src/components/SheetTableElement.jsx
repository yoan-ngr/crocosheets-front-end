import Trashbin from "./icons/Trashbin.jsx";
import {Link} from "react-router-dom";
import EyeIcon from "./icons/EyeIcon.jsx";

function SheetTableElement (props) {

    let modificationDate = new Date(props.modificationDate);

    const handleDelete = () => {
        props.setCurrentFileDeleteName(props.name)
        props.setCurrentFileDeleteId(props.id)
    }

    return <tr id={props.id}>
        <th>{props.id}</th>
        <th>{props.name}</th>
        <td>{modificationDate.toLocaleString()}</td>
        <td>
            <span className="tooltip tooltip-bottom" data-tooltip="Ouvrir le document">
                <label className="btn btn-solid-primary" htmlFor="delete-modal" onClick={props.onOpen}><EyeIcon /></label>
            </span>
            {
                props.showDelete && <span className="tooltip tooltip-bottom" data-tooltip="Supprimer le document">
                    <label className="btn btn-solid-error ml-3" htmlFor="delete-modal" onClick={handleDelete}><Trashbin /></label>
                </span>
            }
        </td>
    </tr>
}

export default SheetTableElement;