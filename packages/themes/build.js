import esbuild from "esbuild";
import pkg from "./package.json" assert { type: "json" };

const dev = process.argv.includes("--dev"); // 개발 환경일 경우 minify 하지않음
const minify = !dev;

const watch = process.argv.includes("--watch");

// package.json 에 있는 디펜던시 가져오기
const external = Object.keys({
  ...pkg.devDependencies,
  ...pkg.peerDependencies,
});

const baseConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify,
  sourcemap: true,
  outdir: "dist",
  target: "es2019",
  watch,
  external,
};

// 빌드 병렬적으로 실행해줌
Promise.all([
  // es module 대응
  esbuild.build({
    ...baseConfig,
    format: "esm",
  }),

  // commonjs 대응
  esbuild.build({
    ...baseConfig,
    format: "cjs",
    outExtension: {
      ".js": ".cjs", // commonjs 제공
    },
  }),
]).catch(() => {
  console.error("build failed");
  process.exit(1); // 에러 났을 경우 프로젝트 종료
});
