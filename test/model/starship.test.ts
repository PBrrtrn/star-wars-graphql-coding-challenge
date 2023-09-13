import { Starship } from "../../src/model/starship";

import { Character } from "../../src/model/character";
import { Planet } from "../../src/model/planet";
import { Coordinates } from "../../src/model/coordinates";

describe("Starship", () => {
    const tatooineCoordinates = new Coordinates(30.0, 30.0);
    const tatooine = new Planet("Tatooine", 3000, "Arid", "Desert", tatooineCoordinates);

    describe("Instantiation", () => {
        const millenniumFalcon = createMillenniumFalcon(tatooineCoordinates);

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
            expect(millenniumFalcon.currentLocation).toBe(tatooineCoordinates);
        });
    
        test("Is instantiated with empty passengers", () => {
            expect(millenniumFalcon.getPassengers()).toStrictEqual([]);
        });
    
        test("Is instantiated with empty enemies", () => {
            expect(millenniumFalcon.getEnemies()).toStrictEqual([]);
        });
    });

    describe("Passengers", () => {
        const lukeSkywalker = new Character("Luke Skywalker", "Human", 0.9, tatooine);
        const hanSolo = new Character("Han Solo", "Human", 0.05, tatooine);

        test("Can add a passenger", () => {
            const millenniumFalcon = createMillenniumFalcon(tatooineCoordinates);
            millenniumFalcon.addPassenger(lukeSkywalker);
            millenniumFalcon.addPassenger(hanSolo);
    
            expect(millenniumFalcon.getPassengers()).toStrictEqual([lukeSkywalker, hanSolo]);
        });

        test("Can remove a passenger", () => {
            const millenniumFalcon = createMillenniumFalcon(tatooineCoordinates);
            millenniumFalcon.addPassenger(lukeSkywalker);
            millenniumFalcon.addPassenger(hanSolo);
            expect(millenniumFalcon.getPassengers()).toStrictEqual([lukeSkywalker, hanSolo]);

            millenniumFalcon.removePassenger(lukeSkywalker);
            expect(millenniumFalcon.getPassengers()).toStrictEqual([hanSolo]);
        });
    });

    describe("Travel", () => {
        const nabooCoordinates = new Coordinates(-40.0, 210.0);
        const naboo = new Planet("Naboo", 15000, "Temperate", "Plains", nabooCoordinates);

        test("Starship can travel", () => {
            const millenniumFalcon = createMillenniumFalcon(tatooineCoordinates);

            millenniumFalcon.travelTo(naboo);
            expect(millenniumFalcon.currentLocation).toBe(nabooCoordinates);
        });

        test("Starship carries passengers to planet", () => {
            const lukeSkywalker = new Character("Luke Skywalker", "Human", 0.9, tatooine);

            const millenniumFalcon = createMillenniumFalcon(tatooineCoordinates);
            millenniumFalcon.addPassenger(lukeSkywalker);
            millenniumFalcon.travelTo(naboo);
            expect(lukeSkywalker.currentLocation).toBe(naboo);
        });
    });
});

function createMillenniumFalcon(coordinates: Coordinates): Starship {
    return new Starship("Millennium Falcon", "YT-1300", 70, coordinates);
}

