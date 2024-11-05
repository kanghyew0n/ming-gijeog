import logo from "./logo.svg";
import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { vars, classes } from "@kanghyewon/themes";
import styled from "@emotion/styled";

function App() {
  console.log(vars.box.shadows);

  const theme = {
    colors: vars.colors.$static.light,
  };

  return (
    <ThemeProvider theme={theme}>
      <View />
    </ThemeProvider>
  );
}

const View = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Text>
          Edit <code>src/App.tsx</code> and save to reload.
        </Text>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

/* color: ${({theme}) => theme.colors.gray[300]}; // 타입 정의가 필요할듯 */

const Text = styled.p`
  ${classes.typography.heading["4xl"]};
  color: ${vars.colors.$static.light
    .gray[300]}; // theme 말고 바로 사용도 가능함
`;

export default App;
