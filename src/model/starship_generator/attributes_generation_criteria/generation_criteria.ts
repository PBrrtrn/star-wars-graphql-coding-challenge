import { convertToRange } from "../../../utils/convert_to_range.js";

export interface GenerationCriteria {
    generateNumber(lowerBound: number, upperBound: number): number;
}

export class RandomGenerationCriteria implements GenerationCriteria {
    public generateNumber(lowerBound: number, upperBound: number): number {
        return convertToRange(Math.random(), [0, 1], [lowerBound, upperBound]);
    }
}

export class DeterministicGenerationCriteria implements GenerationCriteria {
    public generateNumber(lowerBound: number, _upperBound: number): number {
        return lowerBound;
    }
}
