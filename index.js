const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');

const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
});

mongoose.connect('mongodb+srv://maykel:WDwFQVKm7UYk5rwL@cluster0-saoco.mongodb.net/merng?retryWrites=true&w=majority', { useNewUrlParser: true})
    .then(() => {
        console.log('connected to database');
        return server.listen({port: 5000})
    })
    .then(res => console.log('Server running at: ' + res.url));

