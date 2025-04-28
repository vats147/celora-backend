 
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({ filename: './src/logs/error.log', level: 'error' }),
        new transports.File({ filename: './src/logs/combined.log' }),
    ],
});

module.exports = logger;
