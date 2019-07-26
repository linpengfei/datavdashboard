/**
 * @author:lpf
 * @flow
 *
 **/
import React, {Component} from 'react';
import './index.scss';
// import {bindActionCreators, compose} from 'redux';
// import {connect} from 'react-redux';

type Props = {};
type State = {};

class Header extends Component<Props, State> {
    static defaultProps = {};

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div className="header-containers">

        </div>;
    }
}

export default Header;
