/**
 * @author:lpf
 * @flow
 *
 **/
import React, {Component} from 'react';
import { Row, Col, Input, Collapse } from 'antd';
import {bindActionCreators} from "redux";
import {setSelectItem, updateComponentDataSourceAction} from "../../../globalReducer";
import {connect} from "react-redux";
// import {bindActionCreators, compose} from 'redux';
// import injectReducer from '@alpha/utils/injectReducer';
// import {connect} from 'react-redux';
const { Panel } = Collapse;
type Props = {
  events: Array<Object>;
};
type State = {
  eventList: Array<Object>;
};

class eventsConfig extends Component<Props, State> {
  static defaultProps = {
    events: [],
  };
  
  constructor(props: Props) {
    super(props);
    const eventList = JSON.parse(JSON.stringify(props.events));
    this.state = { eventList };
  }
  
  render() {
    const { eventList = [] } = this.state;
    console.log(eventList);
    return <div className="event-config-containers">
      <Collapse>
        { eventList.map((event, i) => <Panel header={event.desc || event.name} key={i}>
          <Row>
            <Col span={6}>
              字段
            </Col>
            <Col span={9}>
              绑定到变量
            </Col>
            <Col span={9}>
              说明
            </Col>
          </Row>
          {Object.keys(event.fields ||{}).map(key => <Row key={key}>
            <Col span={6}>
              {key}
            </Col>
            <Col span={9}>
              <Input value={event.fields[key].alias} placeholder="可自定义"/>
            </Col>
            <Col span={9}>
              {event.fields[key].description}
            </Col>
          </Row>)}
        </Panel>)}
      </Collapse>
    </div>;
  }
}

const mapStateToProps = state => ({
  events: state.global.events
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ setSelectItem, updateComponentDataSourceAction }, dispatch),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withConnect(eventsConfig);