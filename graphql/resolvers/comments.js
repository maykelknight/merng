const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');
const {UserInputError, AuthenticationError} = require('apollo-server');

module.exports = {
    Mutation: {
        createComment: async (parent, args, context) => {
            const {postId, body} = args;
            const user = checkAuth(context);
            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {body: 'Comment must not be empty'}
                })
            }

            console.log('postId', postId);
            const post = await Post.findById(postId);
            console.log('post', post);
            if (post) {
                post.comments.unshift({
                    body,
                    username: user.username,
                    createdAt: new Date().toISOString()
                });
                await post.save();
                return post;
            }
            throw new UserInputError("Post not found");
        },
        deleteComment: async (parent, args, context) => {
            const {postId, commentId} = args;
            const user = checkAuth(context);
            const post = await Post.findById(postId);
            if (post) {
                const commentIndex = post.comments.findIndex(comment => comment.id === commentId);
                if(!post.comments[commentIndex]) {
                    throw new UserInputError("Comment not found");
                }
                if (post.comments[commentIndex].username === user.username) {
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                }
                throw new AuthenticationError("Action not allowed");
            }
            throw new UserInputError("Post not found");
        }
    },
    Query: {}
};
