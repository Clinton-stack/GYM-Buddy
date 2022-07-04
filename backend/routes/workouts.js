const express = require("express");
const router = express.Router();

const {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
} = require("../controllers/workoutController");

//Get all workouts
router.get("/", getAllWorkouts)

//Get a single workout
router.get("/:id", getWorkout)

//post a new workout
router.post("/", createWorkout);

//delete a single workout
router.delete("/:id", deleteWorkout)

//update a single workout
router.patch("/:id", updateWorkout)
module.exports = router;
