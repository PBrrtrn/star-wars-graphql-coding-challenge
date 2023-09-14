import { Coordinates } from "../../src/model/coordinates";
import { Planet } from "../../src/model/planet";

describe("Planet constructor", () => {
    const coordinates = new Coordinates(30.0, 30.0);
    const tatooine = new Planet("Tatooine", 3000, "Arid", "Desert", coordinates);
    
    test("Planet has a name", () => {
        expect(tatooine.name).toBe("Tatooine");
    });

    test("Planet has population", () => {
        expect(tatooine.population).toBe(3000);
    });

    test("Planet has a climate", () => {
        expect(tatooine.climate).toBe("Arid");
    });

    test("Planet has a terrain", () => {
        expect(tatooine.terrain).toBe("Desert");
    });

    test("Planet has coordinates", () => {
        expect(tatooine.getCoordinates()).toBe(coordinates);
    })
});
