const winston = require('winston');

const { createLogger, format, transports, } = winston
const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.errors({ stack: true }), // Handle errors (was automagic in winston@2)
      format.splat(),                 // Handle splat (was automagic in winston@2)
      format.timestamp(),             // { timestamp: true }
      format.colorize(),              // { colorize: true }
      format.simple()                 // Default serialization in winston@2
    ),
    transports: [
			new winston.transports.File({ filename: 'error.log', level: 'error' }),
    	new winston.transports.File({ filename: 'combined.log' }),
		]
  })

	module.exports = logger;