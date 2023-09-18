import { Coordinates } from "../model/coordinates";
import { Starship } from "../model/starship";
import { CharacterRepository } from "../repositories/character_repository";
import { StarshipRepository } from "../repositories/starship_repository"
import { CharacterSerializer } from "../serializers/character_serializer";
import { StarshipSerializer } from "../serializers/starship_serializer";

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
    }
`

export const starshipResolvers = {
    Query: {
        starships() {
            return StarshipRepository.getInstance().getAll().map(starship => {
                return StarshipSerializer.serialize(starship);
            });
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
        }
    }
}
