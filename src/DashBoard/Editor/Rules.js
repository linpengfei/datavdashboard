/**
 * @author:lpf
 * @flow
 *
 **/
import React from 'react';
import './rules.scss';
import classname from 'classname';
// import {bindActionCreators, compose} from 'redux';
// import injectReducer from '@alpha/utils/injectReducer';
// import {connect} from 'react-redux';

type Props = {
    scale: number,
    axis: 'x' | 'y',
};
type State = {};
class Rules extends React.PureComponent<Props, State> {
    static defaultProps = {};
    containerRef: Object;
    canvasRef: Object;
    constructor(props: Props) {
        super(props);
        this.state = {};
        this.containerRef = React.createRef();
        this.canvasRef = React.createRef();
    }

    render() {
        const { axis } = this.props;
        return <div ref={this.containerRef} className={classname({ 'rule-containers': true, 'x-rule': axis=== 'x', 'y-rule': axis === 'y' })}>
            <canvas ref={this.canvasRef} />
        </div>;
    }
}

export default Rules;
