import Trashbin from "./icons/Trashbin.jsx";

function SheetTableElement (props) {

    let modificationDate = new Date(props.modificationDate);

    const handleDelete = () => {
        props.setCurrentFileDeleteName(props.name)
        props.setCurrentFileDeleteId(props.id)
    }

    return <tr className="cursor-pointer" onClick={props.onOpen} id={props.id}>
        <th>{props.id}</th>
        <th>{props.name}</th>
        <td>{modificationDate.toLocaleString()}</td>
        <td><label className="btn btn-solid-error" htmlFor="delete-modal" onClick={handleDelete}><Trashbin /></label></td>
    </tr>
}

export default SheetTableElement;