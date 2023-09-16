import { PlanetRepository } from "../../src/repositories/planet_repository";
import { Fixtures } from "../fixtures";

describe("Planet repository", () => {
    test("Returns all plantes", () => {
        const planetRepository = PlanetRepository.getInstance();
        const expectedPlanets = [Fixtures.tatooine()];

        expect(planetRepository.getAll()).toStrictEqual(expectedPlanets);
    });
});
