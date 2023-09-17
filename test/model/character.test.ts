import { Character } from "../../src/model/character";

import { Fixtures } from "../fixtures"

describe("Character", () => {
    const tatooine = Fixtures.tatooine();
    const hanSolo = new Character("Han Solo", "Human", 0.05, tatooine);

    test("Is constructed without an ID", () => {
        expect(hanSolo.id).toBeNull();
    });

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
});
