import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { AppProvider } from './components/AppContext'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
