import { Coordinates } from "../model/coordinates";
import { Planet } from "../model/planet";

export class PlanetRepository {
    private static instance: PlanetRepository = this.createInstance();

    private static createInstance(): PlanetRepository {
        return new PlanetRepository([]);
    }

    private constructor(private data: Planet[]) {};

    public static getInstance(): PlanetRepository {
        return this.instance;
    };

    public getAll(): Planet[] {
        return this.data;
    }

    public insert(planet: Planet) {
        this.data.push(planet);
    }

    public clear() {
        // TODO: Raise exception if ENV is not test
        this.data = [];
    }
}
