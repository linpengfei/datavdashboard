/**
 * @author:lpf
 * @flow
 *
 **/
import React from 'react';
import echarts from 'echarts';
import validate from 'schema-utils';
type Props = {
  data: {
    title: string,
    data: Array<{
      name: 'string',
      stack: 'string',
      data: Array<string | number>,
    }>,
    xAxis: Array<string | number>,
  },
  styleData: {
    grid: {
      left: string,
      right: string,
      bottom: string,
      top: string,
    },
    xAxis: {
      position: string,
      nameGap: number,
    }
  }
};
type State = {};

class Line extends React.PureComponent<Props, State> {
  static defaultProps = {
    data: {
      title: '',
      data: [],
      xAxis: [],
    },
  };
  canvasContainerRef: Object;
  echartsInstance: Object;
  option: Object;
  constructor(props: Props) {
    console.log('line constructor');
    super(props);
    this.canvasContainerRef = React.createRef();
    this.echartsInstance = null;
    this.state = {};
    this.option = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data:[]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: []
    };
    this.generateOption(props);
  }
  resize = () => {
    this.echartsInstance.resize();
  };
  generateOption = (props: Props) => {
    const { data = {}, styleData = {} } = props;
    // validate(config.dataAttr, data);
    const { title, data: lineData, xAxis } = data;
    const legend = lineData.map(item => item.name);
    this.option.title.text = title;
    this.option.xAxis.data = xAxis;
    this.option.legend.data = legend;
    this.option.series = lineData;
    // this.option = Object.assign(this.option, styleData.configStyle);
    this.option.xAxis = { ...this.option.xAxis, ...((styleData.configStyle || {}).xAxis || {}) };
    this.option.grid = { ...this.option.grid, ...((styleData.configStyle || {}).grid || {}) };
    console.log(this.option);
  };
  componentDidMount(): void {
    this.echartsInstance = echarts.init(this.canvasContainerRef.current);
    this.echartsInstance.setOption(this.option);
    window.removeEventListener('resize', this.resize);
    window.addEventListener('resize', this.resize);
  }
  componentWillReceiveProps(nextProps: Props, nextContext: any): void {
    console.log(nextProps.styleData);
    this.props.onChange({ value: new Date() });
    if (nextProps.data !== this.props.data || nextProps.styleData.configStyle !== this.props.styleData.configStyle) {
      this.generateOption(nextProps);
      if (this.echartsInstance) {
        this.echartsInstance.setOption(this.option);
      }
    }
    if(nextProps.styleData.baseStyle.wdith !== this.props.styleData.baseStyle.width || nextProps.styleData.baseStyle.height !== this.props.styleData.baseStyle.height) {
      setTimeout(this.resize, 0);
    }
  }
  componentWillMount(): void {
    window.removeEventListener('resize', this.resize);
    this.echartsInstance && this.echartsInstance.clear();
    this.echartsInstance && this.echartsInstance.dispose();
  }
  render() {
    return <div style={{ width: '100%', height: '100%', background: '#fff' }} ref={this.canvasContainerRef} />;
  }
}

export default Line;

const config = {
  dataSource: {
    type: 'API',
    name: '数据接口api',
    path: '/mock/line/:id=dwwa?title=:title=wada&label=:label',
    repeat: false,
    repeatTime: 10,
    post: "function(response) { \n"+
      "  console.log('response:', response);\n" +
      "  return response.data.data;\n}",
    desc: '模拟数据接口',
  },
  dataAttr: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        title: '标题',
        default: '折线图堆叠',
      },
      data: {
        type: 'array',
        title: '数据',
        default: [{
          name:'邮件营销',
          type:'line',
          stack: '总量',
          data:[120, 132, 101, 134, 90, 230, 210]
        },
          {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
          }],
        items: {
          name: {
            type: 'string',
            title: '名称',
          },
          type: {
            type: 'string',
            title: '类型',
          },
          stack: {
            type: 'string',
            title: '叠加组',
          },
          data: {
            type: 'array',
            title: '具体数据',
            items: {
              type: 'string'
            }
          }
        }
      },
      xAxis: {
        type: 'array',
        items: {
          type: 'string',
        },
        default: ['周一','周二','周三','周四','周五','周六','周日'],
      }
    }
  },
  styleObj: {
    baseStyle: {
      width: 800,
      height: 400,
      left: 0,
      top: 0,
    },
    configStyle: {
      grid: {
        key: 'grid',
        name: '网格',
        desc: '网格设置',
        dataType: 'object',
        properties: {
          left: {
            key: 'left',
            name: '左边距',
            dataType: 'string',
            default: '3%',
          },
          right: {
            key: 'right',
            name: '右边距',
            dataType: 'string',
            default: '3%',
          },
          bottom: {
            key: 'bottom',
            name: '下边距',
            dataType: 'string',
            default: '3%',
          },
          top: {
            key: 'top',
            name: '上边距',
            dataType: 'string',
            default: '3%',
          },
        }
      },
      xAxis: {
        name: 'x轴',
        key: 'xAxis',
        dataType: 'object',
        properties: {
          position: {
            name: 'x轴位置',
            key: 'position',
            dataType: 'enum',
            default: 'bottom',
            enums: [{
              label: '上方',
              value: 'top'
            },{
              label: '下方',
              value: 'bottom'
            }]
          },
          nameGap: {
            key: 'nameGap',
            name: '轴距',
            dataType: 'number',
            default: 15,
          }
        }
      }
    }
  },
  events: [{
    name: 'test',
    desc: '测试事件',
    type: 'prop',
    propName: 'onChange',
    fields: {
      value: {                      
        description: "点击值",
        alias: '',
      }
    }
  }]
};
export { config };