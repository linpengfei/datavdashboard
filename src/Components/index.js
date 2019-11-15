/**
 * @author:lpf
 * @flow
 *
 **/
import ComponentsRegistryInstance from '../DashBoard/ComponentsFactory/ComponentsRegistry';
// import Text from './Text';
// import Line from './Line';
// import Gauge from './Gauge';
// import SelectLabel from './SelectLabel';
// export { Text, Line, Gauge, SelectLabel };
// ComponentsRegistryInstance.registry('normal', 
//   { id: 'text', name: '标题', icon: 'http://img.alicdn.com/tfs/TB1RSuyJuuSBuNjy1XcXXcYjFXa-270-160.png',
//     resource: function() {
//       return import(/* webpackChunkName: "text" */ './Text');
//     }
// });
ComponentsRegistryInstance.registry('chart',
  { id: 'line', name: '折线图', icon: 'http://img.alicdn.com/tfs/TB1RSuyJuuSBuNjy1XcXXcYjFXa-270-160.png',
    resource: function() {
      return import(/* webpackChunkName: "line" */ './Line');
    }
  });
ComponentsRegistryInstance.registry('chart',
  { id: 'gauge', name: '仪表盘', icon: 'http://img.alicdn.com/tfs/TB1RSuyJuuSBuNjy1XcXXcYjFXa-270-160.png',
    resource: function() {
      return import(/* webpackChunkName: "gauge" */ './Gauge');
    }
  });
ComponentsRegistryInstance.registry('chart',
  { id: 'mqttGauge', name: 'Mqtt仪表盘', icon: 'http://img.alicdn.com/tfs/TB1RSuyJuuSBuNjy1XcXXcYjFXa-270-160.png',
    resource: function() {
      return import(/* webpackChunkName: "mqttGauge" */ './MqttGauge');
    }
  });
ComponentsRegistryInstance.registry('normal',
  { id: 'selectLabel', name: '选择标签', icon: 'http://img.alicdn.com/tfs/TB1RSuyJuuSBuNjy1XcXXcYjFXa-270-160.png',
    resource: function() {
      return import(/* webpackChunkName: "selectLabel" */ './SelectLabel');
    }
  });
console.log('aa');