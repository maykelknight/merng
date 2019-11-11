const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentsResolvers = require('./comments');
const likesResolver = require('./likes');

module.exports = {
    Post: {
        //everytime something returns post it will be called
        //parent is a post
        likesCount: (parent) => parent.likes.length,
        commentsCount: (parent) => parent.comments.length
    },
    Query: {
        ...postResolvers.Query,
        ...userResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...likesResolver.Mutation,
    },
    Subscription: {
        ...postResolvers.Subscription
    }
};
