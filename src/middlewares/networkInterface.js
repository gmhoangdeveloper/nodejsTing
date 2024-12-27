const os = require('os');
export const networkInterfaces = async (req, res, next) => {
    const results = os.networkInterfaces();
    req.networks = results
    return next();
};