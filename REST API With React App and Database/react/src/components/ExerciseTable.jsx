import OrderRow from './ExerciseRow'

function CreateTable({exercises, onDelete, onEdit}){
    return (
        <div className='item-table-div'>
            <table className='item-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Units</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {exercises.map((exercises, index) => <OrderRow exercises={exercises} key={index} onDelete={onDelete} onEdit={onEdit}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default CreateTable;