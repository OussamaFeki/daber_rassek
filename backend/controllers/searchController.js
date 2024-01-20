const User = require('../models/user');
//prendre le controler de review 
const reviewController = require('../controllers/reviewController');
const searchController = {
    searchUsers : async (req, res) => {
        try {
          const searchTerm = req.query.q; // Search term
          const searchField = req.query.field; // Field to search on
          // in case of the input search is empty
          if (!searchTerm || !searchField) {
            const users = await User.find();
            const usersWithReviews = await Promise.all(users.map(async (user) => {
              const rate = await reviewController.getmean(user._id);
              return { ...user.toObject(), rate };
            }));
            // console.log(usersWithReviews);
            res.json(usersWithReviews);
          }
          // in case of the iput search is not empty
          else{
            // Use a regular expression for case-insensitive search
          const regex = new RegExp(searchTerm, 'i');
      
          // Define an object to map field names to their corresponding MongoDB field names
          const fieldMapping = {
            name: 'name',
            role: 'role',
            city:'city',         
            // Add more fields as needed
          };
      
          const fieldName = fieldMapping[searchField];
      
          if (!fieldName) {
            return res.status(400).json({ error: 'Invalid search field' });
          }
      
          const query = { [fieldName]: regex };
      
          const users = await User.find(query);
          res.json(users);
          }
          
          
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }

    }
};
module.exports =searchController;