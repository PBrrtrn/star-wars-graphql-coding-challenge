import { planetSchema, planetResolvers } from "../../src/schema/planet_schema";

import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema"
import { merge } from 'lodash'
import { gql } from "graphql-tag"

import { PlanetSerializer } from "../../src/serializers/planet_serializer";
import { Fixtures } from "../fixtures";
import { PlanetRepository } from "../../src/repositories/planet_repository";
import { Planet } from "../../src/model/planet";
import { Coordinates } from "../../src/model/coordinates";
import { expectSuccess } from "../helpers";

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
                        latitude: 90.0,
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

    test("Update planet", async() => {
        const response = await testServer.executeOperation({
            query: gql`
                mutation {
                    updatePlanet(
                        id: 0,
                        population: 4000,
                        terrain: "Rocky"
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

        const expectedResult = {
            updatePlanet: {
                id: "0",
                name: "Tatooine",
                population: 4000,
                climate: "Arid",
                terrain: "Rocky",
                latitude: 30.0,
                longitude: 30.0
            }
        };

        expectSuccess(expectedResult, response);
    });

    test("Delete planet", async () => {
        const response = await testServer.executeOperation({
            query: gql`mutation { deletePlanet(id: 0) { id, name } }`
        });

        const expectedResult = { deletePlanet: {id: "0", name: "Tatooine"} };
        expectSuccess(expectedResult, response);
        expect(PlanetRepository.getInstance().get(0)).toBeUndefined();
    });
});
