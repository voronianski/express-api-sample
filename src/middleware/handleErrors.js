const ErrorHandlers = {
    'SchemaValidationError'(err) {
        let { errors } = err;

        errors = Object.keys(errors)
            .reduce((memo, key) => {
                return memo.concat(errors[key]);
            }, [])
            .map(err => {
                return { field: err.key, message: err.message };
            });

        return { status: 400, errors };
    }
};

function defaultHandler (err) {
    let status = err.status || 500;
    let errors = Array.isArray(err) ? err : [err];

    if (status === 500) {
        console.error(err.stack);
        errors = [{message: 'Internal Server Error'}];
    }

    return { status, errors };
}

// http://jsonapi.org/format/#errors
export default function (err, req, res, next) {
    let errorHandler = ErrorHandlers[err.name] || defaultHandler;
    let { status, errors } = errorHandler(err);
    res.status(status).json({ errors });
}
