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
    constructor(props: Props) {
        super(props);
        this.state = {
          selected: false,
          dataProxy: !!props.dataSource.type,
          data: props.children.props.data
        };
        console.log(props.children.props.data);
    }
  selectItem = item => {
      console.log(this.props);
    console.log('select:', item);
    const { id, initStyleData, componentData } = item;
    const { dataAttr = {}, dataSource = {} } = componentData;
    const { configStyle, baseStyle } = initStyleData;
    const selectData = { id, ...JSON.parse(JSON.stringify({ dataAttr, dataSource })), styleConfig: componentData.styleObj.configStyle, styleItem: JSON.parse(JSON.stringify({ configStyle, baseStyle }))};
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
      this.resetDataProxy();
    }
    resetDataProxy = () => {
      clearTimeout(this.timer);
      const { dataSource } = this.props;
      const { type, repeat, repeatTimer, path, dataFunction, post } = dataSource;
      switch(type) {
        case "API":
          const cb = () => {
            let postFunction;
            if(post) {
              postFunction = new Function('response', post);
            }
            return axios.get(path).then(res => {
              // console.log(res);
              const ret = postFunction ? postFunction(res) : res.data.data;
              this.setState({ data: ret });
              if(repeat) {
                this.timer = setTimeout(cb, repeatTimer * 1000);
              }
            })
          };
          cb();
          break;
        case "FUNCTION":
          const cb1 = () => {
            return new Promise(resolve => {
              const ret = dataFunction();
              console.log(ret);
              if(repeat) {
                this.timer = setTimeout(cb1, repeatTimer * 1000)
              }
            })
          };
          cb1();
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
        return connectDragSource(<div className="datav-transform-wrapper" onClick={ () => this.selectItem(itemData) } style={{ width, height, transform: `translate(${left}px, ${top}px)`}}>
            <div className="navigator-line">
                <div className="navigator-line-left" />
                <div className="navigator-line-top" />
                <div className="navigator-line-count">{left},{top}</div>
            </div>
            <div className="datav-scale">
                <div className="datav-warp">
                    { dataProxy ? React.cloneElement(this.props.children, { data }) : this.props.children}
                </div>
                {/*{select}*/}
            </div>
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
