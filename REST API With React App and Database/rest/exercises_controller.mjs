/**
 * John Polasek.
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const ERROR_NOT_FOUND = {Error: "Not found"};
const ERROR_INVAL_REQ = {Error: "Invalid request"};

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});

app.post('/exercises', asyncHandler(async (req, res) => {
    const exercise = await exercises.createExercise(req.body.name, 
                            req.body.reps, 
                            req.body.weight,
                            req.body.unit,
                            req.body.date
                        );
    if(exercise === 1){
        res.status(400).json(ERROR_INVAL_REQ);
    }
    else{
         res.status(201).json(exercise);
    }
}));

app.get('/exercises', asyncHandler(async (req, res) => {                                                   
           
    const exercise = await exercises.getExercises();                                                           
    res.status(200).json(exercise);                                                                        
}));

app.get('/exercises/:_id', asyncHandler(async (req, res) => {                                                
    const exercise = await exercises.getOneExercise(req.params);                                                        
    if (exercise !== null){
        res.status(200).json(exercise);                                                                    
    }
    else {                                                                                              
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));

app.put('/exercises/:_id', asyncHandler(async (req, res) => {                                                          
    const exercise = await exercises.updateExercise(req.params, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date);
    if (exercise === 1){                                                                                 
        res.status(400).json(ERROR_INVAL_REQ);
    }
    else if (exercise === null){
        res.status(404).json(ERROR_NOT_FOUND);
    }
    else {                                                                                             
        res.status(200).json(exercise);
    }
}));


app.delete('/exercises/:_id', asyncHandler(async (req, res) => {                                                              
    const num = await exercises.deleteID(req.params);
    if(num === 1){                                                                                      
        res.status(204).send();
    }
    else{                                                                                              
        res.status(404).json(ERROR_NOT_FOUND)
    }
    
}));