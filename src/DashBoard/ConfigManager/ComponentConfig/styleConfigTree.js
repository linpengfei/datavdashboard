/**
 * @author:lpf
 * @flow
 *
 **/
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
// import injectReducer from '@alpha/utils/injectReducer';
import { connect } from 'react-redux';
import { updateStyle } from '../../../globalReducer';
import { Collapse, Row, Col, Input, Select, InputNumber } from 'antd';
import get from 'lodash/get';
const { Panel } = Collapse;
const { Option } = Select;
type StyleItem = {
  key: 'string',
  name: 'string',
  desc: 'string',
  dataType: 'number' | 'string' | 'object' | 'color' | 'enum',
  properties?: {
    [key: string]: StyleItem
  },
  default: any,
  range?: Array<number>,
  enums?: Array<{ label: string, value: string }>
};
type Props = {
  path: string,
  item: StyleItem,
  styleItem: Object,
  onUpdate: ({path: string, value: any}) => boolean,
};
type State = {};

class StyleConfigTree extends PureComponent<Props, State> {
  static defaultProps = {
    path: '',
    item: {},
    styleItem: Object,
  };
  
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  renderItem = () => {
    const { item, path, styleItem, onUpdate } = this.props;
    const { dataType, key, properties = {}, name, default: defaultValue, range = [], enums = [] } = item;
    const value = get(styleItem, path, defaultValue);
    let ret = null;
    switch (dataType) {
      case "object":
        const keys = Object.keys(properties);
        ret = (<Collapse accordion>
          <Panel header={name} key="1">
            {keys.map(property => <StyleConfigTreeWarp key={property} item={properties[property]} path={path + '.' + property} />)}
          </Panel>
        </Collapse>);
        break;
      case "number":
        ret = <Row>
          <Col span={4}>{name}:</Col>
          <Col span={20}><InputNumber value={value} min={range[0]} max={range[1]} onChange={value => onUpdate({ path, value })} /></Col>
        </Row>;
        break;
      case "string":
        ret = <Row>
          <Col span={4}>{name}:</Col>
          <Col span={20}><Input value={value} onChange={e => onUpdate({ path, value: e.target.value })} /></Col>
        </Row>;
        break;
      case "color":
        ret = <Row>
          <Col span={4}>{name}:</Col>
          <Col span={20}><Input value={value} onChange={e => onUpdate({ path, value: e.target.value })} /></Col>
        </Row>;
        break;
      case "enum":
        ret =  <Row>
          <Col span={4}>{name}:</Col>
          <Col span={20}>
            <Select value={value} onSelect={value => onUpdate({ path, value })}>
              {enums.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>) }
            </Select>
          </Col>
        </Row>;
        break;
      default:
        break;
    }
    return ret;
  };
  render() {
    return <div className="style-config-tree-item">
      {this.renderItem()}
    </div>;
  }
}
const mapStateToProps = state => ({
    styleItem: state.global.styleItem
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ onUpdate: updateStyle }, dispatch),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const StyleConfigTreeWarp = withConnect(StyleConfigTree);
export default StyleConfigTreeWarp;