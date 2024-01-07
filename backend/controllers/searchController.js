const User = require('../models/user');
const searchController = {
    searchUsers : async (req, res) => {
        try {
          const searchTerm = req.query.q; // Search term
          const searchField = req.query.field; // Field to search on
      
          if (!searchTerm || !searchField) {
            return res.status(400).json({ error: 'Search term and field are required' });
          }
      
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
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }

    }
};
module.exports =searchController;