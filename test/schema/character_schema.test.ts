import { characterSchema, characterResolvers } from "../../src/schema/character_schema";

import { ApolloServer, GraphQLResponse } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema"
import { merge } from 'lodash'
import { gql } from "graphql-tag"
import assert from "assert"

import { Fixtures } from "../fixtures";
import { planetSchema } from "../../src/schema/planet_schema";
import { CharacterRepository } from "../../src/repositories/character_repository";
import { CharacterSerializer } from "../../src/serializers/character_serializer";
import { PlanetRepository } from "../../src/repositories/planet_repository";
import { Planet } from "../../src/model/planet";
import { Coordinates } from "../../src/model/coordinates";
import { Character } from "../../src/model/character";

describe("Character schema", () => {
    const executableSchema = makeExecutableSchema({
        typeDefs: [characterSchema, planetSchema],
        resolvers: merge(characterResolvers)
    });

    const testServer = new ApolloServer({
        schema: executableSchema
    });

    beforeEach(() => {
        const characterRepository = CharacterRepository.getInstance();
        const planetRepository = PlanetRepository.getInstance();
        characterRepository.clear();
        planetRepository.clear();

        const tatooine = Fixtures.tatooine();
        tatooine.id = 0;

        planetRepository.insert(tatooine);

        const hanSolo = Fixtures.hanSolo();
        hanSolo.currentLocation = tatooine;
        characterRepository.insert(hanSolo);
    });
    
    describe("Get", () => {
        const expectedLocation = Fixtures.tatooine();
        expectedLocation.id = 0;

        const expectedCharacter = Fixtures.hanSolo();
        expectedCharacter.id = 0;
        expectedCharacter.currentLocation = expectedLocation;

        test("Get all characters", async () => {
            const response = await testServer.executeOperation({
                query: gql`query {
                    characters {
                        id,
                        name,
                        species,
                        forceSensitivity,
                        currentLocation {
                            id,
                            name,
                            population,
                            climate,
                            terrain,
                            latitude,
                            longitude
                        }
                    }
                }`
            });
    
            const expectedResult = {characters: [CharacterSerializer.serialize(expectedCharacter)]};
            expectSuccess(expectedResult, response);
        });

        test("Get character by ID", async () => {
            const response = await testServer.executeOperation({
                query: gql`query {
                    character(id: 0) {
                        id,
                        name,
                        species,
                        forceSensitivity,
                        currentLocation {
                            id,
                            name,
                            population,
                            climate,
                            terrain,
                            latitude,
                            longitude
                        }
                    }
                }`
            });
    
            const expectedResult = {character: CharacterSerializer.serialize(expectedCharacter)};
            expectSuccess(expectedResult, response);
        });
    });

    test("Create character", async () => {
        const arrakis = new Planet("Arrakis", 15000000, "Arid", "Desert", new Coordinates(90.0, -45.0));
        const startingPlanet = PlanetRepository.getInstance().insert(arrakis);

        const response = await testServer.executeOperation({
            query: gql`
                mutation {
                    createCharacter(
                        name: "Paul Atreides",
                        species: "Human",
                        forceSensitivity: 0.99,
                        startingPlanetId: ${startingPlanet.id}
                    ) {
                        id,
                        name,
                        species,
                        forceSensitivity,
                        currentLocation {
                            id,
                            name,
                            population,
                            climate,
                            terrain,
                            latitude,
                            longitude
                        }
                    }
                }
            `
        });

        const expectedCharacter = new Character("Paul Atreides", "Human", 0.99, startingPlanet, 1);
        const expectedResult = {createCharacter: CharacterSerializer.serialize(expectedCharacter)};
        expectSuccess(expectedResult, response);
    });

    test("Update character", async () => {
        const response = await testServer.executeOperation({
            query: gql`
                mutation {
                    updateCharacter(
                        id: 0,
                        name: "Han Solo Skywalker",
                        forceSensitivity: 0.10
                    ) {
                        id,
                        name,
                        species,
                        forceSensitivity
                    }
                }
            `
        });

        const expectedResult = {
            updateCharacter: {id: "0", name: "Han Solo Skywalker", species: "Human", forceSensitivity: 0.10}
        };

        expectSuccess(expectedResult, response);
    });
});

const expectSuccess = function(expectedResult: {}, response: GraphQLResponse) {
    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).toEqual(expectedResult);
}
