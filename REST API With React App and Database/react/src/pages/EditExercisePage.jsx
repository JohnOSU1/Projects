import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function EditExercisePage({exerciseToEdit}){
        const [name, setName] = useState(exerciseToEdit.name);
        const [reps, setReps] =  useState(exerciseToEdit.reps);
        const [weight, setWeight] =  useState(exerciseToEdit.weight);
        const [unit, setUnit] =  useState(exerciseToEdit.unit);
        const [date, setDate] =  useState(exerciseToEdit.date);
    
      const navigate = useNavigate();
    
      const putExercise = async () => {
      const editedExercise = { name, reps, weight, unit, date};
      const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
        method: 'PUT',
        body: JSON.stringify(editedExercise),
        headers: { 'Content-Type': 'application/json'}
      });
      if(response.status === 200){
        alert("Successfully edited the exercise!");
      } else {
        alert(`Failed to edit exercise, status code = ${response.status}`);
      }
      navigate("/");
    };
        
        return (
          <form className='reg-form'>
            <fieldset className='reg-field'>
                <legend>Edit Exercise</legend>
                <div className="input-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="reps">Reps:</label>
                    <input type="number" id="reps" value={reps} onChange={e => setReps(Number(e.target.value))} />
                </div>
                <div className="input-group">
                    <label htmlFor="weight">Weight:</label>
                    <input type="number" id="weight" value={weight} onChange={e => setWeight(Number(e.target.value))} />
                </div>
                <div className="input-group">
                  <label htmlFor="unit">Units:</label>
                  <select name="referrer" id="unit" value={unit} onChange={e => setUnit(e.target.value)}>
                        <option value="lbs">lbs</option>
                        <option value="kgs">kgs</option>
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="date">Date:</label>
                  <input type="text" id="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
            </fieldset>
            <button type="button" onClick={e => {
                putExercise();
                e.preventDefault();
            }}>Submit</button>
          </form>
         );
}

export default EditExercisePage;