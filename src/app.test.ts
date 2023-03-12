import assert from "node:assert";
import { after, before, describe, it } from "node:test";
import { env } from "./env";

describe("App test", () => {

  before(() => {
    console.log('before init test suit')
  })

  after(() => {
    console.log('After end test suit')
  })
  
  it('should get PORT value', () => {
    assert.equal(env.PORT, 'dev')
  });
  
});
