import { starshipSchema, starshipResolvers } from "../../src/schema/starship_schema";

import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema"
import { merge } from 'lodash'
import { gql } from "graphql-tag"

import { characterSchema } from "../../src/schema/character_schema";
import { planetSchema } from "../../src/schema/planet_schema";
import { CharacterRepository } from "../../src/repositories/character_repository";
import { PlanetRepository } from "../../src/repositories/planet_repository";
import { Fixtures } from "../fixtures";
import { StarshipRepository } from "../../src/repositories/starship_repository";
import { StarshipSerializer } from "../../src/serializers/starship_serializer";
import { Starship } from "../../src/model/starship";
import { Coordinates } from "../../src/model/coordinates";
import { expectSuccess } from "../helpers";

describe("Starship schema", () => {
    const executableSchema = makeExecutableSchema({
        typeDefs: [starshipSchema, characterSchema, planetSchema],
        resolvers: merge(starshipResolvers)
    });

    const testServer = new ApolloServer({
        schema: executableSchema
    });

    beforeEach(() => {
        const characterRepository = CharacterRepository.getInstance();
        const planetRepository = PlanetRepository.getInstance();
        const starshipRepository = StarshipRepository.getInstance();
        characterRepository.clear();
        planetRepository.clear();
        starshipRepository.clear();

        const tatooine = Fixtures.tatooine();
        tatooine.id = 0;

        planetRepository.insert(tatooine);

        const hanSolo = Fixtures.hanSolo();
        hanSolo.currentLocation = tatooine;
        hanSolo.id = 0;
        characterRepository.insert(hanSolo);

        const millenniumFalcon = Fixtures.millenniumFalcon();
        millenniumFalcon.addPassenger(hanSolo);
        starshipRepository.insert(millenniumFalcon);
    });

    describe("Get", () => {
        const expectedLocation = Fixtures.tatooine();
        expectedLocation.id = 0;

        const expectedCharacter = Fixtures.hanSolo();
        expectedCharacter.id = 0;
        expectedCharacter.currentLocation = expectedLocation;

        const expectedStarship = Fixtures.millenniumFalcon();
        expectedStarship.id = 0;
        expectedStarship.addPassenger(expectedCharacter);

        test("Get all starships", async () => {
            const response = await testServer.executeOperation({
                query: gql`
                    query {
                        starships {
                            id,
                            name,
                            model,
                            cargoCapacity,
                            latitude,
                            longitude,
                            passengers {
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
                    }
                `
            });

            const expectedResult = {starships: [StarshipSerializer.serialize(expectedStarship)]};
            expectSuccess(expectedResult, response);
        });

        test("Get starship by ID", async () => {
            const response = await testServer.executeOperation({
                query: gql`
                    query {
                        starship(id: 0) {
                            id,
                            name,
                            model,
                            cargoCapacity,
                            latitude,
                            longitude,
                            passengers {
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
                    }
                `
            });

            const expectedResult = {starship: StarshipSerializer.serialize(expectedStarship)};
            expectSuccess(expectedResult, response);
        });
    });

    test("Create starship", async () => {
        const response = await testServer.executeOperation({
            query: gql`
                mutation {
                    createStarship(
                        name: "Dream Voyager",
                        model: "Update Ship",
                        cargoCapacity: 10.0,
                        latitude: -40.0,
                        longitude: -40.0
                    ) {
                        id,
                        name,
                        model,
                        cargoCapacity,
                        latitude,
                        longitude,
                        passengers {
                            id
                        }
                    }
                }
            `
        });

        const expectedStarship = new Starship(
            "Dream Voyager",
            "Update Ship",
            10.0,
            new Coordinates(-40.0, -40.0),
            1
        );
        const expectedResult = {createStarship: StarshipSerializer.serialize(expectedStarship)};
        expectSuccess(expectedResult, response);
    });

    test("Update starship", async () => {
        const response = await testServer.executeOperation({
            query: gql`
                mutation {
                    updateStarship(
                        id: 0,
                        name: "The Millennium Falcon",
                        cargoCapacity: 100
                    ) {
                        id,
                        name,
                        model,
                        cargoCapacity,
                        latitude,
                        longitude,
                        passengers {
                            name
                        }
                    }
                }
            `
        });

        const expectedResult = {
            updateStarship: {
                id: "0",
                name: "The Millennium Falcon",
                model: "YT-1300",
                cargoCapacity: 100,
                latitude: 30.0,
                longitude: 30.0,
                passengers: [
                    {
                        name: "Han Solo"
                    }
                ]
            }
        };
        expectSuccess(expectedResult, response);
    });
});
