import { planetSchema, planetResolvers } from "../../src/schema/planet_schema";

import { ApolloServer, GraphQLResponse } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema"
import { merge } from 'lodash'
import { gql } from "graphql-tag"
import assert from "assert"

import { PlanetSerializer } from "../../src/serializers/planet_serializer";
import { Fixtures } from "../fixtures";
import { PlanetRepository } from "../../src/repositories/planet_repository";
import { Planet } from "../../src/model/planet";
import { Coordinates } from "../../src/model/coordinates";

describe("Planet Schema", () => {
    const executableSchema = makeExecutableSchema({
        typeDefs: [planetSchema],
        resolvers: merge(planetResolvers)
    });

    const testServer = new ApolloServer({
        schema: executableSchema
    })

    beforeEach(() => {
        const planetRepository = PlanetRepository.getInstance();
        planetRepository.clear();
        planetRepository.insert(Fixtures.tatooine());
    });

    describe("Get", () => {
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

    test("Create planet", async () => {
        const response = await testServer.executeOperation({
            query: gql`
                mutation {
                    createPlanet(
                        name: "Arrakis",
                        population: 15000000,
                        climate: "Arid",
                        terrain: "Desert",
                        latitude: 90.0
                        longitude: -45.0
                    ) {
                        id,
                        name,
                        population,
                        climate,
                        terrain,
                        latitude,
                        longitude
                    }
                }
            `
        });

        const expectedPlanet = new Planet("Arrakis", 15000000, "Arid", "Desert", new Coordinates(90.0, -45.0), 1);
        const expectedResult = { createPlanet: PlanetSerializer.serialize(expectedPlanet) };
        expectSuccess(expectedResult, response);
    });
});

const expectSuccess = function(expectedResult: {}, response: GraphQLResponse) {
    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).toEqual(expectedResult);
}
