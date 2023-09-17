import { Coordinates } from "../model/coordinates";
import { Planet } from "../model/planet";

export class PlanetRepository {
    private static instance: PlanetRepository = this.createInstance();

    private static createInstance(): PlanetRepository {
        return new PlanetRepository({});
    }

    private constructor(private data: {[key: number]: Planet}) {};

    private currentId: number = 0;

    public static getInstance(): PlanetRepository {
        return this.instance;
    };

    public getAll(): Planet[] {
        return Object.values(this.data);
    }

    public get(planetId: number): Planet {
        return this.data[planetId];
    }

    public insert(planet: Planet) {
        planet.id = this.currentId;
        this.data[this.currentId] = planet;
        this.currentId++;
    }

    public clear() {
        // TODO: Raise exception if ENV is not test
        this.data = {};
        this.currentId = 0;
    }
}
