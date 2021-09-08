import { expect } from "chai";
import cssToCsx from "../src/index";

describe("cssToCsx", () => {
  it("expect function to returns object", () => {
    const csxObject = cssToCsx(".admin {background-color: black}");
    expect(csxObject).to.be.equals({ admin: { backgroundColor: "black" } });
  });
});
