/**
 * @author:lpf
 * @flow
 *
 **/
import React from 'react';
import './index.scss';
import classname from 'classname';
// import {bindActionCreators, compose} from 'redux';
// import injectReducer from '@alpha/utils/injectReducer';
// import {connect} from 'react-redux';

type Props = {
    scale: number,
    axis: 'x' | 'y',
};
type State = {};
class Ruler extends React.PureComponent<Props, State> {
    static defaultProps = {};
    containerRef: Object;
    canvasRef: Object;
    constructor(props: Props) {
        super(props);
        this.state = {};
        this.containerRef = React.createRef();
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        this.drawRule(canvas);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(prevProps.scale !== this.props.scale) {
            this.drawRule(this.canvasRef.current);
        }
    }

    drawRule = (canvas: HTMLCanvasElement) => {
        if(!canvas) {
            return;
        }
        const { width, height } = canvas.getBoundingClientRect();
        const { scale } = this.props;
        const ctx = canvas.getContext('2d');
        const actualWidth = Math.max(width, height);
        const actualHeight = Math.min(width, height);
        canvas.width = actualWidth;
        canvas.height = actualHeight;
        ctx.clearRect(0,0,actualWidth, actualHeight);
        const graduate = Math.floor(100 * scale);
        const maxNum = actualWidth / graduate * 10;
        ctx.lineWidth = 1;
        ctx.strokeStyle='#d5d5d5';
        ctx.fillStyle = '#d5d5d5';
        ctx.beginPath();
        for( let i =0; i <= maxNum; i++) {
            const x = 30 + graduate / 10 * i;
            if( i % 10 === 0) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, actualHeight);
                ctx.fillText(i * 10, x, 10);
            } else {
                ctx.moveTo(x, actualHeight - 10);
                ctx.lineTo(x, actualHeight);
            }
        }
        ctx.stroke();
    };

    render() {
        const { axis } = this.props;
        return <div ref={this.containerRef} className={classname({ 'ruler-containers': true, 'x-ruler': axis=== 'x', 'y-ruler': axis === 'y' })}>
            <canvas className="ruler" ref={this.canvasRef} />
        </div>;
    }
}

export default Ruler;
