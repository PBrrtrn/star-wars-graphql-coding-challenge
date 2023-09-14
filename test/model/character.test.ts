import { Character } from "../../src/model/character";

import { Fixtures } from "../fixtures"

describe("Character", () => {
    const tatooine = Fixtures.tatooine();
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
        const naboo = Fixtures.naboo();

        hanSolo.setCurrentLocation(naboo);
        expect(hanSolo.currentLocation).toBe(naboo);
    });
});
