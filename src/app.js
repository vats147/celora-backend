 
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorMiddleware');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX || 100,
});
app.use(limiter);

// Routes
app.use('/api/v1/auth', authRoutes);

// Error Middleware
app.use(errorHandler);

module.exports = app;
