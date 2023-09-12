import { Character } from "../src/model/character";
import { Coordinates } from "../src/model/coordinates";
import { Planet } from "../src/model/planet";

describe("Character constructor", () => {
    const coordinates = new Coordinates(30.0, 30.0);
    const tatooine = new Planet("Tatooine", 3000, "Arid", "Desert", coordinates);
    const hanSolo = new Character("Han Solo", "Human", 0.05, tatooine);

    test("Character has a name", () => {
        expect(hanSolo.name).toBe("Han Solo");
    });

    test("Character has a species", () => {
        expect(hanSolo.species).toBe("Human");
    });

    test("Character has force sensitivity", () => {
        expect(hanSolo.forceSensitivity).toBe(0.05);
    });

    test("Character has a current location", () => {
        expect(hanSolo.currentLocation).toBe(tatooine);
    })
});
