import './scss/main.scss';
import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });
render(
  <Router>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Router>,
  document.getElementById('root')
);

// axios.post('http://localhost:5000',dataToSubmit)
