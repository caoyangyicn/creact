import Tabs from './components/Tabs/tabs';
import TabItem  from "./components/Tabs/tabItem";
import Icon from "./components/Icon/icon";
import Menu from "./components/Menu/menu";
import SubMenu from "./components/Menu/subMenu";
import MenuItem from "./components/Menu/menuItem";

function App() {
  return (

    <div className="App">
        <Icon  size="6x" rotation={90}></Icon>
        <Menu>
            <MenuItem>菜单项1</MenuItem>
            <SubMenu title={"子菜单"}>
                <MenuItem>子项1</MenuItem>
                <MenuItem>子项2</MenuItem>
            </SubMenu>
            <MenuItem>菜单项2</MenuItem>
            <MenuItem>菜单项3</MenuItem>
        </Menu>
      <Tabs>
          <TabItem label="Tab 1">11111</TabItem>
          <TabItem label="Tab 2">2222</TabItem>
          <TabItem label="Tab 3" disabled>3333</TabItem>
      </Tabs>
    </div>
  );
}

export default App;
