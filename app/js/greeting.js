import React, { Component } from 'react';
import styles from 'styles/main';

export default class Greeting extends Component {
    render() {
        return (
            <div className={styles.greeting}>
                Hello, {this.props.name}!
            </div>
        );
    }
};