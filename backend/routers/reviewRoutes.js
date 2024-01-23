const express = require('express');
const router = express.Router(); 
const reviewController = require('../controllers/reviewController');
const trustController = require('../controllers/trustController')
router.post('/add',reviewController.createReview);
router.get('/average-rating/:employeeId', reviewController.getAverageRatingForEmployee);
router.post('/addtrust',trustController.createTrusts)
module.exports = router;