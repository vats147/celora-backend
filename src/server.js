  require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const app = require('./app');
const connectDB = require('./config/database');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;

connectDB();

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    logger.info(`Server started on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
