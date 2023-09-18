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
        updatePlanet(
            id: ID!
            name: String
            population: Int
            climate: String
            terrain: String
            latitude: Float
            longitude: Float
        ): Planet!
        deletePlanet(
            id: ID!
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
        },
        updatePlanet(_: any, args: any) {
            const planet = PlanetRepository.getInstance().get(args.id);
            const planetCoordinates = planet.getCoordinates();
            const updatedPlanet = new Planet(
                args.name || planet.name,
                args.population || planet.population,
                args.climate || planet.climate,
                args.terrain || planet.terrain,
                new Coordinates(
                    args.latitude || planetCoordinates.latitude,
                    args.longitude || planetCoordinates.longitude
                )
            );

            PlanetRepository.getInstance().update(args.id, updatedPlanet);
            return PlanetSerializer.serialize(updatedPlanet);
        },
        deletePlanet(_: any, args: any) {
            // TODO: Validate no characters are in planet
            const deletedPlanet = PlanetRepository.getInstance().delete(args.id);
            return PlanetSerializer.serialize(deletedPlanet);
        }
    }
}
