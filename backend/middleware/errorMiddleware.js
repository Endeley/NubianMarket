const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // check for mongodb bad object Id

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = `Resource Not Found`;
        statusCode = 404;
    }

    // Inside errorHandler (errorMiddleware.js)
    res.setHeader('Content-Type', 'application/json'); // 👈 Add this line
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};

export { notFound, errorHandler };
