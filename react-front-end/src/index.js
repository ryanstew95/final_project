import App from './App'
import './style/index.css'
import axios from 'axios'
import { AppProvider } from './components/AppContext'
import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.css'
import App from './App'
import { AppProvider } from './components/AppContext'
import axios from 'axios'
ReactDOM.render(<AppProvider><App /></AppProvider>, document.getElementById('root'))

axios.defaults.baseURL =
process.env.REACT_APP_API_URL || 'http://localhost:3000'

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
