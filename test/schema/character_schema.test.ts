import { characterSchema, characterResolvers } from "../../src/schema/character_schema";

import { ApolloServer, GraphQLResponse } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema"
import { merge } from 'lodash'
import { gql } from "graphql-tag"
import assert from "assert"

import { Fixtures } from "../fixtures";
import { planetSchema } from "../../src/schema/planet_schema";

describe.skip("Character schema", () => {
    const executableSchema = makeExecutableSchema({
        typeDefs: [characterSchema, planetSchema],
        resolvers: merge(characterResolvers)
    });

    const testServer = new ApolloServer({
        schema: executableSchema
    });

    beforeEach(() => {
        /*
        const characterRepository = CharacterRepository.getInstance();
        characterRepository.clear();
        characterRepository.insert(Fixtures.hanSolo());
        */
    });

    test("Get all characters", async () => {
        const response = await testServer.executeOperation({
            query: gql`query {
                characters {
                    id,
                    name,
                    species,
                    forceSensitivity,
                    currentLocation {
                        name
                    }
                }
            }`
        });

        const expectedLocation = Fixtures.tatooine();
        expectedLocation.id = 0;

        const expectedCharacter = Fixtures.hanSolo();
        // expectedCharacter.id = 1;
        expectedCharacter.currentLocation = expectedLocation;
        // const expectedResult = {planets: [CharacterSerializer.serialize(expectedCharacter)]};

        expectSuccess({}, response);
    });
});

const expectSuccess = function(expectedResult: {}, response: GraphQLResponse) {
    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).toEqual(expectedResult);
}