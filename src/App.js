import React from 'react';
import { Provider } from "react-redux";
import './App.css';
import defaultStore from "./Store/configureStore";
import RouterComponent from "./Routes";

function App() {
  return (
      <Provider store={defaultStore}>
        <RouterComponent/>
      </Provider>
  );
}

export default App;
