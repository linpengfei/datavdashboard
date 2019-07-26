/**
 * @author:lpf
 * @flow
 *
 **/
import React from 'react';
import './index.scss';
import type { Component } from '../../type';
import { TypeInfo } from '../../type';
import { Collapse } from 'antd';
import ComponentItem from './ComponentItem';
const { Panel } = Collapse;
type Props = {
    components: Array<Component>;
};
type State = {};
type ComponentType = 'text' | 'map' | 'regular' | 'media';
class ComponentList extends React.Component<Props, State> {
    static defaultProps = {
        components: [{
            id: 'text',
            type: 'text',
            resource: '',
            name: '标题',
            icon: 'http://img.alicdn.com/tfs/TB1RSuyJuuSBuNjy1XcXXcYjFXa-270-160.png',
        }],
    };
    static types = ['text', 'map', 'regular', 'media'];
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        const { components } = this.props;
        return <div className="component-list-containers">
            <Collapse bordered={false}>
                {ComponentList.types.map(type =>
                    <Panel header={TypeInfo[type]} key={type}>
                        {components.filter(item => item.type === type).map(c => <ComponentItem info={c} key={c.id}/>)}
                    </Panel>
                )}
            </Collapse>
        </div>;
    }
}

export default ComponentList;
