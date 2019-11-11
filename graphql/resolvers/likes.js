const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');
const {AuthenticationError } = require('apollo-server');

module.exports = {
  Mutation: {
      likePost: async (parent, args, context) => {
          const {postId} = args;
          const user = checkAuth(context);

          const post = await Post.findById(postId);
          if(post){

              const likeIndex = post.likes.length ? post.likes.findIndex(like => like.username === user.username) : -1;

              if(likeIndex > -1) {
                  console.log('HERE!', likeIndex);
                  post.likes.splice(likeIndex, 1);
              } else {
                  const newLike = {
                      username: user.username,
                      createdAt: new Date().toISOString()
                  };
                  post.likes.push(newLike);
              }
              post.save();
              return post;
          }
          throw new Error('Post not found');
      }
  }
};
