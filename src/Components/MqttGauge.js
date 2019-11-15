/**
 * @author:lpf
 * @flow
 *
 **/
import React from 'react';
import echarts from 'echarts';
type Props = {
  data: {
    value: number,
  },
  styleData: {
    // grid: {
    //   left: string,
    //   right: string,
    //   bottom: string,
    //   top: string,
    // },
    // xAxis: {
    //   position: string,
    //   nameGap: number,
    // }
  }
};
type State = {};

class MqttGauge extends React.PureComponent<Props, State> {
  static defaultProps = {
    data: {
      value: 1,
    },
  };
  canvasContainerRef: Object;
  echartsInstance: Object;
  option: Object;
  constructor(props: Props) {
    super(props);
    this.canvasContainerRef = React.createRef();
    this.echartsInstance = null;
    this.state = {};
    this.option = {
      tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          detail: {formatter:'{value}%'},
          data: [{value: 50, name: '完成率'}]
        }
      ]
    };
    this.generateOption(props);
  }
  resize = () => {
    this.echartsInstance.resize();
  };
  generateOption = (props: Props) => {
    const { data = {}, styleData = {} } = props;
    // validate(config.dataAttr, data);
    const { value } = data;
    this.option.series[0].data[0].value = value;
  };
  componentDidMount(): void {
    this.echartsInstance = echarts.init(this.canvasContainerRef.current);
    this.echartsInstance.setOption(this.option);
    window.removeEventListener('resize', this.resize);
    window.addEventListener('resize', this.resize);
  }
  componentWillReceiveProps(nextProps: Props, nextContext: any): void {
    if (nextProps.data !== this.props.data) {
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

export default MqttGauge;

const config = {
  dataSource: {
    type: 'MQTT',
    name: 'MQTT测试',
    path: 'mqtt://127.0.0.1',
    username: 'admin',
    password: 'admin',
    post: "function(response) { \n"+
      "  console.log('responseaa:', response);\n" +
      "  return response;\n}",
    desc: '随机生成数据',
  },
  dataAttr: {
    type: 'object',
    properties: {
      value: {
        type: 'number',
        title: '属性值',
        default: '10',
      },
    },
  },
  styleObj: {
    baseStyle: {
      width: 400,
      height: 400,
      left: 0,
      top: 0,
    },
    configStyle: {}
  },
  events: []
};
export { config };