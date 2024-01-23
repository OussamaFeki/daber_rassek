const mongoose = require('mongoose');
const trustSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model for employee
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model for client
    rating: { type: Number, required: true, min: 0, max: 5},
  });
  const trust= mongoose.model('trust', trustSchema );
module.exports = trust;