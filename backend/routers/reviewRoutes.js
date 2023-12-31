const express = require('express');
const router = express.Router(); 
const reviewController = require('../controllers/reviewController');
router.post('/add',reviewController.createReview);
router.get('/average-rating/:employeeId', reviewController.getAverageRatingForEmployee);
module.exports = router;