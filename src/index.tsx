import * as React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from "./app/store"
import App from "./App"
ReactDOM.render(
  <React.StrictMode>

    <Provider store={store} >
      <BrowserRouter>
        <App></App>
      </BrowserRouter>

    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);

