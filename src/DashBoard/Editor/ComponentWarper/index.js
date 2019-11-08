/**
 * @author:lpf
 * @flow
 *
 **/
import React from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import './index.scss';
import { bindActionCreators } from "redux";
import { setSelectItem } from "../../../globalReducer";
import axios from 'axios';
import _get from 'lodash/get';
import { createSelector } from 'reselect'
import { propsEvent as PropsEventSub } from '../../Subject';
import {Subscription} from "rxjs";
const pathReg = /:\w+(\.\w+)*(=\w+)?/g;
type Props = {
    width: number,
    height: number,
    left: number,
    top: number,
    children: Object,
    id: string,
    itemData: Object,
  setSelectItem: Function,
  dataSource: Object,
  connectDragSource: Function,
};
type State = {
 selected: boolean,
  dataProxy: boolean,
  data: Object,
};

class ComponentWarp extends React.Component<Props, State> {
    static defaultProps = {
      dataSource: {},
    };
    timer: number;
    wrappedInstance: Object;
    eventSelect: Function;
    propEventSubscription: Subscription;
    dataSourceKey: Object;
    constructor(props: Props) {
        super(props);
        this.state = {
          selected: false,
          dataProxy: !!props.dataSource.type,
          data: props.children.props.data || {}
        };
        this.wrappedInstance = React.createRef();
        this.dataSourceKey = new Set();
        this.eventSelect = createSelector(
          props => props?.itemData?.componentData?.events || [],
          events => {
            const eventProps = {};
            const propEvent = events.filter(item => item.type === 'prop');
            propEvent.forEach(event => {
              const { propName, fields } = event;
              const dataTrans = {};
              Object.keys(fields).forEach(key => {
                dataTrans[key] = fields[key].alias || key;
              });
              eventProps[propName] =  (data) => {
                const ret = {};
                Object.keys(data).forEach(key => {
                  ret[dataTrans[key]] = data[key];
                });
                PropsEventSub.emit({ type: propName, data: ret });
              }
            });
            console.log(eventProps);
            return eventProps;
          }
        )
    }
  selectItem = item => {
      console.log(this.props);
    console.log('select:', item);
    if (this.props.configData.id === item.id) {
      return false;
    }
    const { id, initStyleData, componentData } = item;
    const { dataAttr = {}, dataSource = {}, events } = componentData;
    const { configStyle, baseStyle } = initStyleData;
    const selectData = { id, ...JSON.parse(JSON.stringify({ dataAttr, dataSource, events })), styleConfig: componentData.styleObj.configStyle, styleItem: JSON.parse(JSON.stringify({ configStyle, baseStyle }))};
    this.props.setSelectItem(selectData);
  };
    componentWillUnmount(): void {
      clearTimeout(this.timer);
    }
  
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
      if (prevProps.dataSource !== this.props.dataSource) {
        this.resetDataProxy();
      }
    }
  
  componentDidMount() {
      console.log('mount');
      this.resetDataProxy();
      this.propEventSubscription = PropsEventSub.on((res) => {
        console.log(res);
        const { data: eventData  = {}} = res;
        const keys = Object.keys(eventData);
        let fresh = keys.find(key => this.dataSourceKey.has(key));
        if (!fresh) {
          return;
        }
        const { dataSource } = this.props;
        const { type, path, dataFunction, post } = dataSource;
        const { data } = this.state;
        switch(type) {
          case "API":
            let postFunction;
            if(post) {
              try {
                postFunction = new Function('response', post.replace(/^function\([^]*\)[\s]*{[\s]*([^]*)[\s]*}$/, '$1'));
              } catch(e) {
                console.error(e);
              }
            }
            let pathPara = pathReg.exec(path);
            const para = {};
            while(pathPara) {
              const [temp] = pathPara;
              const [a,b] = temp.substr(1).split('=');
              this.dataSourceKey.add(a);
              console.log('a:', a, 'b:', b);
              const value = _get(eventData, a, _get(data, a, b));
              para[temp] = value;
              pathPara = pathReg.exec(path);
            }
            let actualPath = path;
            for(const key in para) {
              actualPath = actualPath.replace(key, para[key]);
            }
            axios.get(actualPath).then(res => {
              // console.log(res);
              const ret = postFunction ? postFunction(res) : res.data.data;
              this.setState({ data: ret });
            });
            break;
          default:
            break;
      }});
      console.log(this.wrappedInstance);
    }
    resetDataProxy = () => {
      clearTimeout(this.timer);
      const { dataSource } = this.props;
      const { type, repeat, repeatTime, path, post, staticData } = dataSource;
      const { data = {} } = this.state;
      this.dataSourceKey = new Set();
      console.log('data:', data);
      switch(type) { 
        case "API":
          let postFunction;
          if(post) {
            try {
              postFunction = new Function('response', post.replace(/^function\([^]*\)[\s]*{[\s]*([^]*)[\s]*}$/, '$1'));
            } catch(e) {
              console.error(e);
            }
          }
          let pathPara = pathReg.exec(path);
          const para = {};
          while(pathPara) {
            console.log(pathPara[0]);
            const [temp] = pathPara;
            const [a,b] = temp.substr(1).split('=');
            this.dataSourceKey.add(a);
            console.log('a:', a, 'b:', b);
            const value = _get(data, a, b);
            para[temp] = value;
            pathPara = pathReg.exec(path);
          }
          console.log(para);
          let actualPath = path;
          for(const key in para) {
            actualPath = actualPath.replace(key, para[key]);
          }
          const cb = () => {
            return axios.get(actualPath).then(res => {
              // console.log(res);
              const ret = postFunction ? postFunction(res) : res.data.data;
              this.setState({ data: ret });
              if(repeat) {
                this.timer = setTimeout(cb, repeatTime * 1000);
              }
            })
          };
          cb();
          break;
        case "FUNCTION":
          let dataFunctionRet;
          try {
            dataFunctionRet = new Function('', post.replace(/^function\([^]*\)[\s]*{[\s]*([^]*)[\s]*}$/, '$1'));
          } catch(e) {
            console.error(e);
          }
          const cb1 = () => {
            return new Promise(resolve => {
              const ret = dataFunctionRet();
              console.log(ret);
              this.setState({ data: ret });
              if(repeat) {
                this.timer = setTimeout(cb1, repeatTime * 1000)
              }
            })
          };
          cb1();
          break;
        case 'STATIC':
          let dataTemp = staticData;
          if (typeof staticData === 'string') {
            try {
              dataTemp = JSON.parse(staticData);
            }catch(e) {
              console.warn(e);
            } 
          }
          this.setState({ data: dataTemp });
          break;
        default:
          break;
      }
    };
    render() {
        const { width, height, left, top, connectDragSource, itemData } = this.props;
        // console.log(this.props);
        const { dataProxy, data } = this.state;
        console.log("dataProxy:",dataProxy);
        return connectDragSource(
            <div className="datav-transform-wrapper" onClick={ () => this.selectItem(itemData) } style={{ width, height, transform: `translate(${left}px, ${top}px)`}}>
              {/*<div className="navigator-line">*/}
              {/*    <div className="navigator-line-left" />*/}
              {/*    <div className="navigator-line-top" />*/}
              {/*    <div className="navigator-line-count">{left},{top}</div>*/}
              {/*</div>*/}
              {/*<ResizableBox width={width} height={height}>*/}
                <div className="datav-warp">
                  {React.cloneElement(this.props.children, { data: dataProxy ? data : undefined, ref: this.wrappedInstance, ...this.eventSelect(this.props) })}
                </div>
              {/*</ResizableBox>*/}
            </div>);
    }
}
const mapStateToProps = state => ({
  configData: { ...state.global }
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ setSelectItem }, dispatch),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withConnect(DragSource('move', {
  beginDrag: function(props, monitor, component) {
    console.log('beginDrag:', props)
    return { id: props.id }
  },
}, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(ComponentWarp));
// export default ComponentWarp;
