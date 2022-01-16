import { GraphQLServer, PubSub } from 'graphql-yoga';
import * as db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Club from './resolvers/Club';
import Event from './resolvers/Event';
import Message from './resolvers/Message';
import Subscription from './resolvers/Subscription';
import mongo from './mongo'

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Club,
    Event,
    Message,
    Subscription,
  },
  playground: { version: '1.7.25' },
  context: {
    db,
    pubsub,
  },
});
mongo(); 
server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
