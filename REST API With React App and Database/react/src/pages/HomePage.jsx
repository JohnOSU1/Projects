import CreateTable from '../components/ExerciseTable'
import EditExercisePage from './EditExercisePage'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home({setExerciseToEdit}){
    const [exercises, setExercises] = useState([])
    const navigate = useNavigate();

    const loadExercises = async () => {
    const response = await fetch('/exercises');
    const exercises = await response.json();
    setExercises(exercises);
}

    useEffect( () => {
        loadExercises();
    }, []);

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete movie with id = ${_id}, status code = ${response.status}`)
        }
    }

    const onEdit = (exercises) => {
        setExerciseToEdit(exercises)
        navigate('/edit')
    }

    return (
        <div>
            <h2>Exercise List</h2>
            <CreateTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}/>
        </div>
    )
        
    
}

export default Home;