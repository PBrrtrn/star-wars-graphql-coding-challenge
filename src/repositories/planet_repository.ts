import { Planet } from "../model/planet.js";
import { Repository } from "./repository.js";

export class PlanetRepository extends Repository<Planet> {
    private static instance: PlanetRepository = this.createInstance();

    private static createInstance(): PlanetRepository {
        return new PlanetRepository({});
    }

    public static getInstance(): PlanetRepository {
        return this.instance;
    };
}
