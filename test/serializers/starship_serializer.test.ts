import { CharacterSerializer } from "../../src/serializers/character_serializer";
import { StarshipSerializer } from "../../src/serializers/starship_serializer";
import { Fixtures } from "../fixtures";

describe("Starship serializer", () => {
    test("Can serialize a starship", () => {
        const tatooine = Fixtures.tatooine();
        const hanSolo = Fixtures.hanSolo();
        hanSolo.currentLocation = tatooine;

        const millenniumFalcon = Fixtures.millenniumFalcon();
        millenniumFalcon.addPassenger(hanSolo);

        const expectedSerialization = {
            id: null,
            name: "Millennium Falcon",
            model: "YT-1300",
            cargoCapacity: 70,
            latitude: 30.0,
            longitude: 30.0,
            passengers: [CharacterSerializer.serialize(hanSolo)]
        };

        expect(StarshipSerializer.serialize(millenniumFalcon)).toStrictEqual(expectedSerialization);
    })
});
