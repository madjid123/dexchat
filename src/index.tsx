import * as React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store, persistor } from "./app/store"
import { PersistGate } from "redux-persist/integration/react"
import App from "./App"
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor} >
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode >,
  document.getElementById('root')
);

