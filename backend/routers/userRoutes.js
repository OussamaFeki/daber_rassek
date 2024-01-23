const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken= require('../middlewares/authoMiddleware');

// Sign up a new user
router.post('/signup', userController.signUp);

// Log in a user
router.post('/login', userController.logIn);

// Add Freelancer Card
router.put('/addfreelancercard', authenticateToken, userController.addCardFreelancer);
//Add Client Card Route 
router.put('/addclientcard', authenticateToken, userController.addClientCard);
// Get ClientCard
router.get('/getclientCard', authenticateToken, userController.getclientCard);
router.get('/getfreelancerCard',authenticateToken,userController.getfreelancerCard)
//GET user profile
router.get('/profile', authenticateToken, userController.getProfile);
// Update user profile
router.put('/profile', authenticateToken, userController.updateProfile);
module.exports = router;
