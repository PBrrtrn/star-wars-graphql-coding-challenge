import { makeExecutableSchema } from "@graphql-tools/schema";
import pkg from 'lodash';
const { merge } = pkg;

import { planetSchema } from "./planet_schema.js";
import { planetResolvers } from "./planet_schema.js";
import { characterResolvers, characterSchema } from "./character_schema.js";

export const applicationSchema = makeExecutableSchema({
    typeDefs: [planetSchema, characterSchema],
    resolvers: merge(planetResolvers, characterResolvers)
});
