const express = require('express');
const app = express();
const port = 3000;
const { connectToMongoDB, client } = require('./connection/db');
const cors = require('cors');
const reviewRoutes = require('./routers/reviewRoutes');
const userRoutes=require('./routers/userRoutes')
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
 // adjust the path if needed
 app.use('/review', reviewRoutes);
 app.use('/user', userRoutes);

// Connect to MongoDB
connectToMongoDB();

// Add your Express routes and middleware here

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Close MongoDB connection when the app is closed
process.on('SIGINT', async () => {
  await client.close();
  console.log('Disconnected from MongoDB');
  process.exit();
});
