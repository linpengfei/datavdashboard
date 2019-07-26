/**
 * @author:lpf
 * @flow
 *
 **/
import React, {Component} from 'react';
import './index.scss';
// import {bindActionCreators, compose} from 'redux';
// import injectReducer from '@alpha/utils/injectReducer';
// import {connect} from 'react-redux';

type Props = {
    children: Array<Object>,
    scale: number,
};
type State = {};

class index extends Component<Props, State> {
    static defaultProps = {};

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        const { scale } = this.props;
        return <div className="page-panel" style={{ transform: `scale(${scale}) translate(0px, 0px)`}}>
            {this.props.children}
        </div>;
    }
}

export default index;
