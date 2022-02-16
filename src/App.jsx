import logo from './logo.svg';
import './App.less';
import { Button } from "antd"
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <Button>点我试试</Button>
      </header>
    </div>
  );
}

export default App;
