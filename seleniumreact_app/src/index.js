import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store'
import App from './App';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Lexend Deca",
      'sans-serif'
    ].join(','),
  },});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store} >
        <App />
      </Provider>
    </BrowserRouter >
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);