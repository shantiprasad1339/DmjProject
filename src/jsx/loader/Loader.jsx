import React from "react";
import logo from "../../assets/images/loaderImg.png";
import '../../assets/css/loader.css';
import { TweenMax } from "gsap";


export default class Loader extends React.Component {
    constructor(props) {
        super(props);

        this.containerRef = React.createRef();
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        const containerRef = this.containerRef.current;
        TweenMax.fromTo(
            containerRef,
            0.8,
            { opacity: 0, scale: 1.7 },
            { opacity: 1, scale: 1, repeat: -1, yoyo: true }
        );
    }
    render() {
        return (
            <>
                <div className="loaderOuter" >
                    <div className="logoBox" ref={this.containerRef}>
                        <img src={logo} alt="logo" />
                    </div>
                </div>
            </>
        )
    }
}