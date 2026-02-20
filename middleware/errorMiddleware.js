export const errorMiddleware = (err, request, response, next) => {
    response.status(err.status || 400).json({ message: err.message || "Internal Server Error"});
}