const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const upload =require('../upload/upimg');
const fs=require("fs");
//prendre le controler de review 
const reviewController = require('../controllers/reviewController');
//get the trust Controller
const trustController= require('../controllers/trustController')
// Function to generate a JWT token
function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };

  const options = {
    expiresIn: '1d', // You can customize the expiration time
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}
// Define the middleware for uploading a single file
const uploadSingle = upload.single('picture');
// handler of Aad or Edit a Freelancer Card
const addCardFreelancerHandler = async (req, res) => {
  try {
    const userid = req.user;
    console.log(userid);   
    // Continue processing or sending the response
    uploadSingle(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      // Prepare the update data based on request body
    const updateData = {
      name: req.body.name,
      firstname: req.body.firstname,
      birthday: req.body.birthday,
      gender: req.body.gender,
      role: req.body.role,
      availability: {
        from: req.body.from,
        to: req.body.to
      },
      phone:req.body.phone,
      city: req.body.city,
    };
    const previous=await User.findById(userid);
      // Check if a file is uploaded and update the picture field accordingly
      if (req.file) {
        if(previous.picture){
          const previousImageName = previous.picture.split('/').pop();
          fs.unlink('./images/'+previousImageName, (err) => {
            if (err) {
              console.error('Error deleting previous image:', err);
            } else {
              console.log('Previous image deleted successfully');
            }
          });
        }
        updateData.picture = `http://localhost:3000/image/${req.file.filename}`;
      }

      // Fetch the updated user
      // Use User.updateOne to update the user
      console.log(req.body.from)
      await User.updateOne({ _id: userid }, updateData);
      const updatedUser = await User.findById(userid);

      res.status(200).json({
        name: updatedUser.name,
        firstname: updatedUser.firstname,
        email: updatedUser.email,
        birthday: updatedUser.birthday,
        gender: updatedUser.gender,
        role: updatedUser.role,
        needs: updatedUser.needs,
        availability: updatedUser.availability,
        picture: updatedUser.picture,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// handler of Aad or Edit a Client Card
const addClientCardHandler = async (req, res) => {
  try {
    const userid = req.user;
    // console.log(userid);   
    // Continue processing or sending the response
    uploadSingle(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      // Prepare the update data based on request body
    
      const updateData = {
        name: req.body.name,
        firstname: req.body.firstname,
        birthday: req.body.birthday,
        gender: req.body.gender,
        needs: req.body.needs,
        time: {
          from: req.body.from,
          to: req.body.to
        },
        city: req.body.city,
        phone:req.body.phone
      };
    const previous=await User.findById(userid);
      // Check if a file is uploaded and update the picture field accordingly
      if (req.file) {
        if(previous.picture){
          const previousImageName = previous.picture.split('/').pop();
          fs.unlink('./images/'+previousImageName, (err) => {
            if (err) {
              console.error('Error deleting previous image:', err);
            } else {
              console.log('Previous image deleted successfully');
            }
          });
        }
        updateData.picture = `http://localhost:3000/image/${req.file.filename}`;
      }

      // Fetch the updated user
      // Use User.updateOne to update the user
      await User.updateOne({ _id: userid }, updateData);
      const updatedUser = await User.findById(userid);

      res.status(200).json({
        name: updatedUser.name,
        firstname: updatedUser.firstname,
        email: updatedUser.email,
        birthday: updatedUser.birthday,
        gender: updatedUser.gender,
        role: updatedUser.role,
        needs: updatedUser.needs,
        availability: updatedUser.availability,
        picture: updatedUser.picture,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Controller methods
const userController = {
  // Sign up a new user
  signUp: async (req, res) => {
    try {
      const {email, password} = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Generate and send back a JWT token for the new user
      const token = generateToken(newUser);
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Log in a user
  logIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate and send back a JWT token for the logged-in user
      const token = generateToken(user);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get freelancer card 
  getfreelancerCard: async (req, res) => {
    try {
      // Assuming you have middleware that extracts user information from the token
      // and attaches it to the request (e.g., req.user)
      const userid = req.user;
      const user=await User.findById(userid);
      // prendre le moyen de rate de review 
      const rate=await reviewController.getmean(userid)
      res.status(200).json({
        name: user.name,
        firstname: user.firstname,
        birthday: user.birthday,
        gender: user.gender,
        role: user.role,
        availability: user.availability,
        picture: user.picture,
        phone:user.phone,
        city:user.city,
        rate
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  //Get ClientCard
  getclientCard: async (req, res) => {
    try {
      // Assuming you have middleware that extracts user information from the token
      // and attaches it to the request (e.g., req.user)
      const userid = req.user;
      const user=await User.findById(userid);
      res.status(200).json({
        name: user.name,
        firstname: user.firstname,
        email: user.email,
        birthday: user.birthday,
        gender: user.gender,
        needs: user.needs,
        time:user.time,
        phone:user.phone,
        city:user.city,
        picture: user.picture,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


  // Update user profile
  updateProfile: async (req, res) => {
    try {
      // Assuming you have middleware that extracts user information from the token
      // and attaches it to the request (e.g., req.user)
      const user = req.user;

      // Update user profile based on request body
      user.name = req.body.name || user.name;
      user.firstname = req.body.firstname || user.firstname;
      user.birthday = req.body.birthday || user.birthday;
      user.gender = req.body.gender || user.gender;
      user.role = req.body.role || user.role;
      user.time=req.body.time || user.time;
      user.needs = req.body.needs || user.needs;
      user.availability = req.body.availability || user.availability;
      user.picture = req.body.picture || user.picture;

      await user.save();

      res.status(200).json({
        name: user.name,
        firstname: user.firstname,
        email: user.email,
        birthday: user.birthday,
        gender: user.gender,
        role: user.role,
        needs: user.needs,
        availability: user.availability,
        picture: user.picture,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  // Add or Editer freelancer card
  addCardFreelancer:addCardFreelancerHandler,
  //Add or Editer client card
  addClientCard:addClientCardHandler,
  getProfile: async (req, res) => {
    try {
      // Assuming you have middleware that extracts user information from the token
      // and attaches it to the request (e.g., req.user)
      const userid = req.user;
      const user=await User.findById(userid);
      const rate=await reviewController.getmean(userid);
      // count the raviewers of employee
      const numRaters = await reviewController.getNumRaters(userid);
      //the mean of trust rate of client
      const trustrate = await trustController.getmean(userid);
      // count the trusters of client
      const numtruster= await trustController.getNumTrusters(userid);
      res.status(200).json({
        name: user.name,
        firstname: user.firstname,
        email: user.email,
        birthday: user.birthday,
        gender: user.gender,
        role: user.role,
        needs: user.needs,
        availability: user.availability,
        time:user.time,
        city:user.city,
        picture: user.picture,
        phone:user.phone,
        rate,
        numRaters,
        trustrate,
        numtruster
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  changePassword: async(req, res)=>{
    try{
      const { currentPassword, newPassword } = req.body;
      const userid = req.user;
      const user=await User.findById(userid);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid current password' });
    }
      // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedNewPassword;
    await user.save();

    return res.json({ message: 'Password changed successfully' });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  }
};

 

module.exports = userController;
