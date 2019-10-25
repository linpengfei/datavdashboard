/**
 * @author:lpf
 * @flow
 *
 **/
import React, {PureComponent} from 'react';
import ReactJson from 'react-json-view';
import {bindActionCreators} from "redux";
import {setSelectItem, updateComponentDataSourceAction } from "../../../globalReducer";
import {connect} from "react-redux";
import { Row, Col, Input, Switch, InputNumber, Select, Button } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
// import {bindActionCreators, compose} from 'redux';
// import injectReducer from '@alpha/utils/injectReducer';
// import {connect} from 'react-redux';

type Props = {
  dataSource: Object,
  dataAttr: Object,
};
type State = {
  dataSource: Object,
};

class dataConfig extends PureComponent<Props, State> {
  static defaultProps = {
    dataSource: {},
  };
  
  constructor(props: Props) {
    super(props);
    this.state = { dataSource: props.dataSource };
  }
  componentDidUpdate(prevProps: Props, prevState: State, prevContext: *): * {
    if (prevProps.dataSource !== this.props.dataSource) {
      this.setState({ dataSource: { ...this.props.dataSource } });
    }
  }
  
  renderApiSource = () => {
    const { dataSource } = this.state;
    const { name, path, repeat, repeatTimer, desc, type, post } = dataSource;
    console.log('dataSource:', dataSource, this.props);
    return <>
      <Row>
        <Col span={4}>类型：</Col>
        <Col span={20}>
          <Select value={type} onChange={type => this.setState({ dataSource: { ...dataSource, type } })}>
            <Option value="API">API</Option>
            <Option value="Function">自定义函数</Option>
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={4}>name：</Col>
        <Col span={20}>
          <Input value={name} onChange={e => this.setState({ dataSource: { ...dataSource, name: e.target.value }})}/>
        </Col>
      </Row>
      <Row>
        <Col span={4}>path：</Col>
        <Col span={20}>
          <Input value={path} onChange={e => this.setState({ dataSource: { ...dataSource, path: e.target.value }})}/>
        </Col>
      </Row>
      <Row>
        <Col span={4}>desc：</Col>
        <Col span={20}>
          <Input value={desc} onChange={e => this.setState({ dataSource: { ...dataSource, desc: e.target.value }})}/>
        </Col>
      </Row>
      <Row>
        <Col span={4}>定时更新：</Col>
        <Col span={20}>
          <Switch checkedChildren="开" unCheckedChildren="关" checked={repeat} onChange={repeat => this.setState({ dataSource: { ...dataSource,repeat } })} />
        </Col>
      </Row>
      <Row>
        <Col span={4}>间隔：</Col>
        <Col span={20}>
          <InputNumber value={repeatTimer} onChange={repeatTimer => this.setState({ dataSource: { ...dataSource, repeatTimer }})} />
        </Col>
      </Row>
      {/*todo 后处理函数*/}
      <Row>
        <Col span={4}>后处理函数：</Col>
      </Row>
      <Row>
        <Col span={24}>
          <div style={{ minHeight: 150 }}>
            <TextArea value={post} onChange={e => this.setState({ dataSource:{ ...dataSource, post: e.target.value }})}/>
          </div>
        </Col>
      </Row>
    </>;
  };
  renderFunctionSource = () => {
    const { dataSource } = this.state;
    const { name, dataFunction, repeat, repeatTimer, desc, type } = dataSource;
    return <>
      <Row>
        <Col span={4}>类型：</Col>
        <Col span={20}>
          <Select value={type} onChange={type => this.setState({ dataSource: { ...dataSource, type }})}>
            <Option value="API">API</Option>
            <Option value="Function">自定义函数</Option>
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={4}>name：</Col>
        <Col span={20}>
          <Input value={name} onChange={e => this.setState({ dataSource: { ...dataSource, name: e.target.value }})}/>
        </Col>
      </Row>
      <Row>
        <Col span={4}>desc：</Col>
        <Col span={20}>
          <Input value={desc} onChange={e => this.setState({ dataSource: { ...dataSource,desc: e.target.value }})}/>
        </Col>
      </Row>
      <Row>
        <Col span={4}>定时更新：</Col>
        <Col span={20}>
          <Switch checkedChildren="开" unCheckedChildren="关" checked={repeat} onChange={repeat => this.setState({ dataSource: { ...dataSource,repeat }})} />
        </Col>
      </Row>
      <Row>
        <Col span={4}>间隔：</Col>
        <Col span={20}>
          <InputNumber value={repeatTimer} onChange={repeatTimer => this.setState({ dataSource: { ...dataSource, repeatTimer }})} />
        </Col>
      </Row>
      {/*todo 后处理函数*/}
      <Row>
        <Col span={4}>函数：</Col>
        <Col span={20}>
          <TextArea value={dataFunction} onChange={e => this.setState({ dataSource:{ ...dataSource, dataFunction: e.target.value }})}/>
        </Col>
      </Row>
    </>;
  };
  // generateData
  onUpdateDataSource = () => {
    const { dataSource } = this.state;
    this.props.setSelectItem({ dataSource: JSON.parse(JSON.stringify(dataSource))});
    this.props.updateComponentDataSourceAction(true);
  };
  render() {
    const { dataSource } = this.state;
    const { dataAttr } = this.props;
    const { type } = dataSource;
    return <div className="data-config-containers">
      <div className="data-attr-container">
        <div>数据结构：</div>
        <ReactJson src={dataAttr} name={null} collapsed={false} displayDataTypes={false}/>
      </div>
      <div className="data-source-container">
        { type ? type === 'API' ? this.renderApiSource() : this.renderFunctionSource() : null }
        <Button onClick={this.onUpdateDataSource}>更新</Button>
      </div>
    </div>;
  }
}
const mapStateToProps = state => ({
  dataAttr: state.global.dataAttr,
  dataSource: state.global.dataSource
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ setSelectItem, updateComponentDataSourceAction }, dispatch),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withConnect(dataConfig);