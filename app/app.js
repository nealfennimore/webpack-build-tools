import React from 'react';
import { render } from 'react-dom';
import Greeting from 'scripts/greeting';

render(
    <Greeting name='World'/>,
    document.getElementById('app')
);