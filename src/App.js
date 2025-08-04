import Alert, {AlertType} from "./components/Alert/alert";
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import Submenu from './components/Menu/subMenu';

function App() {
  return (
    <div className="App">
        <Alert type={AlertType.Success} description="This is a success alert!" >Success</Alert>
        <Alert type={AlertType.Error} description="This is an error alert!" >Error</Alert>
        <Alert type={AlertType.Warning} description="This is a warning!" >Warning</Alert>

      <Menu onSelect={(e) => console.log(e)}>
          <MenuItem index={0}>item1</MenuItem>
          <Submenu title="item2">
            <MenuItem index={1}>subItem1</MenuItem>
            <MenuItem index={2}>subItem2</MenuItem>
            <MenuItem index={3}>subItem3</MenuItem>
          </Submenu>
          <MenuItem index={2}>item3</MenuItem>
          <MenuItem index={3}>item4</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
