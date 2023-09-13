import { Starship } from "../src/model/starship";

import { Character } from "../src/model/character";
import { Planet } from "../src/model/planet";
import { Coordinates } from "../src/model/coordinates";

describe("Starship", () => {
    const coordinates = new Coordinates(30.0, 30.0);
    const millenniumFalcon = new Starship("Millennium Falcon", "YT-1300", 70, coordinates);

    test("Has a name", () => {
        expect(millenniumFalcon.name).toBe("Millennium Falcon");
    });

    test("Has a model", () => {
        expect(millenniumFalcon.model).toBe("YT-1300");
    });

    test("Has a cargo capacity", () => {
        expect(millenniumFalcon.cargoCapacity).toBe(70);
    });

    test("Has a current location", () => {
        expect(millenniumFalcon.currentLocation).toBe(coordinates);
    });

    test("Is instantiated with empty passengers", () => {
        expect(millenniumFalcon.getPassengers()).toStrictEqual([]);
    });

    test("Is instantiated with empty enemies", () => {
        expect(millenniumFalcon.getEnemies()).toStrictEqual([]);
    });

    test("Can add a passenger", () => {
        const tatooine = new Planet("Tatooine", 3000, "Arid", "Desert", coordinates);
        const lukeSkywalker = new Character("Luke Skywalker", "Human", 0.9, tatooine);
        const hanSolo = new Character("Han Solo", "Human", 0.05, tatooine);

        millenniumFalcon.addPassenger(lukeSkywalker);
        millenniumFalcon.addPassenger(hanSolo);

        expect(millenniumFalcon.getPassengers()).toStrictEqual([lukeSkywalker, hanSolo]);
    });
});
