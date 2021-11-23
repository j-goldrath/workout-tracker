const router = require('express').Router();
const db = require('../../models');
const mongoose = require("mongoose");

// GET route to retrieve last workout
router.get('/', (req, res) => {
    db.Workout.aggregate([
        { $sort: { day: -1 } },
        { $limit: 1 },
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
                totalWeight: { $sum: "$exercises.weight" }
            }
        }
    ])
        .then(dbWorkout => {
            res.status(200).json(dbWorkout[0]);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// PUT route to add exercise to workout
router.put('/:id', (req, res) => {
    db.Workout.findByIdAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, { new: true, useFindAndModify: false })
        .then(dbWorkout => {
            res.status(200).json(dbWorkout);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// POST route to create new workout
router.post('/', ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.status(200).json(dbWorkout);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// GET route to retreive workout ranges
router.get('/range', (req, res) => {
    db.Workout.aggregate([
        { $sort: { day: -1 } },
        { $limit: 7 },
        { $sort: { day: 1 } },
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
                totalWeight: { $sum: "$exercises.weight" }
            }
        }
    ])
        .then(dbWorkout => {
            res.status(200).json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;