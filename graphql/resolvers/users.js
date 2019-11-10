const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');
const {validateRegisterInput, validateLoginInput} = require('../../utils/validators');


function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, 'SECRET_TEST', {expiresIn: '1h'});
}

module.exports = {
    Mutation: {
        async register (parent, args, context, info) {
            let {registerInput: {username, password, confirmPassword, email}} = args;

            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);

            if (!valid) {
                throw new UserInputError('Errors occured', {errors});
            }

            //Throw error if user exists
            const user = await User.findOne({username});
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }

            password = await bcrypt.hash(password, 12);

            //save user
            const newUser = new User({
                username,
                email,
                password,
                confirmPassword,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }
        },

        async login(parent, args, context, info) {
            let {username, password} = args;

            const {valid, errors} = validateLoginInput(username, password);
            if(!valid) {
                throw new UserInputError('Login Input error', {errors})
            }

            const user = await User.findOne({username});
            if(!user ) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', {errors})
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                errors.general = 'User not found';
                throw new UserInputError('Wrong cridentials', {errors})
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }; 
        }
    }
};
