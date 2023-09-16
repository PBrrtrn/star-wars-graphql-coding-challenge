import { PlanetRepository } from "../../src/repositories/planet_repository";
import { Fixtures } from "../fixtures";

describe("Planet repository", () => {
    const planetRepository = PlanetRepository.getInstance();

    beforeEach(() => {
        planetRepository.clear();
    });

    describe("Instantiation", () => {
        test("Returns single instance", () => {
            const naboo = Fixtures.naboo();
            planetRepository.insert(naboo);

            const secondRepository = PlanetRepository.getInstance();
            expect(secondRepository.getAll()).toStrictEqual([naboo]);
        });
    });

    test("Starts empty", () => {
        expect(planetRepository.getAll()).toStrictEqual([]);
    });

    test("Can add a planet", () => {
        const naboo = Fixtures.naboo();
        planetRepository.insert(naboo);
        expect(planetRepository.getAll()).toStrictEqual([naboo]);
    });
});
