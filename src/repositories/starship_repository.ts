import { Starship } from "../model/starship";
import { Repository } from "./repository";

export class StarshipRepository extends Repository<Starship> {
    private static instance: StarshipRepository = this.createInstance();

    private static createInstance(): StarshipRepository {
        return new StarshipRepository({});
    }

    public static getInstance(): StarshipRepository {
        return this.instance;
    };
}
