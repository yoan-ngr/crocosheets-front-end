import Trashbin from "./icons/Trashbin.jsx";

function SheetTableElement (props) {
    return <tr className="cursor-pointer" onClick={props.onOpen}>
        <th>{props.name}</th>
        <td>{props.modificationDate}</td>
        <td><button className="btn btn-solid-error" onClick={props.onDelete}><Trashbin /></button></td>
    </tr>
}

export default SheetTableElement;