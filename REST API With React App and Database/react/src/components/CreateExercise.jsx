import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

	
function CreateExercise() {
    const [name, setName] = useState('');
    const [reps, setReps] =  useState(1);
    const [weight, setWeight] =  useState(1);
    const [unit, setUnit] =  useState('lbs');
    const [date, setDate] =  useState('');

  const navigate = useNavigate();

  const postExercise = async () => {
  const newExercise = { name, reps, weight, unit, date};
  const response = await fetch('/exercises', {
    method: 'POST',
    body: JSON.stringify(newExercise),
    headers: { 'Content-Type': 'application/json'}
  });
  if(response.status === 201){
    alert("Successfully added the exercise!");
  } else {
    alert(`Failed to add exercise, status code = ${response.status}`);
  }
  navigate("/");
};
    
    return (
      <form className='reg-form'>
        <fieldset className='reg-field'>
            <legend>Add Exercise</legend>
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
            postExercise();
            e.preventDefault();
        }}>Submit</button>
      </form>
     );
}
	
export default CreateExercise;