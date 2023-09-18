import { Character } from "../model/character.js";
import { CharacterRepository } from "../repositories/character_repository.js";
import { PlanetRepository } from "../repositories/planet_repository.js";
import { StarshipRepository } from "../repositories/starship_repository.js";
import { CharacterSerializer } from "../serializers/character_serializer.js";
import { PlanetSerializer } from "../serializers/planet_serializer.js";

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
    },
    type Mutation {
        createCharacter(
            name: String!
            species: String!
            forceSensitivity: Float!
            startingPlanetId: ID!
        ): Character!
        updateCharacter(
            id: ID!
            name: String
            species: String
            forceSensitivity: Float
        ): Character!
        deleteCharacter(
            id: ID!
        ): Character!
        boardStarship(
            characterId: ID!
            starshipId: ID!
        ): Character!
    }
`

const characterRepository = CharacterRepository.getInstance();

export const characterResolvers = {
    Query: {
        characters() {
            return characterRepository.getAll().map(character => {
                return serializeCharacter(character);
            });
        },
        character(_: any, args: any) {
            return serializeCharacter(characterRepository.get(args.id));
        }
    },
    Character: {
        currentLocation(parent: any) {
            return PlanetSerializer.serialize(PlanetRepository.getInstance().get(parent.currentLocation.id));
        }
    },
    Mutation: {
        createCharacter(_: any, args: any) {
            const startingPlanet = PlanetRepository.getInstance().get(args.startingPlanetId);
            const character = new Character(
                args.name,
                args.species,
                args.forceSensitivity,
                startingPlanet
            );
            const insertedCharacter = characterRepository.insert(character);
            return serializeCharacter(insertedCharacter);
        },
        updateCharacter(_: any, args: any) {
            const character = characterRepository.get(args.id);
            const updatedCharacter = new Character(
                args.name || character.name,
                args.species || character.species,
                args.forceSensitivity || character.forceSensitivity,
                character.currentLocation,
                args.id
            );

            characterRepository.update(args.id, updatedCharacter);
            return serializeCharacter(updatedCharacter);
        },
        deleteCharacter(_: any, args: any) {
            const deletedCharacter = characterRepository.delete(args.id);
            return serializeCharacter(deletedCharacter);
        },
        boardStarship(_: any, args: any) {
            const starshipRepository = StarshipRepository.getInstance();
            const starship = starshipRepository.get(args.starshipId);
            const character = characterRepository.get(args.characterId);
            starship.addPassenger(character);
            
            starshipRepository.update(args.starshipId, starship);

            return serializeCharacter(character);
        }
    }
}
function serializeCharacter(character: Character): { id: string; name: string; species: string; forceSensitivity: number; currentLocation: { id: string; name: string; population: number; climate: string; terrain: string; latitude: number; longitude: number; }; } {
    return CharacterSerializer.serialize(character);
}

