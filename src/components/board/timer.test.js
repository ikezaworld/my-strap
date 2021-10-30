import { convertSecondTommss } from "./timer";

describe("Timer element", () => {
  it("Convert second to 'mmss' format", () => {
    const time = 5 * 60 + 1;
    expect(convertSecondTommss(time)).toStrictEqual({
      minute: "05",
      second: "01",
    });
  });
});
