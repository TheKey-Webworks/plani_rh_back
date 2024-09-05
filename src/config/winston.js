import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Asegúrate de que la carpeta "log" exista
const logDir = 'log';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const { combine, timestamp, printf } = winston.format;

// Formato personalizado para los mensajes de log
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Configuración del logger
const logger = winston.createLogger({
  level: 'info', // Establece el nivel mínimo para que los logs sean registrados
  format: combine(
    timestamp(), // Agrega timestamp a los logs
    logFormat    // Usa el formato personalizado
  ),
  transports: [
    // Transporte para la consola
    new winston.transports.Console({
      format: winston.format.simple(), // Formato simple para la consola
    }),
    // Transporte para guardar en un archivo dentro de la carpeta "log"
    new winston.transports.File({
      filename: path.join(logDir, 'application.log'), // Ruta al archivo dentro de la carpeta "log"
      format: combine(
        timestamp(), // Agrega timestamp a los logs en el archivo
        logFormat    // Usa el formato personalizado
      )
    })
  ]
});
export default logger;
