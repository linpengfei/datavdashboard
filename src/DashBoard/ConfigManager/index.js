/**
 * @author:lpf
 * @flow
 *
 **/
import React, {Component} from 'react';
import './index.scss';
import { Tabs } from 'antd';
import ProjectConfig from './ProjectConfig';
import ComponentConfig from './ComponentConfig';
const { TabPane } = Tabs;
// import {bindActionCreators, compose} from 'redux';
// import {connect} from 'react-redux';

type Props = {};
type State = {};

class ConfigManager extends Component<Props, State> {
    static defaultProps = {};

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div className="config-manager-containers">
          <Tabs>
            <TabPane tab="项目" key="project">
              <ProjectConfig />
            </TabPane>
            <TabPane tab="组件" key="component">
              <ComponentConfig />
            </TabPane>
          </Tabs>
        </div>;
    }
}
export default ConfigManager;
