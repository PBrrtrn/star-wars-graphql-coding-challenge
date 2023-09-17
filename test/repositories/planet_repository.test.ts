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

    test("Can add a planet", () => {
        const naboo = Fixtures.naboo();
        naboo.id = 0;
        planetRepository.insert(naboo);
        expect(planetRepository.getAll()).toStrictEqual([naboo]);
    });

    test("Can get all planets", () => {
        populateRepository(planetRepository);

        const naboo = Fixtures.naboo();
        naboo.id = 0;
        const tatooine = Fixtures.tatooine();
        tatooine.id = 1;

        expect(planetRepository.getAll()).toStrictEqual([naboo, tatooine]);
    });

    test("Can get a planet by ID", () => {
        populateRepository(planetRepository);

        const tatooine = Fixtures.tatooine();
        tatooine.id = 1;

        expect(planetRepository.get(1)).toStrictEqual(tatooine);
    });
});

const populateRepository = function(planetRepository: PlanetRepository) {
    const naboo = Fixtures.naboo();
    const tatooine = Fixtures.tatooine();
    planetRepository.insert(naboo);
    planetRepository.insert(tatooine);
}
