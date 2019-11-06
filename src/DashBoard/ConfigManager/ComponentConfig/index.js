/**
 * @author:lpf
 * @flow
 *
 **/
import React, {Component} from 'react';
// import {bindActionCreators, compose} from 'redux';
// import injectReducer from '@alpha/utils/injectReducer';
// import {connect} from 'react-redux';
import StyleConfig from './styleConfig';
import DataConfig from './dataConfig';
import EventsConfig from './eventsConfig';
import { Tabs, Input, Row, Col } from 'antd';
const { TabPane } = Tabs;
type Props = {
  id: string,
};
type State = {};

class index extends Component<Props, State> {
  static defaultProps = {};
  
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return <Tabs>
      <TabPane tab="样式" key="style">
        <StyleConfig />
      </TabPane>
      <TabPane tab="数据" key="data">
        <DataConfig />
      </TabPane>
      <TabPane tab="交互" key="action">
        <EventsConfig />
      </TabPane>
    </Tabs>;
  }
}

export default index;