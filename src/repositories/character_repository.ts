import { Character } from "../model/character.js";
import { Repository } from "./repository.js";

export class CharacterRepository extends Repository<Character> {
    private static instance: CharacterRepository = this.createInstance();

    private static createInstance(): CharacterRepository {
        return new CharacterRepository({});
    }

    public static getInstance(): CharacterRepository {
        return this.instance;
    };
}
