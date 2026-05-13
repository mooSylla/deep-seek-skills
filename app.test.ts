import { monkeyPatchHttpRequest } from "./app";

describe("extention test", () => {
  test("appends rules  to  prompts", () => {
    const deepSeekXhr = new XMLHttpRequest();
    const spy = jest.spyOn(XMLHttpRequest.prototype, "send");

    monkeyPatchHttpRequest();

    deepSeekXhr.open("POST", "http://fakeurl");
    deepSeekXhr.send(
      JSON.stringify({ prompt: "for loop in js", param: "data" }),
    );

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('"prompt":"follow these skills'),
    );
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('"param":"data"'));
  });
});
