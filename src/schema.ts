import { makeExecutableSchema } from "@graphql-tools/schema"
import { merge } from 'lodash'

import { planetResolver } from "./resolvers/planet_resolver";

const typeDefs = `#graphql
    type Planet {
        name: String!
        population: Int!
        climate: String!
        terrain: String!
        latitude: Float!
        longitude: Float!
    }
    type Query {
        planets: [Planet!]
    }
`

export const executableSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: merge(planetResolver)
});
