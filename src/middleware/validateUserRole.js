import errors from '../utils/errors';
import User from '../v1/models/User';

export default function (roles) {
    if (!Array.isArray(roles)) {
        roles = [roles];
    }
    return async (req, res, next) => {
        try {
            req.user = await User.findByEmail(req.email);
            if (roles.indexOf(req.user.role) === -1) {
                let rolesFormatted = roles.length > 1 ? roles.join(', ') : roles[0];
                return next(new errors.Forbidden(`Only ${rolesFormatted} have permission to execute this operation`));
            }
            next();
        } catch (err) {
             next(err);
        }
    };
}
