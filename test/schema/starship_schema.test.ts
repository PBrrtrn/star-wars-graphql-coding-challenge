import { starshipSchema, starshipResolvers } from "../../src/schema/starship_schema";

import { ApolloServer, GraphQLResponse } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema"
import { merge } from 'lodash'
import { gql } from "graphql-tag"
import assert from "assert"

import { characterSchema } from "../../src/schema/character_schema";
import { planetSchema } from "../../src/schema/planet_schema";
import { CharacterRepository } from "../../src/repositories/character_repository";
import { PlanetRepository } from "../../src/repositories/planet_repository";
import { Fixtures } from "../fixtures";
import { StarshipRepository } from "../../src/repositories/starship_repository";
import { StarshipSerializer } from "../../src/serializers/starship_serializer";

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
                query: gql`query {
                    # Arreglas los atributos de esta query
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
                }`
            });

            const expectedResult = {starships: [StarshipSerializer.serialize(expectedStarship)]};
            expectSuccess(expectedResult, response);
        });
    });
});

const expectSuccess = function(expectedResult: {}, response: GraphQLResponse) {
    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).toEqual(expectedResult);
}
