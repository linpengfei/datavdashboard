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
import ComponentsRegistryInstance from '../ComponentsFactory/ComponentsRegistry';
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
        },{
          id: 'line',
          type: 'regular',
          resource: '',
          name: '折线图',
          icon: 'http://img.alicdn.com/tfs/TB1RSuyJuuSBuNjy1XcXXcYjFXa-270-160.png',
        },
          {
            id: 'gauge',
            type: 'regular',
            resource: '',
            name: '仪表盘',
            icon: 'http://img.alicdn.com/tfs/TB1RSuyJuuSBuNjy1XcXXcYjFXa-270-160.png',
          },
          {
            id: 'selectLabel',
            type: 'regular',
            resource: '',
            name: '标签',
            icon: 'http://img.alicdn.com/tfs/TB1RSuyJuuSBuNjy1XcXXcYjFXa-270-160.png',
          }
        ],
      
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
                {ComponentsRegistryInstance.getTypeList().map(([type, typeObj]) =>
                    <Panel header={typeObj.name} key={type}>
                        {ComponentsRegistryInstance.getComponents(type).map(c => <ComponentItem info={c} key={c.id}/>)}
                    </Panel>
                )}
            </Collapse>
        </div>;
    }
}

export default ComponentList;
