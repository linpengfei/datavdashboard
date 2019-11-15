/**
 * @author:lpf
 * @flow
 *
 **/
import React, {Component} from 'react';
import { Row, Col, Input, Collapse, Button } from 'antd';
import {bindActionCreators} from "redux";
import {setSelectItem, updateComponentEventsAction } from "../../../globalReducer";
import {connect} from "react-redux";
// import {bindActionCreators, compose} from 'redux';
// import injectReducer from '@alpha/utils/injectReducer';
// import {connect} from 'react-redux';
const { Panel } = Collapse;
type Props = {
  events: Array<Object>;
  setSelectItem: Function,
  updateComponentEventsAction: Function,
};
type State = {
  events: Array<Object>;
};

class eventsConfig extends Component<Props, State> {
  static defaultProps = {
    events: [],
  };
  
  constructor(props: Props) {
    super(props);
    const events = JSON.parse(JSON.stringify(props.events));
    this.state = { events };
  }
  componentDidUpdate(prevProps) {
    if(prevProps.events !== this.props.events) {
      this.setState({ events: JSON.parse(JSON.stringify(this.props.events))})
    }
  }
  onUpdateEvents = () => {
    const { events } = this.state;
    this.props.setSelectItem({ events: JSON.parse(JSON.stringify(events ))});
    this.props.updateComponentEventsAction(true);
  }
  render() {
    const { events = [] } = this.state;
    return <div className="event-config-containers">
      <Collapse>
        { events.map((event, i) => <Panel header={event.desc || event.name} key={i}>
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
              <Input value={event.fields[key].alias} placeholder="可自定义" onChange={e => {
                const alias = e.target.value;
                const { events } = this.props;
                events[i].fields[key].alias = alias;
                this.setState({ events });
              }}/>
            </Col>
            <Col span={9}>
              {event.fields[key].description}
            </Col>
          </Row>)}
        </Panel>)}
      </Collapse>
      <Button onClick={this.onUpdateEvents}>应用</Button>
    </div>;
  }
}

const mapStateToProps = state => ({
  events: state.global.events
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ setSelectItem, updateComponentEventsAction }, dispatch),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withConnect(eventsConfig);