import { Character } from "../model/character";
import { Repository } from "./repository";

export class CharacterRepository extends Repository<Character> {
    private static instance: CharacterRepository = this.createInstance();

    private static createInstance(): CharacterRepository {
        return new CharacterRepository({});
    }

    public static getInstance(): CharacterRepository {
        return this.instance;
    };
}
