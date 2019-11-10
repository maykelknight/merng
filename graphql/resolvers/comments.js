const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');
const {UserInputError} = require('apollo-server');

module.exports = {
    Mutation: {
        createComment: async (parent, args, context) => {
            const {postId, body} = args;
            const user = checkAuth(context)
            if(body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: { body: 'Comment must not be empty'}
                })
            }

            const post = Post.findById(postId);

        }
    },
    Query: {

    }
};
