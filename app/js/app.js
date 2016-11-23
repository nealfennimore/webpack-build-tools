import React, {Component, PropTypes} from 'react';
import Greeting from './greeting';

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Greeting name='World' />
            </div>
        );
    }
}

App.propTypes = {

};