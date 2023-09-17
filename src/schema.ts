import { makeExecutableSchema } from "@graphql-tools/schema"
import { merge } from 'lodash'

import { planetResolver } from "./resolvers/planet_resolver";

const typeDefs = `#graphql
    type Planet {
        id: Int!
        name: String!
        population: Int!
        climate: String!
        terrain: String!
        latitude: Float!
        longitude: Float!
    }
    type Query {
        planets: [Planet!]
        planet(id: ID!): Planet!
    }
`

export const executableSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: merge(planetResolver)
});
