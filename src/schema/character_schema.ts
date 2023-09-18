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

export const characterResolvers = {
    Query: {
        characters() {
            return CharacterRepository.getInstance().getAll().map(character => {
                return CharacterSerializer.serialize(character);
            });
        },
        character(_: any, args: any) {
            return CharacterSerializer.serialize(CharacterRepository.getInstance().get(args.id));
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
            const insertedCharacter = CharacterRepository.getInstance().insert(character);
            return CharacterSerializer.serialize(insertedCharacter);
        },
        updateCharacter(_: any, args: any) {
            const character = CharacterRepository.getInstance().get(args.id);
            const updatedCharacter = new Character(
                args.name || character.name,
                args.species || character.species,
                args.forceSensitivity || character.forceSensitivity,
                character.currentLocation,
                args.id
            );

            CharacterRepository.getInstance().update(args.id, updatedCharacter);
            return CharacterSerializer.serialize(updatedCharacter);
        },
        deleteCharacter(_: any, args: any) {
            const deletedCharacter = CharacterRepository.getInstance().delete(args.id);
            return CharacterSerializer.serialize(deletedCharacter);
        },
        boardStarship(_: any, args: any) {
            const starshipRepository = StarshipRepository.getInstance();
            const starship = starshipRepository.get(args.starshipId);
            const character = CharacterRepository.getInstance().get(args.characterId);
            starship.addPassenger(character);
            
            starshipRepository.update(args.starshipId, starship);

            return CharacterSerializer.serialize(character);
        }
    }
}
