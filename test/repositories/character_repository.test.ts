import { CharacterRepository } from "../../src/repositories/character_repository";
import { Fixtures } from "../fixtures";

describe("Character repository", () => {
    const characterRepository = CharacterRepository.getInstance();

    beforeEach(() => {
        characterRepository.clear();
    });

    describe("Instantiation", () => {
        test("Returns single instance", () => {
            const hanSolo = Fixtures.hanSolo();
            characterRepository.insert(hanSolo);

            const secondRepository = CharacterRepository.getInstance();
            expect(secondRepository.getAll()).toStrictEqual([hanSolo]);
        });
    });
});
