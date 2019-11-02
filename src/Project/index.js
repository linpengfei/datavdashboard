/**
 * @author:lpf
 * @flow
 *
 **/
import React, {Component} from 'react';
// import {bindActionCreators, compose} from 'redux';
// import injectReducer from '@alpha/utils/injectReducer';
// import {connect} from 'react-redux';
import { Card, Col, Row, Icon } from 'antd';
import { Link } from 'react-router-dom';
import "./index.scss";
type Props = {};
type State = {};

class index extends Component<Props, State> {
  static defaultProps = {};
  
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return <div className="project-manage-containers" style={{ background: '#ECECEC', padding: '30px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Link to="/dashboard/1">
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to="/dashboard/2">
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            <Icon type="plus" />
            添加新项目
          </Card>
        </Col>
      </Row>
    </div>;
  }
}

export default index;