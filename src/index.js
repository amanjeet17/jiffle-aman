import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Apps from './Apps';
import { BrowserRouter,Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// const Report = (
//   <h1> Hello Report</h1>
// )

const routes =(
<BrowserRouter>
<div>
  <Route exact path="/" component={App} />
  <Route exact path="/v1" component={Apps} />

</div>

</BrowserRouter>
);


ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
