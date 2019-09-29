/**
 * @author:lpf
 * @flow
 *
 **/
import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import './index.scss';
import Rule from './Ruler';
import { DropTarget } from 'react-dnd'
import PagePanel from './PagePanel';
// import { bindActionCreators, compose } from 'redux';
// import { connect } from 'react-redux';
import ComponentsFactory from '../ComponentsFactory';
import { generateUuid } from '../../utils';
import ComponentWarp from './ComponentWarper';
type Props = {
    connectDropTarget: Function,
};
type State = {
    scale: number,
    componentData: Array<Object>,
};
class Editor extends Component<Props, State> {
    static defaultProps = {};
    componentsFactory: ComponentsFactory;
    constructor(props: Props) {
        super(props);
        this.state = {
            scale: 0.525,
            componentData: [],
        };
        this.componentsFactory = new ComponentsFactory();
    }

    componentDidMount() {
        console.log(this.containerRef);
    }
    insertComponent(type: string, position: { left: number, top: number }) {
        this.componentsFactory.getComponent(type).then((com: {default: Object, config: Object}) => {
            console.log(com);
            const data = { id: generateUuid(type), component: com.default, componentData: { ...JSON.parse(JSON.stringify(com.config)), ...position } };
            this.setState({ componentData: [...this.state.componentData, data ]});
        });
    }
    render() {
        // console.log(this.props);
        const { connectDropTarget } = this.props;
        const { scale, componentData } = this.state;
        console.log(this.state);
        return connectDropTarget(<div className="editor-containers">
            <Rule axis='x' scale={scale} />
            <Rule axis='y' scale={scale} />
            <PagePanel scale={scale} >
                {componentData.map(item => {
                    const { id, component: Warp, componentData } = item;
                    return <ComponentWarp key={id} left={componentData.left} top={componentData.top} width={componentData.width} height={componentData.height}>
                        <Warp title={123}/>
                    </ComponentWarp>;
                })}
            </PagePanel>
        </div>);
    }
}
function collect(connect, monitor, props) {
    // console.log('props', props);
    // console.log('connect', connect);
    // console.log('monitor', monitor);
    return {
        connectDropTarget: connect.dropTarget(),
        // canDrop: monitor.canDrop(),
        // isOver: monitor.isOver(),
        // getItemType: monitor.getItemType(),
        // getItem: monitor.getItem(),
        // getDropResult: monitor.getDropResult(),
        // didDrop: monitor.didDrop(),
        // getClientOffset: monitor.getClientOffset(),
    };
}
export default DropTarget(['create', 'operate'], {
    drop: (props, monitor, component) => {
        if(!component) {
            return;
        }
        const { left, top } = findDOMNode(component)?.getBoundingClientRect();
        const { x, y } = monitor.getSourceClientOffset();
        const { scale } = component.state;
        component.insertComponent(monitor.getItem().id, { left: (x - left -60) /scale, top: (y - top -60) /scale});
    },
}, collect)(Editor);
