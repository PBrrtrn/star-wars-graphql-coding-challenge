import { CharacterRepository } from "../repositories/character_repository"
import { PlanetRepository } from "../repositories/planet_repository";
import { CharacterSerializer } from "../serializers/character_serializer";
import { PlanetSerializer } from "../serializers/planet_serializer";

export const characterSchema = `#graphql
    type Character {
        id: ID!
        name: String!
        species: String!
        forceSensitivity: Float!
        currentLocation: Planet!
    },
    type Query {
        characters: [Character!]
        character(id: ID!): Character!
    }
`

export const characterResolvers = {
    Query: {
        characters() {
            return CharacterRepository.getInstance().getAll().map(character => {
                return CharacterSerializer.serialize(character);
            });
        },
        character(_: any, args: any) {
            return CharacterSerializer.serialize(CharacterRepository.getInstance().get(0));
        }
    },
    Character: {
        currentLocation(parent: any) {
            return PlanetSerializer.serialize(PlanetRepository.getInstance().get(parent.currentLocation.id));
        }
    }
}
