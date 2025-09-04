/**
 * John Polasek
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';
const EXERCISE_CLASS = 'exercise';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true}


});

const Exercise = mongoose.model(EXERCISE_CLASS, exerciseSchema);

function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function validate(name, reps, weight, unit, date){
     if (typeof(name) !== 'string' || typeof(reps) !== 'number' || typeof(weight) !== 'number' || typeof(unit) !== 'string' || typeof(unit) !== 'string'){         //check type
        return 1;
    }
    if (name.length < 1 || reps < 1 || weight < 1 || (unit !== 'kgs' && unit !== 'lbs') || !isDateValid(date)){         //check values
        return 1;
    }
    return 0;
}

const createExercise = async (name, reps, weight, unit, date) => {
    if(validate(name, reps, weight, unit, date) === 1){
        return 1;
    }
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save();
}

const getExercises = async () => {                                                                                      //get all exercises
    const query = Exercise.find();                
    return query.exec();
}

const getOneExercise = async (data) => {                                                                                //search for Exercise based on id
    const query = Exercise.findById(data._id);          
    return query.exec();
}

const updateExercise = async (data, name, reps, weight, unit, date) => {                                                //update exercise based on id and only update values in filter
    if(validate(name, reps, weight, unit, date) === 1){
        return 1;
    }
    const update = Exercise.findOneAndUpdate({_id: data._id}, {name, reps, weight, unit, date}, {new: true});           //new true returns the new updated values
    return update.exec();
}

const deleteID = async (data) => {                                                                                      //delete exercise with the given id

    const update = Exercise.deleteOne({_id: data._id});
    const result = await update.exec();
    
    return result.deletedCount;
}


export { connect, createExercise, getExercises, getOneExercise, updateExercise, deleteID};