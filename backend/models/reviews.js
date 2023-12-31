const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model for client
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model for employee
    rating: { type: Number, required: true, min: 0, max: 5},
  });
  const review = mongoose.model('Review', reviewSchema);

module.exports = review;