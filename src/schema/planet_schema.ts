import { Coordinates } from "../model/coordinates";
import { Planet } from "../model/planet";
import { PlanetRepository } from "../repositories/planet_repository";
import { PlanetSerializer } from "../serializers/planet_serializer";

export const planetSchema = `#graphql
    type Planet {
        id: ID!
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
    },
    type Mutation {
        createPlanet(
            name: String!
            population: Int!
            climate: String!
            terrain: String!
            latitude: Float!
            longitude: Float!
        ): Planet!
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
    },
    Mutation: {
        createPlanet(_: any, args: any) {
            const planet = new Planet(
                args.name,
                args.population,
                args.climate,
                args.terrain,
                new Coordinates(args.latitude, args.longitude)
            );

            const insertedPlanet = PlanetRepository.getInstance().insert(planet);
            return PlanetSerializer.serialize(insertedPlanet);
        }
    }
}
