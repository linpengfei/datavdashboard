/**
 * @author:lpf
 * @flow
 *
 **/
import React, { PureComponent } from 'react';
import { Row, Col, InputNumber, Button } from 'antd';
import {bindActionCreators} from "redux";
import {setSelectItem, updateStyle, updateComponentStyleAction} from "../../../globalReducer";
import {connect} from "react-redux";
import StyleConfigTree from './styleConfigTree';
// import {bindActionCreators, compose} from 'redux';
// import injectReducer from '@alpha/utils/injectReducer';
// import {connect} from 'react-redux';
// 样式定义
type Style = {
  [key: string] : {
    name: string,
    type: 'string' | 'number',
    options?: Array<{ name: string, value: string }>,
    default: string | number,
  }
};
type Props = {
  id: string,
  styleItem: {
    baseStyle: {
      width: number,
      height: number,
      left: number,
      top: number,
    }
  },
  updateStyle: ({path: string, value: any }) => null,
};
type State = {
  id: string,
  width: number,
  height: number,
  left: number,
  top: number,
  style: Style,
};

class styleConfig extends PureComponent<Props, State> {
  static defaultProps: Props = {
    id: 'demo',
    styleItem: {
      baseStyle: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      }
    },
  };
  
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { styleItem = {}, styleConfig, updateStyle, id, updateComponentStyleAction } = this.props;
    const { baseStyle } = styleItem;
    const { width, height, left, top } = baseStyle;
    const keys = Object.keys(styleConfig);
    return id ? (<div className="style-config-containers">
      <Row>
        <Col span={4}>
          宽度:
        </Col>
        <Col span={20}>
          <InputNumber value={width} onChange={value => updateStyle({ path: 'baseStyle.width', value })}/>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          高度:
        </Col>
        <Col span={20}>
          <InputNumber value={height} onChange={value => updateStyle({ path: 'baseStyle.height', value })}/>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          左间距:
        </Col>
        <Col span={20}>
          <InputNumber value={left} onChange={value => updateStyle({ path: 'baseStyle.left', value })}/>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          上间距:
        </Col>
        <Col span={20}>
          <InputNumber value={top} onChange={value => updateStyle({ path: 'baseStyle.top', value })}/>
        </Col>
      </Row>
      {
        keys.map(key => <StyleConfigTree key={key} path={`configStyle.${key}`} item={styleConfig[key] }/>)
      }
      <Button onClick={() => updateComponentStyleAction(true)}>更新配置</Button>
    </div>) : null;
  }
}
const mapStateToProps = state => ({
  ...state.global
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ setSelectItem, updateStyle, updateComponentStyleAction }, dispatch),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withConnect(styleConfig);