const RULES: string[] = [
  "follow these skills",
  "1- Back every claim with a spec reference (section number). Do not answer from memory or common explanations.",
  "\n",
];
const cancel = () => {
  throw new Error();
};

export function monkeyPatchHttpRequest(): void {
  console.log("activating  xhr  polyfill");

  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (data) {
    try {
      console.log("raw data", data);
      const parsedData = typeof data === "string" ? JSON.parse(data) : cancel();
      console.log("parsedData", parsedData);

      const isObject =
        Object.prototype.toString.call(parsedData) === "[object Object]" ||
        cancel();

      const prompt = parsedData.prompt ?? cancel();

      const promptWithSkills = RULES.join(" ") + prompt;

      const body = { ...parsedData, prompt: promptWithSkills };

      console.log("body", body);
      originalSend.call(this, JSON.stringify(body));
    } catch (e) {
      originalSend.call(this, data);
    }
  };
}
