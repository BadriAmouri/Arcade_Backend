const express = require('express');
require('dotenv').config();

const teamRoutes = require('./Routes/teamRoute');
const gameRoutes = require('./Routes/gameRoute');
const scoreRoutes = require('./Routes/scoreRoute');

const app = express();
app.use(express.json());

// Routes 
app.use('/api/teams', teamRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/scores', scoreRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// future improvements 
// Ranking of teams ()