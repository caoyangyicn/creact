import Button, {ButtonSize} from "./compoments/Button/button";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button>click</Button>
        <Button btnType="primary" size={ButtonSize.Large}>click</Button>
        <Button btnType="link" href="http://www.baidu.com">click</Button>
      </header>
    </div>
  );
}

export default App;
