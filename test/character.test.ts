import { Character } from "../src/model/character";
import { Coordinates } from "../src/model/coordinates";
import { Planet } from "../src/model/planet";

describe("Character", () => {
    const coordinates = new Coordinates(30.0, 30.0);
    const tatooine = new Planet("Tatooine", 3000, "Arid", "Desert", coordinates);
    const hanSolo = new Character("Han Solo", "Human", 0.05, tatooine);

    test("Has a name", () => {
        expect(hanSolo.name).toBe("Han Solo");
    });

    test("Has a species", () => {
        expect(hanSolo.species).toBe("Human");
    });

    test("Has force sensitivity", () => {
        expect(hanSolo.forceSensitivity).toBe(0.05);
    });

    test("Has a current location", () => {
        expect(hanSolo.currentLocation).toBe(tatooine);
    });

    test("Can be relocated to a different planet", () => {
        const nabooCoordinates = new Coordinates(-40.0, 210.0);
        const naboo = new Planet("Naboo", 15000, "Temperate", "Plains", nabooCoordinates);
        hanSolo.setCurrentLocation(naboo);
        expect(hanSolo.currentLocation).toBe(naboo);
    });
});
