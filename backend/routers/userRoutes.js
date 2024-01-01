const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Sign up a new user
router.post('/signup', userController.signUp);

// Log in a user
router.post('/login', userController.logIn);

// Add Freelancer Card
router.post('/addfreelancercard', authenticateToken, userController.addCardFreelancer);

// Get ClientCard
router.get('/getclientCard', authenticateToken, userController.getclientCard);
router.get('/getfreelancerCard',authenticateToken,userController.getfreelancerCard)
// Update user profile
router.put('/profile', authenticateToken, userController.updateProfile);

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }

    req.user = user;
    next();
  });
}

module.exports = router;
