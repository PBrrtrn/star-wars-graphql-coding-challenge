import { PlanetSerializer } from "../../src/serializers/planet_serializer";
import { Fixtures } from "../fixtures";

describe("Planet serializer", () => {
    test("Can serialize a planet", () => {
        const expectedSerialization = {
            id: null,
            name: "Tatooine",
            population: 3000,
            climate: "Arid",
            terrain: "Desert",
            latitude: 30.0,
            longitude: 30.0
        }
        expect(PlanetSerializer.serialize(Fixtures.tatooine())).toStrictEqual(expectedSerialization);
    });
})
