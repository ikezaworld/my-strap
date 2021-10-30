import { elmStore } from "../const";
import { selectHandBtn } from "./handButton";

describe("handButton element", () => {
  it("If an element already exists, return that element.", () => {
    elmStore.handButton = "test";
    expect(selectHandBtn()).toBe("test");
  });
});
