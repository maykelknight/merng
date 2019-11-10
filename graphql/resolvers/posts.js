const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');
const {AuthenticationError } = require('apollo-server');
module.exports = {
    Query: {
        async getPosts () {
            try {
                console.log('Tr');
                const posts = await Post.find().sort({createdAt: -1});
                return posts;
            } catch (err) {
                throw new Error(err)
            }
        },
        getPost: async (parent, {postId}) => {
            try {
                console.log('postId', postId);
                const post = await Post.findById(postId);
                console.log('post', post);
                if(post) {
                   return post
                }
                throw new Error('Post not found')
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        createPost: async (parent, {body}, context) => {
            const user = checkAuth(context);
            console.log("USER", user)
            //successful authenticated
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();

            return post;
        },
        deletePost: async (parent, args, context) => {
            const {postId} = args;
            console.log('postId', postId);

            const user = checkAuth(context);
            console.log('user', user);
            try {
                const post = await Post.findById(postId);
                if(post.username === user.username) {
                    await post.delete()
                    return "Post deleted successfully"
                }
                throw new AuthenticationError('Action not allowed!')
            } catch (err) {
                throw new Error(err)
            }

        }
    }
};
