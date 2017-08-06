import logger from './../../logger';

export default (req, res, next) => {
    logger.log(Date.now(), req);
    next();
}
