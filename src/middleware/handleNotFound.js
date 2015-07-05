import errors from '../utils/errors';

export default function (req, res, next) {
    return next(new errors.NotFound());
}
