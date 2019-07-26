/**
 * @author:lpf
 * @flow
 *
 **/
import React from 'react';
import './index.scss';

type Props = {
    width: number,
    height: number,
    left: number,
    top: number,
    children: Object,
};
type State = {
    selected: boolean,
};

class ComponentWarp extends React.Component<Props, State> {
    static defaultProps = {};

    constructor(props: Props) {
        super(props);
        this.state = {
            selected: false,
        };
    }

    render() {
        const { width, height, left, top } = this.props;
        console.log(this.props);
        const { selected } = this.state;
        return <div className="datav-transform-wrapper" style={{ width, height, transform: `translate(${left}px, ${top}px)`}}>
            <div className="navigator-line">
                <div className="navigator-line-left" />
                <div className="navigator-line-top" />
                <div className="navigator-line-count">{left},{top}</div>
            </div>
            <div className="datav-scale">
                <div className="datav-warp">
                    {this.props.children}
                </div>
                {/*{select}*/}
            </div>
        </div>;
    }
}

export default ComponentWarp;
