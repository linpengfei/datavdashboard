/**
 * @author:lpf
 * @flow
 *
 **/
import React from 'react';
import { Radio } from 'antd';
type Props = {
  data: {
    labels: Array<{ label: string, value: string }>,
  },
  styleData: {
    size: string,
    buttonStyle: string,
  },
  onSelect: Function,
};
type State = {
  value: string,
};

class SelectLabel extends React.PureComponent<Props, State> {
  static defaultProps = {
    data: {
      labels: [],
    },
    onSelect: () => null,
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  onChange = e => {
    this.setState({ value: e.target.value });
    this.props.onSelect({ label: e.target.value });
  };
  render() {
    const { data } = this.props;
    const { labels = [] } = data;
    const { value } = this.state;
    return <div style={{ width: '100%', height: '100%', background: '#fff' }} ref={this.canvasContainerRef} >
      <Radio.Group value={value} onChange={this.onChange}>
        {labels.map(label => <Radio.Button value={label.value}>{label.label}</Radio.Button>)}
      </Radio.Group>
    </div>;
  }
}

export default SelectLabel;

const config = {
  dataSource: {
    type: 'STATIC',
    name: '静态数据',
    staticData: { 
      labels: [{
        label: '日',
        value: 'day'
      },
        {
          label: '月',
          value: 'month'
        },
        {
          label: '年',
          value: 'year'
        }
      ]},
    desc: '模拟数据接口',
  },
  dataAttr: {
    type: 'object',
    properties: {
      labels: {
        type: 'array',
        title: '数据',
        default: [],
        items: {
          label: {
            type: 'string',
            title: '显示值'
          },
          value: {
            type: 'string',
            title: '选择值'
          }
        }
      },
    }
  },
  styleObj: {
    baseStyle: {
      width: 300,
      height: 50,
      left: 0,
      top: 0,
    },
    configStyle: {
      size: {
        name: '大小',
        key: 'size',
        dataType: 'enum',
        default: 'default',
        enums: [{
          label: '小',
          value: 'small'
        },{
          label: '默认',
          value: 'default'
        },
          {
            label: '大',
            value: 'big'
          }
        ]
      },
      buttonStyle: {
        name: '风格',
        key: 'buttonStyle',
        dataType: 'enum',
        default: 'outline',
        enums: [{
          label: '描边',
          value: 'outline'
        },{
          label: '填色',
          value: 'solid'
        }]
      },
    }
  },
  events: [{
    name: 'test',
    desc: '测试事件',
    type: 'prop',
    propName: 'onSelect',
    fields: {
      label: {                      
        description: "标签值",
        alias: '',
      }
    }
  }]
};
export { config };