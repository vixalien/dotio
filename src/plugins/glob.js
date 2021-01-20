import { sync as glob } from "glob-array";
import path from "path";


export default function getInputFromGlobs(globs, basePath = process.cwd(), options) {
  return Object.fromEntries(
    glob([globs].flat()).map((e) => {
      return [
        path.join(
          path.dirname(path.relative(path.resolve(basePath), e)),
          path.basename(e).replace(new RegExp(path.extname(e) + "$"), "")
        ),
        e,
      ];
    })
  );
}