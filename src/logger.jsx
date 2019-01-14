import winston from 'winston';
import fs from 'fs';
import path from 'path'

export const Logger = ({path: logPath}) => {

  const transports = [];
  if (logPath) {
    if (!fs.existsSync(logPath)) {
      fs.mkdirSync(logPath);
    }

    transports.push(new winston.transports.File({
      filename: path.join(logPath, 'error.log'),
      level: 'error'
    }));

    transports.push(new winston.transports.File({
      filename: path.join(logPath, 'info.log')
    }));
  }

  const logger = winston.createLogger({level: 'info', format: winston.format.json(), transports});

  if (process.env.NODE_ENV !== 'production' || logPath === null) {
    logger.add(new winston.transports.Console({level: "debug", format: winston.format.simple()}));
    logger.add(new winston.transports.Console({format: winston.format.simple()}));
  }

  return logger;
};
