import { CharacterSerializer } from "../../src/serializers/character_serializer";
import { PlanetSerializer } from "../../src/serializers/planet_serializer";
import { Fixtures } from "../fixtures";

describe("Character serializer", () => {
    test("Can serialize a character", () => {
        const expectedSerialization = {
            id: null,
            name: "Han Solo",
            species: "Human",
            forceSensitivity: 0.05,
            currentLocation: PlanetSerializer.serialize(Fixtures.tatooine())
        }

        expect(CharacterSerializer.serialize(Fixtures.hanSolo())).toStrictEqual(expectedSerialization);
    });
});