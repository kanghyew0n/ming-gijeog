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
          return cssString.push(`/*자동으로 생성되는 파일입니다! 변경 금지*/ \n ${selector} {\n${cssVariables}\n}`);
        }

        if (colorKey === "dark") {
          const selector = ":root .theme-dark";

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
          return cssString.push(`/*자동으로 생성되는 파일입니다! 변경 금지*/ \n ${selector} {\n${cssVariables}\n}`);
        }
      });
      return
    }

    const selector = ":root";

    const cssVariables = Object.entries(value)
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
    return cssString.push(`/*자동으로 생성되는 파일입니다! 변경 금지*/ \n ${selector} {\n${cssVariables}\n}`);
  });
  return cssString;
};

const generateThemeCssClasses = () => {
  const cssString = [];

  Object.entries(theme.classes).forEach(([, value]) => {
    const cssClasses = Object.entries(value)
      .map(([mainKey, mainValue]) => (
        Object.entries(mainValue)
          .map(([subKey, subValue]) => {

            const className = `.${toCssCasting(mainKey)}${toCssCasting(subKey)}`;

            const styleProperties = Object.entries(subValue).map(([styleKey, styleValue]) => (
              `${toCssCasting(styleKey)}: ${styleValue};`
            )).join('\n');

            return `${className} {\n${styleProperties}\n}`;
          }).join('\n')
      )).join('\n');

    cssString.push(cssClasses);
  })

  return cssString;
}




const generateThemeCss = () => {
  const variables = generateThemeCssVariables();
  const classes = generateThemeCssClasses()

  // variables은 root고 class는 그 위에 생성되어야 함
  fs.writeFileSync("dist/themes.css", [...variables, ...classes].join("\n")); // dist 파일의 themes.css는 자동으로 만들어지는 파일!!
};

generateThemeCss();