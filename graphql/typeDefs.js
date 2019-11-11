const gql = require('graphql-tag');

const typeDefs = gql`    
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
        likesCount: Int!
        commentsCount: Int!
    }
    
    type Comment {
        id: ID!,
        createdAt: String!
        username: String!
        body: String!
    }
    
    type Like {
        id: ID!
        createdAt: String!
        username: String!
    }
    
    input RegisterInput {
        username: String!,
        password: String!,
        confirmPassword: String!,
        email: String!
    }
    
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User,
        createPost(body: String!): Post!
        deletePost(postId: String!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post
        likePost(postId: ID!): Post
    }

    type Query {
        getPosts: [Post]
        getPost(postId: String!): Post
    }
    
    type Subscription {
        newPost: Post!
    }
`;

module.exports = typeDefs;
