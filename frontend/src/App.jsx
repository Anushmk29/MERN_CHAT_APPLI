import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatsPage from "./Pages/ChatsPage";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <Route path="/" component={HomePage} exact />
        <Route path="/chats" component={ChatsPage} />
      </div>
    </>
  );
}

export default App;
