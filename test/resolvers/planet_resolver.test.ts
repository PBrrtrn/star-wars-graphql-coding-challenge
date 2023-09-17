import { executableSchema } from "../../src/schema";
import { ApolloServer, GraphQLResponse } from "@apollo/server";
import { gql } from "graphql-tag"

import assert from "assert"
import { PlanetSerializer } from "../../src/serializers/planet_serializer";
import { Fixtures } from "../fixtures";
import { PlanetRepository } from "../../src/repositories/planet_repository";

describe("Planet Resolver", () => {
    const testServer = new ApolloServer({
        schema: executableSchema
    })

    beforeEach(() => {
        const planetRepository = PlanetRepository.getInstance();
        planetRepository.clear();
        planetRepository.insert(Fixtures.tatooine());
    });

    test("Get all planets", async () => {
        const response = await testServer.executeOperation({
            query: gql`query { planets { id, name, population, climate, terrain, latitude, longitude } }`
        });

        const expectedPlanet = Fixtures.tatooine();
        expectedPlanet.id = 0;
        const expectedResult = {planets: [PlanetSerializer.serialize(expectedPlanet)]};

        expectSuccess(expectedResult, response);
    });

    test("Get planet by ID", async () => {
        const response = await testServer.executeOperation({
           query: gql`query { planet(id: 0) { id, name, population, climate, terrain, latitude, longitude } }` 
        });

        const expectedPlanet = Fixtures.tatooine();
        expectedPlanet.id = 0;
        const expectedResult = {planet: PlanetSerializer.serialize(expectedPlanet)};

        expectSuccess(expectedResult, response);
    });
});

const expectSuccess = function(expectedResult: {}, response: GraphQLResponse) {
    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).toEqual(expectedResult);
}
