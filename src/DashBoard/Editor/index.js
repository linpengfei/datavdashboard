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
import {bindActionCreators} from "redux";
import {updateComponentStyleAction, updateComponentDataSourceAction } from "../../globalReducer";
import {connect} from "react-redux";
type Props = {
    connectDropTarget: Function,
  dataSource:Object,
  id: string,
  updateComponentDataSource: boolean,
  updateComponentStyle: boolean,
  styleItem: {
    configStyle: Object,
    baseStyle: Object,
  }
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
    componentDidUpdate(props, state) {
       console.log('update:', state, props);
       if(props.updateComponentStyle !== this.props.updateComponentStyle && this.props.updateComponentStyle) {
         const { id, styleItem } = this.props;
         id && this.updateComponentStyleData(id, styleItem);
       }
      if(props.updateComponentDataSource !== this.props.updateComponentDataSource && this.props.updateComponentDataSource) {
        const { id, dataSource } = this.props;
        id && this.updateSourceData(id, dataSource);
      }
    }
    insertComponent(type: string, position: { left: number, top: number }) {
        this.componentsFactory.getComponent(type).then((com: {default: Object, config: Object}) => {
            console.log(com, position);
            const initPropsData = this.generatePropsData(com.config.dataAttr);
            const styleObj = JSON.parse(JSON.stringify(com.config.styleObj));
            styleObj.baseStyle.left = position.left;
            styleObj.baseStyle.top = position.top;
            const initStyleData = { configStyle: {}};
            const keys = Object.keys(styleObj.configStyle);
            keys.forEach(key => {
              initStyleData.configStyle[key] = this.generateStyleData(styleObj.configStyle[key], {})
            });
            initStyleData.baseStyle = styleObj.baseStyle;
            console.log(initStyleData);
            const data = { id: generateUuid(type), type, component: com.default, componentData: { ...JSON.parse(JSON.stringify(com.config)), styleObj }, initPropsData, initStyleData };
            this.setState({ componentData: [...this.state.componentData, data ]});
        });
    }
    updateComponent = (id: string, position: { left: number, top: number }) => {
        console.log(id);
        const { componentData } = this.state;
        let updateData = componentData.find(item => item.id === id);
        const { styleObj } = updateData.componentData;
        updateData.componentData = { ...updateData.componentData, styleObj: { ...styleObj, baseStyle: { ...styleObj.baseStyle, ...position }} };
        componentData.splice(componentData.indexOf(updateData), 1, updateData);
        this.setState({ componentData: [].concat(componentData) });
    };
    updateComponentStyleData = (id: string, styleItem) => {
      const { componentData } = this.state;
      let updateData = componentData.find(item => item.id === id);
      updateData.initStyleData = JSON.parse(JSON.stringify(styleItem));
      updateData.componentData.styleObj = JSON.parse(JSON.stringify(styleItem));
      componentData.splice(componentData.indexOf(updateData), 1, updateData);
      this.setState({ componentData: [].concat(componentData) });
      this.props.updateComponentStyleAction(false);
    };
  updateSourceData = (id: string, dataSource) => {
    const { componentData } = this.state;
    let updateData = componentData.find(item => item.id === id);
    updateData.componentData.dataSource = JSON.parse(JSON.stringify(dataSource));
    componentData.splice(componentData.indexOf(updateData), 1, updateData);
    this.setState({ componentData: [].concat(componentData) });
    this.props.updateComponentDataSourceAction(false);
  };
  generatePropsData = (dataAttr, init) =>{
      const { type } = dataAttr;
      let ret = init;
      if(dataAttr.default) {
        if(typeof dataAttr.default !== 'function' || (typeof dataAttr.default !== 'function' && type === 'function')) {
          ret = dataAttr.default;
          return ret;
        } else if (type !== 'function') {
          ret = dataAttr.default();
          return ret;
        }
      }
      switch(type) {
        case 'string':
          break;
        case 'object':
          ret = ret || {};
          const { properties } = dataAttr;
          const keys = Object.keys(properties);
          for(const key of keys) {
            ret[key] = this.generatePropsData(properties[key], {});
          }
          break;
        case 'function':
          break;
        default:
          break;
      }
      return ret;
  };
    generateStyleData = (data, init) => {
      let ret = init;
        const { dataType, properties, default: defaultValue } =  data;
      if(defaultValue !== undefined) {
          ret = defaultValue;
          return ret;
      }
        switch(dataType) {
          case 'string':
            break;
          case 'object':
            ret = ret || {};
            const keys = Object.keys(properties);
            for(const key of keys) {
              ret[key] = this.generateStyleData(properties[key], {});
            }
            break;
          default:
            break;
        }
      return ret;
    };
    render() {
        // console.log(this.props);
        const { connectDropTarget } = this.props;
        const { scale, componentData } = this.state;
        return connectDropTarget(<div className="editor-containers">
            <Rule axis='x' scale={scale} />
            <Rule axis='y' scale={scale} />
            <PagePanel scale={scale} >
                {componentData.map(item => {
                    const { id, component: Warp, componentData, initPropsData, initStyleData } = item;
                    const { width, height, left, top } = componentData.styleObj.baseStyle;
                    return <ComponentWarp itemData={item} key={id} id={id} left={~~left} top={~~top} width={~~width} height={~~height} dataSource={componentData.dataSource}>
                        <Warp title={123} data={initPropsData} styleData={initStyleData}/>
                    </ComponentWarp>;
                })}
            </PagePanel>
        </div>);
    }
}
const mapStateToProps = state => ({
  id: state.global.id,
  styleItem: state.global.styleItem,
  updateComponentStyle: state.global.updateComponentStyle,
  dataSource: state.global.dataSource,
  updateComponentDataSource: state.global.updateComponentDataSource,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateComponentStyleAction, updateComponentDataSourceAction }, dispatch),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
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
export default withConnect(DropTarget(['create', 'operate', 'move'], {
    drop: (props, monitor, component) => {
      console.log('drop', component);
        if(!component) {
            return;
        }
        const { left, top } = findDOMNode(component)?.getBoundingClientRect();
        const { x, y } = monitor.getSourceClientOffset();
        const { scale } = component.state;
        const type = monitor.getItemType();
        console.log('drop:', monitor.getItemType());
        switch(type) {
          case 'create':
            component.insertComponent(monitor.getItem().id, { left: ~~((x - left -60) /scale), top: ~~((y - top -60) /scale)});
            break;
          case 'move':
            component.updateComponent(monitor.getItem().id, { left: ~~((x - left -60) /scale), top: ~~((y - top -60) /scale)});
            break;
        }
    },
}, collect)(Editor));
