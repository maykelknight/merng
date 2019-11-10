const Post = require('../../models/Post');

module.exports = {
    Query: {
        async getPosts () {
            try {
                console.log('Tr');
                const posts = await Post.find();
                return posts;
            } catch (err) {
                throw new Error(err)
            }
        },
        getPost: async (parent, {postId}) => {
            try {
                const post = await Post.findById(postId);
                if(post) {
                   return post
                }
                throw new Error('Post not found')
            } catch (err) {
                throw new Error(err)
            }
        }
    }
};
