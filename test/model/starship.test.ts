import { Starship } from "../../src/model/starship";

import { Fixtures } from "../fixtures"

const MILLENNIUM_FALCON_NAME = "Millennium Falcon";
const MILLENNIUM_FALCON_MODEL = "TY-1300";
const MILLENNIUM_FALCON_CARGO_CAPACITY = 70;

const createMillenniumFalcon = function(): Starship {
    return new Starship(
        MILLENNIUM_FALCON_NAME,
        MILLENNIUM_FALCON_MODEL,
        MILLENNIUM_FALCON_CARGO_CAPACITY,
        Fixtures.tatooineCoordinates
    );
}

describe("Starship", () => {
    describe("Instantiation", () => {
        const millenniumFalcon = createMillenniumFalcon();

        test("Has a name", () => {
            expect(millenniumFalcon.name).toBe(MILLENNIUM_FALCON_NAME);
        });
    
        test("Has a model", () => {
            expect(millenniumFalcon.model).toBe(MILLENNIUM_FALCON_MODEL);
        });
    
        test("Has a cargo capacity", () => {
            expect(millenniumFalcon.cargoCapacity).toBe(MILLENNIUM_FALCON_CARGO_CAPACITY);
        });
    
        test("Has coordinates", () => {
            expect(millenniumFalcon.getCoordinates()).toBe(Fixtures.tatooineCoordinates);
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
            expect(millenniumFalcon.getCoordinates()).toBe(nabooCoordinates);
        });

        test("Starship carries passengers to planet", () => {
            const lukeSkywalker = Fixtures.lukeSkywalker();

            millenniumFalcon.addPassenger(lukeSkywalker);
            millenniumFalcon.travelTo(naboo);
            expect(lukeSkywalker.currentLocation).toBe(naboo);
        });
    });
});
