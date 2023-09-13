import { Coordinates } from "../src/model/coordinates";
import { Starship } from "../src/model/starship";

describe("Starship constructor", () => {
    const coordinates = new Coordinates(30.0, 30.0);
    const millenniumFalcon = new Starship("Millennium Falcon", "YT-1300", 70, coordinates);

    test("Starship has a name", () => {
        expect(millenniumFalcon.name).toBe("Millennium Falcon");
    });

    test("Starship has a model", () => {
        expect(millenniumFalcon.model).toBe("YT-1300");
    });

    test("Starship has a cargo capacity", () => {
        expect(millenniumFalcon.cargoCapacity).toBe(70);
    });

    test("Starship has a current location", () => {
        expect(millenniumFalcon.currentLocation).toBe(coordinates);
    });

    test("Starship is instantiated with empty passengers", () => {
        expect(millenniumFalcon.getPassengers()).toStrictEqual([]);
    });

    test("Starship is instantiated with empty enemies", () => {
        expect(millenniumFalcon.getEnemies()).toStrictEqual([]);
    });
});
