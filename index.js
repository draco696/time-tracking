import dotenv from "dotenv"
dotenv.config()

import { MongoClient } from 'mongodb'
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import { ApolloServer } from 'apollo-server';
import {GlobalType} from "./graphql/type-defs/_global-type.js"
import {GlobalResolver} from "./graphql/resolvers/_global-resolver.js"
import {AuthResolver} from './graphql/resolvers/auth-resolver.js';
import {AuthType} from './graphql/type-defs/auth-type.js';
import {InvoiceType} from './graphql/type-defs/invoice-type.js';
import {InvoiceResolver} from './graphql/resolvers/invoice-resolver.js';
import {TaskType} from './graphql/type-defs/task-type.js';
import {TaskResolver} from './graphql/resolvers/task-resolver.js';
import { ReportResolver } from "./graphql/resolvers/report-resolver.js";
import { ReportType } from "./graphql/type-defs/report-type.js";
import "./utils/stripe-webhook.js"


const client = new MongoClient(process.env.DB_URL, { useUnifiedTopology: true } );

const server = new ApolloServer({
    typeDefs: [GlobalType ,AuthType, InvoiceType, TaskType,  ReportType ], 
    resolvers: [GlobalResolver ,AuthResolver,InvoiceResolver, TaskResolver, ReportResolver],
    csrfPrevention: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})
const db = client.db(process.env.DB_NAME)

client.connect().then(()=> {
    console.log('Connected successfully to server');
    return server.listen({port: process.env.GQL_PORT})
});

export default db
