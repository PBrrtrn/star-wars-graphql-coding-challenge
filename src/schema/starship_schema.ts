import { Coordinates } from "../model/coordinates.js";
import { Starship } from "../model/starship.js";
import { CharacterRepository } from "../repositories/character_repository.js";
import { StarshipRepository } from "../repositories/starship_repository.js";
import { CharacterSerializer } from "../serializers/character_serializer.js";
import { StarshipSerializer } from "../serializers/starship_serializer.js";

export const starshipSchema = `#graphql
    type Starship {
        id: ID!
        name: String!
        model: String!
        cargoCapacity: Float!
        latitude: Float!
        longitude: Float!
        passengers: [Character!]
    },
    type Query {
        starships: [Starship!]
        starship(id: ID!): Starship!
    },
    type Mutation {
        createStarship(
            name: String!
            model: String!
            cargoCapacity: Float!
            latitude: Float!
            longitude: Float!
        ): Starship!
        updateStarship(
            id: ID!
            name: String
            model: String
            cargoCapacity: Float
            latitude: Float
            longitude: Float
        ): Starship!
        deleteStarship(
            id: ID!
        ): Starship!
    }
`

export const starshipResolvers = {
    Query: {
        starships() {
            return StarshipRepository.getInstance().getAll().map(starship => {
                return StarshipSerializer.serialize(starship);
            });
        },
        starship(_: any, args: any) {
            return StarshipSerializer.serialize(StarshipRepository.getInstance().get(args.id));
        }
    },
    Starship: {
        passengers(parent: any) {
            return parent.passengers.map((passengerData: any) => {
                const passenger = CharacterRepository.getInstance().get(passengerData.id);
                return CharacterSerializer.serialize(passenger);
            });
        }
    },
    Mutation: {
        createStarship(_: any, args: any) {
            const starship = new Starship(
                args.name,
                args.model,
                args.cargoCapacity,
                new Coordinates(args.latitude, args.longitude)
            );

            const insertedStarship = StarshipRepository.getInstance().insert(starship);
            return StarshipSerializer.serialize(insertedStarship);
        },
        updateStarship(_: any, args: any) {
            const starship = StarshipRepository.getInstance().get(args.id);
            const starshipCoordinates = starship.getCoordinates();
            const updatedStarship = new Starship(
                args.name || starship.name,
                args.model || starship.model,
                args.cargoCapacity || starship.cargoCapacity,
                new Coordinates(
                    args.latitude || starshipCoordinates.latitude,
                    args.longitude || starshipCoordinates.longitude
                ),
                args.id
            );
            starship.getPassengers().forEach(passenger => updatedStarship.addPassenger(passenger));
            StarshipRepository.getInstance().update(args.id, updatedStarship);
            return StarshipSerializer.serialize(updatedStarship);
        },
        deleteStarship(_: any, args: any) {
            const deletedStarship = StarshipRepository.getInstance().delete(args.id);
            return StarshipSerializer.serialize(deletedStarship);
        }
    }
}
