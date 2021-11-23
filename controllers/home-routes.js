const router = require('express').Router();
const path = require("path"); //for working with file and directory paths
const { Workout } = require('../models');

// Route for exercises page
router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

// Route for stats page
router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;