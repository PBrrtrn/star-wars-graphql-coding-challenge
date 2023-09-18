import { GraphQLResponse } from "@apollo/server";
import assert from "assert";

export const expectSuccess = function(expectedResult: {}, response: GraphQLResponse) {
    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).toEqual(expectedResult);
}
