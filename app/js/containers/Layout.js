import React, {Component, PropTypes} from 'react';
import Greeting from '../greeting';

export default class Layout extends Component {
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

Layout.propTypes = {

};