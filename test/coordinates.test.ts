import { Coordinates } from "../src/model/coordinates";

describe("Coordinates constructor", () => {
    const coordinates = new Coordinates(30.0, 15.0);

    test("Coordinates have latitude", () => {
        expect(coordinates.latitude).toBe(30.0);
    });

    test("Coordinates have longitude", () => {
        expect(coordinates.longitude).toBe(15.0);
    });
});
