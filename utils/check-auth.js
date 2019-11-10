const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../.env.test')
const {AuthenticationError} = require('apollo-server');
module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, SECRET_KEY)
                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid or expired token');
            }
        }
        throw new Error('Authenticated token must be \'Bearer [token]\'');
    }
    throw new Error('Authorization header must be provided');
};
