import Alert, {AlertType} from "./components/Alert/alert";
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';


function App() {
  return (
    <div className="App">
      <Menu onSelect={(e) => console.log(e)}>
          <MenuItem index={0}>111111111</MenuItem>
          <MenuItem index={1} disabled>2222222222</MenuItem>
          <MenuItem index={2}>111111111</MenuItem>
          <MenuItem index={3}>111111111</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
