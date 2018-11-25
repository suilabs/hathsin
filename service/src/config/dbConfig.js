const mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

/**
 * Establishes the startup connection to MongoDB.
 * If it fails, it will try to reconnect until certain number of failures
 *
 * @param {string} dbURI - Database URI
 * @param {object} options - Connection options
 * @param {integer} reconnectTries - Max reconnection tries. Defaults to 5.
 * @param {integer} reconnectInterval - Milliseconds between tries. Defaults to 1000.
 *
 * @returns {void}
 */
const connectWithRetry = (dbURI, options = {}, reconnectTries = 5, reconnectInterval = 1000) => {
  if (reconnectTries === 0) {
    // eslint-disable-next-line no-console
    console.error('Mongoose startup connection failed. No more retrying. Exiting proces...');
    return process.exit(1);
  }
  return mongoose.connect(dbURI, options, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(`Mongoose startup connection failed. Retrying in ${reconnectInterval / 1000} sec...`);
      setTimeout(connectWithRetry, reconnectInterval, dbURI, options, reconnectTries - 1);
    }
  });
};

/**
 * Contains the logic fot managing the connection to MongoDB.
 *
 * @namespace
*/
const dbSetup = {

  connectionStatus: {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  },

  /**
   * Reads the DB connection parameters from the server configuration and connects to the DB.
   *
   * @param {object} config - DB config
   *
   * @returns {void}
   */
  init(config) {
    // Build the connection string
    const dbURI = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_SERVER}:${config.DB_PORT}/${config.DB_SCHEMA}`;

    // Create the database connection
    connectWithRetry(dbURI, {
      server: {
        auto_reconnect: true,
        reconnectTries: Number.MAX_VALUE
      },
    });

    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', () => {
      // eslint-disable-next-line no-console
      console.log(`Mongoose default connection open`);
    });

    // If the connection throws an error
    mongoose.connection.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.log(`Mongoose default connection error: ${err}`);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
      // eslint-disable-next-line no-console
      console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        // eslint-disable-next-line no-console
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
  },

  /**
   * Obtain the DB connection status.
   *
   * @returns {string} - Database connection status.
   */
  getConnectionStatus() {
    return this.connectionStatus[mongoose.connection.readyState] || 'Error';
  },

  /**
   * Returns true if the database status is connected.
   *
   * @returns {boolean} - Whether or not the database status is connected.
   */
  isStatusConnected() {
    return this.getConnectionStatus() === 'Connected';
  },
};

module.exports = dbSetup;
