import { GenerationCriteria } from "./generation_criteria";

export class SelectionCriteria {
    constructor(
        private generationCriteria: GenerationCriteria
    ) {}

    public selectOne<T>(options: [T]): T {
        return options[this.generationCriteria.generateNumber(0, options.length - 1)];
    }
}
