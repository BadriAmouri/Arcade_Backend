const express = require('express');
require('dotenv').config();

const teamRoutes = require('./Routes/teamRoute');
const gameRoutes = require('./Routes/gameRoute');
const scoreRoutes = require('./Routes/scoreRoute');
const registrationRoutes = require('./Routes/registrationRoute');
const cors = require('cors');

const app = express();


// Allow CORS from all origins
app.use(cors());

// Allow CORS from all origins (for preflight requests)
app.options('*', cors());

  

  

app.use(express.json());

// Routes 
app.use('/api/teams', teamRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/registration', registrationRoutes);


// Start Server
const PORT = process.env.PORT || 3000;

// Export the Express app (Required for Vercel)
module.exports = app;

//app.listen(PORT, () => {
 // console.log(`Server running on port ${PORT}`);
//});


// future improvements 
// Ranking of teams ()