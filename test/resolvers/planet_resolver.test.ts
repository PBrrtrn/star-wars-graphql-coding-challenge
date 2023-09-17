import { executableSchema } from "../../src/schema";
import { ApolloServer } from "@apollo/server";
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

    test("Test", async () => {
        const response = await testServer.executeOperation({
            query: gql`query { planets { id, name, population, climate, terrain, latitude, longitude } }`
        });

        const planet = Fixtures.tatooine();
        planet.id = 0;
        const expectedPlanets = {planets: [PlanetSerializer.serialize(planet)]};

        assert(response.body.kind === 'single');
        expect(response.body.singleResult.errors).toBeUndefined();
        expect(response.body.singleResult.data).toEqual(expectedPlanets);
    })

    
});