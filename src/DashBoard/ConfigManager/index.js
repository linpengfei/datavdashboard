/**
 * @author:lpf
 * @flow
 *
 **/
import React, {Component} from 'react';
import './index.scss';
import { Tabs } from 'antd';
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

        </div>;
    }
}
export default ConfigManager;
