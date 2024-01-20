const express = require('express');
const { urlencoded } = require('express');
const app = express();
const port = 3000;
const { disconnectFromMongoDB } = require('./connection/db');
const cors = require('cors');
const reviewRoutes = require('./routers/reviewRoutes');
const userRoutes=require('./routers/userRoutes');
const searchRoutes=require('./routers/searchRoutes')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(urlencoded({extended:true}))
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
 // adjust the path if needed
 

// Connect to MongoDB
app.use('/image',express.static('images'))
app.use('/review', reviewRoutes);
app.use('/user', userRoutes);
app.use('/search',searchRoutes);

// Add your Express routes and middleware here

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Close MongoDB connection when the app is closed
process.on('SIGINT', () => {
  disconnectFromMongoDB()
    .then(() => {
      console.log('Disconnected from MongoDB. Closing server...');
      server.close();
    })
    .catch((error) => {
      console.error('Error disconnecting from MongoDB:', error);
      process.exit(1);
    });
});
