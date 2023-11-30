import Trashbin from "./icons/Trashbin.jsx";

function SheetTableElement (props) {

    const handleDelete = () => {
        props.setCurrentFileDeleteName(props.name)
        props.setCurrentFileDeleteId(props.id)
    }

    return <tr className="cursor-pointer" onClick={props.onOpen} id={props.id}>
        <th>{props.name}</th>
        <td>{props.modificationDate}</td>
        <td><label className="btn btn-solid-error" htmlFor="delete-modal" onClick={handleDelete}><Trashbin /></label></td>
    </tr>
}

export default SheetTableElement;