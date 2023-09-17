import { Planet } from "../model/planet";
import { Repository } from "./repository";

export class PlanetRepository extends Repository<Planet> {
    private static instance: PlanetRepository = this.createInstance();

    private static createInstance(): PlanetRepository {
        return new PlanetRepository({});
    }

    public static getInstance(): PlanetRepository {
        return this.instance;
    };
}
