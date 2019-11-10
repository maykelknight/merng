const gql = require('graphql-tag');

const typeDefs = gql`    
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
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
    }

    type Query {
        getPosts: [Post]
        getPost: Post
    }
`;

module.exports = typeDefs;
