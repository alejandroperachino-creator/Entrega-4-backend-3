import { Router } from 'express';
import logger from '../utils/logger.js';

const router = Router();

router.get('/', (req, res) => {
    logger.info('logger route ok', {
        requestId: req.requestId,
        method: req.method,
        path: req.originalUrl,
    });

    res.json({
        ok: true,
        requestId: req.requestId,
        message: 'logger route ok',
    });
});

router.get('/test', (req, res) => {
    logger.debug('prueba de nivel debug', {
        requestId: req.requestId,
        method: req.method,
        path: req.originalUrl,
    });

    logger.http('prueba de nivel http', {
        requestId: req.requestId,
        method: req.method,
        path: req.originalUrl,
    });

    logger.info('prueba de nivel info', {
        requestId: req.requestId,
        method: req.method,
        path: req.originalUrl,
    });

    logger.warning('prueba de nivel warning', {
        requestId: req.requestId,
        method: req.method,
        path: req.originalUrl,
    });

    logger.error('prueba de nivel error', {
        requestId: req.requestId,
        method: req.method,
        path: req.originalUrl,
        stack: new Error('error de prueba del logger').stack,
    });

    logger.fatal('prueba de nivel fatal', {
        requestId: req.requestId,
        method: req.method,
        path: req.originalUrl,
    });

    res.json({
        ok: true,
        message: 'se generaron logs en todos los niveles',
        requestId: req.requestId,
    });
});

router.get('/error', (req, res, next) => {
    logger.warning('logger test error', {
        requestId: req.requestId,
        method: req.method,
        path: req.originalUrl,
    });

    const error = new Error('logger test error');
    error.statusCode = 400;
    error.code = 'TEST_LOGGER_ERROR';
    next(error);
});

export default router;
