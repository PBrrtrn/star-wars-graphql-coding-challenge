import { CharacterRepository } from "../repositories/character_repository"
import { PlanetRepository } from "../repositories/planet_repository";
import { CharacterSerializer } from "../serializers/character_serializer";
import { PlanetSerializer } from "../serializers/planet_serializer";

export const characterSchema = `#graphql
    type Character {
        id: Int!
        name: String!
        species: String!
        forceSensitivity: Float!
        currentLocation: Planet!
    },
    type Query {
        characters: [Character!]
    }
`

export const characterResolvers = {
    Query: {
        characters() {
            return CharacterRepository.getInstance().getAll().map(character => {
                return CharacterSerializer.serialize(character);
            });
        }
    },
    Character: {
        currentLocation(parent: any) {
            return PlanetSerializer.serialize(PlanetRepository.getInstance().get(parent.currentLocation.id));
        }
    }
}
