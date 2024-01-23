const mongoose = require('mongoose');
const Review = require('../models/reviews');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { clientId, employeeId, rating } = req.body;

    if (rating < 0 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 0 and 5' });
    }

    // Check if a review already exists for the client-employee pair
    const existingReview = await Review.findOne({ clientId, employeeId });
    if (existingReview) {
      // Update the existing review
      existingReview.rating = rating;
      await existingReview.save();
      const rate = await this.getmean(employeeId);
      const numRaters = await this.getNumRaters(employeeId);
      res.status(200).json({ message: 'Review updated successfully',rate,numRaters});
    } else {
      // Create a new review
      const review = new Review({ clientId, employeeId, rating });
      await review.save();
      const rate = await this.getmean(employeeId);
      const numRaters = await this.getNumRaters(employeeId);
      res.status(201).json({ message: 'Review added successfully',rate,numRaters});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Get average rating for a specific employee
exports.getAverageRatingForEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const averageRating = await calculateMeanRating(employeeId);
    res.status(200).json({ averageRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Helper function to calculate average rating for a specific employee
//export mean rating
exports.getmean= async function calculateMeanRating(employeeId) {
  try {
    const reviews = await Review.find({employeeId:employeeId});

    if (reviews.length === 0) {
      return 0; // Return 0 if there are no reviews for the employee
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const meanRating = totalRating / reviews.length;

    return meanRating;
  } catch (error) {
    console.error(error);
    throw new Error('Error calculating mean rating');
  }
}
//export number of raters 
exports.getNumRaters = async function getNumRaters(employeeId) {
  try {
    const numRaters = await Review.countDocuments({ employeeId: employeeId });
    return numRaters;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting the number of raters');
  }
}

