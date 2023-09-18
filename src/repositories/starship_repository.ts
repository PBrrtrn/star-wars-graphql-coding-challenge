import { Starship } from "../model/starship.js";
import { Repository } from "./repository.js";

export class StarshipRepository extends Repository<Starship> {
    private static instance: StarshipRepository = this.createInstance();

    private static createInstance(): StarshipRepository {
        return new StarshipRepository({});
    }

    public static getInstance(): StarshipRepository {
        return this.instance;
    };
}
