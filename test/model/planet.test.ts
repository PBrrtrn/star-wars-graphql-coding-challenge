import { Coordinates } from "../../src/model/coordinates";
import { Planet } from "../../src/model/planet";

describe("Planet", () => {
    const coordinates = new Coordinates(30.0, 30.0);
    const tatooine = new Planet("Tatooine", 3000, "Arid", "Desert", coordinates);

    test("Is constructed without an ID", () => {
        expect(tatooine.id).toBeNull();
    });
    
    test("Has a name", () => {
        expect(tatooine.name).toBe("Tatooine");
    });

    test("Has population", () => {
        expect(tatooine.population).toBe(3000);
    });

    test("Has a climate", () => {
        expect(tatooine.climate).toBe("Arid");
    });

    test("Has a terrain", () => {
        expect(tatooine.terrain).toBe("Desert");
    });

    test("Has coordinates", () => {
        expect(tatooine.getCoordinates()).toBe(coordinates);
    })
});
