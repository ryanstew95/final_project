import React from 'react'
import ReactDOM from 'react-dom'
console.log(ReactDOM)
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom'

import './style/index.css'
import App from './App'
// import * as serviceWorker from './serviceWorker'
import { AppProvider } from './components/AppContext'
// import axios from 'axios'

// axios.defaults.baseURL =
// process.env.REACT_APP_API_URL || 'http://localhost:3000'
const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(

    <AppProvider>
      <App />
    </AppProvider>

)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
