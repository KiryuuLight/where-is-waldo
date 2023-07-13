import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Main from './components/Main';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: 'Press Start 2P', cursive;
    margin : 0;
    padding : 0;
    background-color: #303a48;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Main />
    </>
  );
}

export default App;
