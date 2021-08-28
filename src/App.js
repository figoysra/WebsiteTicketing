/* eslint-disable react/react-in-jsx-scope */
import {BrowserRouter} from 'react-router-dom'
import Router from "./Router/indexs"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
