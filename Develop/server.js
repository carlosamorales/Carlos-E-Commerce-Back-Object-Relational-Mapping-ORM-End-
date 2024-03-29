const express = require('express');
const debug = require('debug')('app:server');
const apiRoutes = require('./routes/api'); // Import the main API routes
const sequelize = require('./config/connection'); // Import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount all API routes under the /api prefix
app.use('/api', apiRoutes);

debug('Starting server...');

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    debug(`App listening on port ${PORT}!`);
  });
}).catch((error) => {
  debug('Error syncing Sequelize models:', error);
});

module.exports = app;
