import Alert, {AlertType} from "./components/Alert/alert";


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Alert type={AlertType.Info} className="toButtom">111111111</Alert>
          <Alert type={AlertType.Success} className="toButtom">2222222222</Alert>
          <Alert type={AlertType.Danger} className="toButtom" desc="55555">111111111</Alert>
          <Alert type={AlertType.Warning} className="toButtom" hasClose >111111111</Alert>
      </header>
    </div>
  );
}

export default App;
