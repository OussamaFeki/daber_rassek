const express = require('express');
const router = express.Router(); 
const reviewController = require('./controllers/reviewController');
router.post('/reviews',reviewController.createReview);
router.get('/reviews/average-rating/:employeeId', reviewController.getAverageRatingForEmployee);
module.exports = router;