import { Starship } from "../../src/model/starship";

import { Fixtures } from "../fixtures"

const createMillenniumFalcon = function(): Starship {
    return new Starship("Millennium Falcon", "YT-1300", 70, Fixtures.tatooineCoordinates);
}

describe("Starship", () => {
    const tatooineCoordinates = Fixtures.tatooineCoordinates;

    describe("Instantiation", () => {
        const millenniumFalcon = createMillenniumFalcon();

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
        const lukeSkywalker = Fixtures.lukeSkywalker();
        const hanSolo = Fixtures.hanSolo();

        test("Can add a passenger", () => {
            const millenniumFalcon = createMillenniumFalcon();
            millenniumFalcon.addPassenger(lukeSkywalker);
            millenniumFalcon.addPassenger(hanSolo);
    
            expect(millenniumFalcon.getPassengers()).toStrictEqual([lukeSkywalker, hanSolo]);
        });

        test("Can remove a passenger", () => {
            const millenniumFalcon = createMillenniumFalcon();
            millenniumFalcon.addPassenger(lukeSkywalker);
            millenniumFalcon.addPassenger(hanSolo);

            millenniumFalcon.removePassenger(lukeSkywalker);
            expect(millenniumFalcon.getPassengers()).toStrictEqual([hanSolo]);
        });
    });

    describe("Travel", () => {
        const nabooCoordinates = Fixtures.nabooCoordinates;
        const naboo = Fixtures.naboo();
        const millenniumFalcon = createMillenniumFalcon();

        test("Starship can travel", () => {
            millenniumFalcon.travelTo(naboo);
            expect(millenniumFalcon.currentLocation).toBe(nabooCoordinates);
        });

        test("Starship carries passengers to planet", () => {
            const lukeSkywalker = Fixtures.lukeSkywalker();

            millenniumFalcon.addPassenger(lukeSkywalker);
            millenniumFalcon.travelTo(naboo);
            expect(lukeSkywalker.currentLocation).toBe(naboo);
        });
    });
});
