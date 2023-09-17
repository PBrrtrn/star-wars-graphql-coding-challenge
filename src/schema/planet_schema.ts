import { PlanetRepository } from "../repositories/planet_repository";
import { PlanetSerializer } from "../serializers/planet_serializer";

export const planetSchema = `#graphql
    type Planet {
        id: Int!
        name: String!
        population: Int!
        climate: String!
        terrain: String!
        latitude: Float!
        longitude: Float!
    },
    type Query {
        planets: [Planet!]
        planet(id: ID!): Planet!
    }
`

export const planetResolvers = {
    Query: {
        planets() {
            return PlanetRepository.getInstance().getAll().map(planet => {
                return PlanetSerializer.serialize(planet);
            });
        },
        planet(_: any, args: any) {
            return PlanetSerializer.serialize(PlanetRepository.getInstance().get(args.id));
        }
    }
}
