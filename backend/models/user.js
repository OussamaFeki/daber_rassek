const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  firstname:{ type: String, required: false},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthday: { type: Date }, 
  gender: { type: String, enum: ['male','female'] },
  role: { type: String},
  time: {
    from: { type: String },
    to: { type: String }
  },
  needs: [{ type: String }], 
  availability: {
    from: { type: String },
    to: { type: String }
  },
  picture: { type: String },
  phone:{type: Number},
  city: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
