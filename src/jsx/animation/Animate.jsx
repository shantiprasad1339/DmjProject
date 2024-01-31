import React, { Component } from 'react';
import { TweenMax } from 'gsap';

export default class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.myElement = null;
    }

    componentDidMount() {
        TweenMax.from(this.myElement, 1, { opacity: 0, y: -50 });
    }

    render() {
        return (
            <div ref={(el) => { this.myElement = el; }}>
                <h1>Hello, world!</h1>
            </div>
        );
    }
}
