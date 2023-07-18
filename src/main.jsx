import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import store from "./Redux/store";
import { Provider } from "react-redux"
import { createTheme, ThemeProvider } from "@mui/material"

const theme = createTheme({
  typography: {
    fontFamily: [
      'Noto Sans Lao'
    ].join(','),
  },});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
