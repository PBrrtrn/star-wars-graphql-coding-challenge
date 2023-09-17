import { makeExecutableSchema } from "@graphql-tools/schema"
import { merge } from 'lodash'

import { planetSchema } from "./planet_schema";
import { planetResolvers } from "./planet_schema";

export const applicationSchema = makeExecutableSchema({
    typeDefs: [planetSchema],
    resolvers: merge(planetResolvers)
});
