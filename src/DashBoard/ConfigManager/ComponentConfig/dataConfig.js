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
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-xcode";
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
  renderData = type => {
    switch (type) {
      case "API":
        return this.renderApiSource();
      case "STATIC":
        return this.renderStaticData();
      case "FUNCTION":
        return this.renderFunctionSource();
      default:
        return null;
    }
  };
  renderApiSource = () => {
    const { dataSource } = this.state;
    const { name, path, repeat, repeatTime, desc, type, post } = dataSource;
    console.log('dataSource:', dataSource, this.props);
    return <>
      <Row>
        <Col span={4}>类型：</Col>
        <Col span={20}>
          <Select value={type} onChange={type => this.setState({ dataSource: { ...dataSource, type } })}>
            <Option value="API">API</Option>
            <Option value="Function">自定义函数</Option>
            <Option value="STATIC">静态数据</Option>
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
          <InputNumber value={repeatTime} onChange={repeatTime => this.setState({ dataSource: { ...dataSource, repeatTime }})} />
        </Col>
      </Row>
      {/*todo 后处理函数*/}
      <Row>
        <Col span={4}>后处理函数：</Col>
      </Row>
      <Row>
        <Col span={24}>
          <div style={{ minHeight: 150 }}>
            <AceEditor
              placeholder="Placeholder Text"
              mode="javascript"
              theme="xcode"
              name="blah2"
              height="150px"
              // onLoad={this.onLoad}
              onChange={post => this.setState({ dataSource:{ ...dataSource, post }})}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={post}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}/>
            {/*<TextArea value={post} onChange={e => this.setState({ dataSource:{ ...dataSource, post: e.target.value }})}/>*/}
          </div>
        </Col>
      </Row>
    </>;
  };
  renderFunctionSource = () => {
    const { dataSource } = this.state;
    const { name, post, repeat, repeatTime, desc, type } = dataSource;
    return <>
      <Row>
        <Col span={4}>类型：</Col>
        <Col span={20}>
          <Select value={type} onChange={type => this.setState({ dataSource: { ...dataSource, type }})}>
            <Option value="API">API</Option>
            <Option value="Function">自定义函数</Option>
            <Option value="STATIC">静态数据</Option>
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
          <InputNumber value={repeatTime} onChange={repeatTime => this.setState({ dataSource: { ...dataSource, repeatTime }})} />
        </Col>
      </Row>
      {/*todo 后处理函数*/}
      <Row>
        <Col span={4}>函数：</Col>
        <Col span={20}>
          <AceEditor
            placeholder="Placeholder Text"
            mode="javascript"
            theme="xcode"
            name="blah2"
            height="150px"
            // onLoad={this.onLoad}
            onChange={dataFunction => this.setState({ dataSource:{ ...dataSource, dataFunction }})}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={post}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}/>
          {/*<TextArea value={dataFunction} onChange={e => this.setState({ dataSource:{ ...dataSource, dataFunction: e.target.value }})}/>*/}
        </Col>
      </Row>
    </>;
  };
  renderStaticData = () => {
    const { dataSource } = this.state;
    const { name, desc, type, staticData } = dataSource;
    return <>
      <Row>
        <Col span={4}>类型：</Col>
        <Col span={20}>
          <Select value={type} onChange={type => this.setState({ dataSource: { ...dataSource, type } })}>
            <Option value="API">API</Option>
            <Option value="Function">自定义函数</Option>
            <Option value="STATIC">静态数据</Option>
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
          <Input value={desc} onChange={e => this.setState({ dataSource: { ...dataSource, desc: e.target.value }})}/>
        </Col>
      </Row>
      {/*todo 后处理函数*/}
      <Row>
        <Col span={4}>静态数据：</Col>
      </Row>
      <Row>
        <Col span={24}>
          <div style={{ minHeight: 150 }}>
            <AceEditor
              placeholder="Placeholder Text"
              mode="javascript"
              theme="xcode"
              name="blah2"
              // onLoad={this.onLoad}
              height="150px"
              onChange={staticData => this.setState({ dataSource:{ ...dataSource, staticData }})}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={ typeof  staticData === 'string' ? staticData : JSON.stringify(staticData, null, 2)}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}/>
            {/*<TextArea value={post} onChange={e => this.setState({ dataSource:{ ...dataSource, post: e.target.value }})}/>*/}
          </div>
        </Col>
      </Row>
    </>;
  };
  renderMqttSource = () => {
    const { dataSource } = this.state;
    const { name, desc, type, path, username, password, topic, cb } = dataSource;
    return <>
      <Row>
        <Col span={4}>类型：</Col>
        <Col span={20}>
          <Select value={type} onChange={type => this.setState({ dataSource: { ...dataSource, type }})}>
            <Option value="API">API</Option>
            <Option value="Function">自定义函数</Option>
            <Option value="STATIC">静态数据</Option>
            <Option value="MQTT">MQTT</Option>
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
      {/*todo 后处理函数*/}
      <Row>
        <Col span={4}>数据处理：</Col>
        <Col span={20}>
          <AceEditor
            placeholder="Placeholder Text"
            mode="javascript"
            theme="xcode"
            name="blah2"
            height="150px"
            // onLoad={this.onLoad}
            onChange={dataFunction => this.setState({ dataSource:{ ...dataSource, dataFunction }})}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={cb}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}/>
          {/*<TextArea value={dataFunction} onChange={e => this.setState({ dataSource:{ ...dataSource, dataFunction: e.target.value }})}/>*/}
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
        { this.renderData(type)}
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