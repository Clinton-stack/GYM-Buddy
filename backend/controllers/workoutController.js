const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workout
const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//get a single workout   
const getWorkout = async (req, res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: ' Oops Not found '})
    }
    const workout = await Workout.findById(id)

    if (!workout){
       return res.status(404).json({error: 'Oops Not Found'})
    }

    res.status(200).json(workout)

}

// create new workout
const createWorkout = async (req, res ) => {
    const {title, reps, load} = req.body

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'please fill in all the empty fields', emptyFields})
    }
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a new workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: ' Oops Not found '})
    }
    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout){
       return res.status(404).json({error: 'Oops Not Found'})
    }

    res.status(200).json(workout)
}

// update a workout 

const updateWorkout = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: ' Oops Not found '})
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body})

    if (!workout){
       return res.status(404).json({error: 'Oops Not Found'})
    }
    res.status(200).json(workout)

}

module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout 
}