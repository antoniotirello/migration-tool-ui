import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import {ConfigProvider} from "antd"
import 'antd/dist/antd.css'
import "./App.css"
import {Provider} from "react-redux";
import {store} from "./app/store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <ConfigProvider
          theme={{
              token: {
                  colorPrimary: '#1677ff',
                  borderRadius: 6,
              },
          }}
      >
          <Provider store={store}>
            <App />
          </Provider>
      </ConfigProvider>
  </React.StrictMode>,
)