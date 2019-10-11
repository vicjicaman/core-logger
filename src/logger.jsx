import winston from "winston";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export const Logger = ({ path: logPath, env }) => {
  const transports = [];
  const level = env !== "production" ? "debug" : "info";

  if (logPath !== null) {
    if (!fs.existsSync(logPath)) {
      execSync("mkdir -p " + logPath);
    }

    transports.push(
      new winston.transports.File({
        filename: path.join(logPath, "error.log"),
        level: "error"
      })
    );

    transports.push(
      new winston.transports.File({
        filename: path.join(logPath, "info.log")
      })
    );
  }

  const logger = winston.createLogger({
    level,
    format: winston.format.json(),
    transports
  });

  if (env !== "production" || logPath === null) {
    logger.add(
      new winston.transports.Console({
        level: "debug",
        format: winston.format.simple()
      })
    );
  }

  return logger;
};
