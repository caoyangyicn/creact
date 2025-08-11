import Tabs from './components/Tabs/tabs';
import TabItem  from "./components/Tabs/tabItem";
import Icon from "./components/Icon/icon";

function App() {
  return (

    <div className="App">
        <Icon icon="fa-solid fa-house" size="6x" rotation={90}></Icon>
      <Tabs>
          <TabItem label="Tab 1">11111</TabItem>
          <TabItem label="Tab 2">2222</TabItem>
          <TabItem label="Tab 3" disabled>3333</TabItem>
      </Tabs>
    </div>
  );
}

export default App;
