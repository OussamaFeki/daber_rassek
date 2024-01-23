const trust= require('../models/trust')
//export mean rating
exports.getmean= async function calculateMeanRating(clientId) {
    try {
      const trusts = await trust.find({clientId:clientId});
  
      if (trusts.length === 0) {
        return 0; // Return 0 if there are no trusts for the employee
      }
  
      const totalRating = trusts.reduce((sum, review) => sum + review.rating, 0);
      const meanTrust = totalRating / trusts.length;
  
      return meanTrust;
    } catch (error) {
      console.error(error);
      throw new Error('Error calculating mean rating');
    }
}
exports.createTrusts = async (req, res) => {
    try {
      const { clientId, employeeId, rating } = req.body;
  
      if (rating < 0 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 0 and 5' });
      }
      // Check if a review already exists for the client-employee pair
      const existingTrust = await trust.findOne({ clientId, employeeId });
      
      if (existingTrust) {
        // Update the existing Trust
        existingTrust.rating = rating;
        await existingTrust.save();
        //
        const trustrate = await this.getmean(clientId);
        const numtruster= await this.getNumTrusters(clientId);
        res.status(200).json({ message: 'Trust updated successfully', trustrate, numtruster });
      } else {
        // Create a new Trust
        const Trust = new trust({ clientId, employeeId, rating });
        await Trust.save();
        const trustrate = await this.getmean(clientId);
        const numtruster= await this.getNumTrusters(clientId);
        res.status(201).json({ message: 'Trust added successfully', trustrate , numtruster });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
//export number of Trusters 
exports.getNumTrusters = async function getTrusters(clientId) {
  try {
    const numRaters = await trust.countDocuments({ clientId: clientId });
    return numRaters;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting the number of raters');
  }
}