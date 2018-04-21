import bunyan from 'bunyan';
import fs from 'fs';
import path from 'path'

export const Logger = ({
  name = 'app',
  src = true,
  lwd = 'logs'
}) => {

  if (!fs.existsSync(lwd)) {
    fs.mkdirSync(lwd, 0o770); // CHANGE TO 770 to expection
  }

  const trace = new bunyan.RingBuffer({limit: 1000});
  const logger = new bunyan.createLogger({
    name,
    src,
    streams: [
      {
        level: 'error',
        type: 'rotating-file',
        path: path.join(lwd, 'error.log'),
        period: '1d',
        count: 5
      }, {
        level: 'warn',
        type: 'rotating-file',
        path: path.join(lwd, 'warning.log'),
        period: '1d',
        count: 5
      }, {
        level: 'info',
        stream: process.stdout
      }, {
        level: 'debug',
        type: 'rotating-file',
        path: path.join(lwd, 'debug.log'),
        period: '1h',
        count: 5
      }, {
        level: 'trace',
        type: 'raw',
        stream: trace
      }
    ]
  });

  return logger;

};
