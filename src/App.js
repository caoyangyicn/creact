import Tabs from './components/Tabs/tabs';
import TabItem  from "./components/Tabs/tabItem";

function App() {
  return (
    <div className="App">
      <Tabs>
          <TabItem label="Tab 1">11111</TabItem>
          <TabItem label="Tab 2">2222</TabItem>
          <TabItem label="Tab 3">3333</TabItem>
      </Tabs>
    </div>
  );
}

export default App;
