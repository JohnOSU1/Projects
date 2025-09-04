import { BsFillTrash3Fill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

function OrderRow({exercises, onDelete, onEdit}){
    return (
        <tr>
            <td>{exercises.name}</td>   
            <td>{exercises.reps}</td>
            <td>{exercises.weight}</td>
            <td>{exercises.unit}</td>
            <td>{exercises.date}</td>
            <td><a href= "/" onClick={e => {e.preventDefault(); onEdit(exercises);}}><MdEdit></MdEdit></a></td>
            <td><a href= "/" onClick={e => {e.preventDefault(); onDelete(exercises._id);}}><BsFillTrash3Fill/></a></td>
        </tr>
    )
}

export default OrderRow;