import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import expressWinston from 'express-winston';

const errorRotateTransport = new DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error',
});

const infoRotateTransport = new DailyRotateFile({
    filename: path.join('logs', 'info-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HHMM',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'info',
});

const combinedRotateTransport = new DailyRotateFile({
    filename: path.join('logs', 'combined-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HHMM',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});

const logFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} - [${level}]: ${message}`;
});

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'MM-YY-DD HH:MM:ss' }),
        logFormat,
    ),
    timestamp: true,
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.timestamp({ format: 'MM-YY-DD HH:MM:ss' }),
                logFormat,
            ),
        }),
        errorRotateTransport,
        infoRotateTransport,
        combinedRotateTransport,
    ],
});

export const accessLogger = expressWinston.logger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.timestamp({ format: 'MM-YY-DD HH:MM:ss' }),
                logFormat,
            ),
        }),
        new DailyRotateFile({
            filename: path.join('logs', 'access-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HHMM',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            format: format.combine(
                format.timestamp({ format: 'MM-YY-DD HH:MM:ss' }),
                logFormat,
            ),
        }),
    ],
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: true,
});

export const expressErrorLogger = expressWinston.errorLogger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.timestamp({ format: 'MM-YY-DD HH:MM:ss' }),
                logFormat,
            ),
        }),
        new DailyRotateFile({
            filename: path.join('logs', 'express-error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HHMM',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            format: format.combine(
                format.timestamp({ format: 'MM-YY-DD HH:MM:ss' }),
                logFormat,
            ),
        }),
    ],
});
