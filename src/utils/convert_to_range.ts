export const convertToRange = function(number: number, oldRange: number[], newRange: number[]) {
    return (((number - oldRange[0]) * (newRange[1] - newRange[0])) / (oldRange[1] - oldRange[0])) + newRange[0];
}