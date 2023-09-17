import { makeExecutableSchema } from "@graphql-tools/schema"
import { merge } from 'lodash'

import { planetSchema } from "./planet_schema";
import { planetResolvers } from "./planet_schema";
import { characterResolvers, characterSchema } from "./character_schema";

export const applicationSchema = makeExecutableSchema({
    typeDefs: [planetSchema, characterSchema],
    resolvers: merge(planetResolvers, characterResolvers)
});
