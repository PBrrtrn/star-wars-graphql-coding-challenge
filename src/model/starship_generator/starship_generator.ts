import { Starship } from "../starship.js";
import { GenerationCriteria } from "./attributes_generation_criteria/generation_criteria.js";
import { Coordinates } from "../coordinates.js";

export class StarshipGenerator {
    readonly MIN_CARGO_CAPACITY = 0.0;
    readonly MAX_CARGO_CAPACITY = 100.0;

    constructor(
        private generationCriteria: GenerationCriteria,
        private nameOptions: string[],
        private modelOptions: string[]
    ) {}

    public generateStarship(): Starship {
        return new Starship(
            this.selectOne(this.nameOptions),
            this.selectOne(this.modelOptions),
            this.generateCargoCapacity(),
            this.generateCoordinates()
            )
    }

    private selectOne<T>(options: T[]): T {
        return options[this.generationCriteria.generateNumber(0, options.length - 1)];
    }

    private generateCargoCapacity(): number {
        return this.generationCriteria.generateNumber(this.MIN_CARGO_CAPACITY, this.MAX_CARGO_CAPACITY);
    }

    private generateCoordinates(): Coordinates {
        return new Coordinates(
            this.generationCriteria.generateNumber(Coordinates.MIN_LATITUDE, Coordinates.MAX_LATITUDE),
            this.generationCriteria.generateNumber(Coordinates.MIN_ALTITUDE, Coordinates.MAX_ALTITUDE)
        );
    }
}
