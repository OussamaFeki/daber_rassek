const mongoose = require('mongoose');
const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { clientId, employeeId, rating, comment } = req.body;
    if (rating < 0 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 0 and 5' });
      }
    const review = new Review({ clientId, employeeId, rating, comment });
    await review.save();
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get average rating for a specific employee
exports.getAverageRatingForEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const averageRating = await calculateAverageRating(employeeId);
    res.status(200).json({ averageRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Helper function to calculate average rating for a specific employee
async function calculateAverageRating(employeeId) {
  try {
    const result = await Review.aggregate([
      {
        $match: { employeeId: mongoose.Types.ObjectId(employeeId) },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
        },
      },
    ]);

    return result.length > 0 ? result[0].averageRating : 0;
  } catch (error) {
    console.error(error);
    throw new Error('Error calculating average rating');
  }
}