import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["index.ts"],
  bundle: true,
  outfile: "build/main.js",
  minify: true,
  sourcemap: true,
});
