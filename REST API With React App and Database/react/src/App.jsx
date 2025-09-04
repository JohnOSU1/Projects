import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import HomePage from './pages/HomePage'
import CreateExercisePage from './pages/CreateExercisePage'
import EditExercisePage from './pages/EditExercisePage'
import Navigation from './components/Navigation'

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
  
    <div>
      <header>
        <h1>Exercises Extravaganza!</h1>
        <p>Exercises Extravaganza is an exercise app that helps you track your exercises.</p>      
      </header>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
        <Route path="/create" element={ <CreateExercisePage/>}></Route>
        <Route path="/edit" element={ <EditExercisePage exerciseToEdit={exerciseToEdit}/>}></Route>
      </Routes>
    </Router>
    <footer>
      <p>© 2025 John Polasek</p>
    </footer>
  </div>

  )
}

export default App
