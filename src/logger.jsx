import winston from 'winston';
import fs from 'fs';
import path from 'path'

export const Logger = ({path: logPath}) => {

  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
  }

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({
        filename: path.join(logPath, 'error.log'),
        level: 'error'
      }),
      new winston.transports.File({
        filename: path.join(logPath, 'info.log')
      })
    ]
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({level: "debug", format: winston.format.simple()}));
    logger.add(new winston.transports.Console({format: winston.format.simple()}));
  }

  return logger;
};
