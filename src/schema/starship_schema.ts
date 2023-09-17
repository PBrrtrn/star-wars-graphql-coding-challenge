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
    }
}
