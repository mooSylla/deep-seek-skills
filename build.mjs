import * as esbuild from "esbuild";
console.log(process.env);
await Promise.all([
  esbuild.build({
    entryPoints: ["index.ts"],
    bundle: true,
    outdir: "build/scripts",
    minify: true,
    sourcemap: true,
  }),
  esbuild.build({
    entryPoints: ["index.html"],
    bundle: true,
    outdir: "build/ui",
    loader: {
      ".html": "copy",
    },
  }),
]).catch((e) => {
  console.error(e);
});
