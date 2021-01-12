import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './style.css';
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
    <App />
  </Router>,
  document.getElementById('root')
);

// axios.post('http://localhost:5000',dataToSubmit)
