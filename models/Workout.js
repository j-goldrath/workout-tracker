const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        duration: {
            type: Number,
            required: true,
            trim: true,
        },
        distance: {
            type: Number,
            trim: true
        },
        weight: {
            type: Number,
            trim: true
        },
        reps: {
            type: Number,
            trim: true,
        },
        _id: false,
    }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;