import * as theme from "../dist/index.js";
import fs from "fs";

// theme.css 이런식으로 작업되어 나타나도록 제너레이팅 함
// :root {
//   --gray-900: #171923
// }

const toCssCasting = (str) => {
  return str
    .replace(/([a-z])(\d)/, "$1-$2")
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase();
};

const generateThemeCssVariables = () => {
  const cssString = [];
  Object.entries(theme.vars).forEach(([key, value]) => {
    if (key === "colors") {
      Object.entries(value.$static).forEach(([colorKey, colorValue]) => {
        if (colorKey === "light") {
          const selector = ":root";

          const cssVariables = Object.entries(colorValue)
            .map(([mainKey, mainValue]) =>
              Object.entries(mainValue)
                .map(
                  ([subKey, subValue]) =>
                    `--${toCssCasting(mainKey)}-${toCssCasting(
                      subKey
                    )}: ${subValue};`
                )
                .join("\n")
            )
            .join("\n"); // array들을 줄바꿈해서 합쳐줌

            // 자동 생성 파일이기 때문에 주석으로 표시해둠
          cssString.push(`/*자동으로 생성되는 파일입니다! 변경 금지*/ \n ${selector} {\n${cssVariables}\n}`);
        }
      });
    }
  });
  return cssString;
};

const generateThemeCss = () => {
  const variables = generateThemeCssVariables();

  fs.writeFileSync("dist/themes.css", [...variables].join("\n")); // dist 파일의 themes.css는 자동으로 만들어지는 파일!!
};

generateThemeCss();