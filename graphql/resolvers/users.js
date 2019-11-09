const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
    Mutation: {
        async register (parent, args, context, info) {
            let {registerInput: {username, password, confirmPassword, email}} = args;
            console.log("TEST", username)
            password = await bcrypt.hash(password, 12);
            const user = new User({
                username,
                email,
                password,
                confirmPassword,
                createdAt: new Date().toISOString()
            })

            const res = await user.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, 'SECRET_TEST', {expiresIn: '1h'})

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
};
