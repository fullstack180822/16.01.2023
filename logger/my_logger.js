const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
const config = require('config')
 
//const file_name = String((new Date()).toLocaleString()).replace('/','_').replace(':','_').replace(' ','_')
const logger = createLogger({
  level: config.logger.level,
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [new transports.Console(),
    new transports.File({
        filename: `logs/log1.log` })
    ]
})

logger.log({
  level: 'info',
  message: 'What time is the testing at?'
});

// logger.info(
//     'What time is the testing at?'
//     );

module.exports = logger