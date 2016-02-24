import React from 'react';
import ReactDOM from 'react-dom';

import config from './config';
import store from './store';

import Quiz from './quiz.jsx';


$.get(`${config.jsonDataUrl}`).success((data) => {
  store.data = $.parseJSON(data);
  ReactDOM.render(<Quiz/>, document.getElementById('app'));
});
