/**
 * @author:lpf
 * @flow
 *
 **/
import mqtt from 'mqtt';
const defaultOptions = {
  // hostname: 'oasis-at.h3c.com',
  // path: '/mqtt',
  // port: '28083',
  // protocol: 'wss',
  connectTimeout: 30 * 1000,
  keepalive: 50,
  reconnectPeriod: 60 * 1000,
  cleanSession: false,
  useSSL: true,
  // username: 'hziotny',
  // password: 'public',
};
type Option = {
  hostname: string,
  path: string,
  username?: string,
  password?: string,
};
class MqttClient {
  constructor(option: Option, path, topic, cb) {
    this.option = { ...defaultOptions, ...option };
    this.client = null;
    this.topic = topic;
    this.cb = cb;
    this.path = path;
  }
  connect() {
    this.client = mqtt.connect(this.path, this.option);
    this.client.on('connect', () => console.log('connect'));
    this.client.on('message', (tp, datasource) => {
      this.client.subscribe(this.topic);
      try {
        // const dataStr = datasource.toString();
        // const data = JSON.parse(dataStr);
        // console.log(topic, data);
        tp === this.topic && this.cb(datasource);
        console.log(this.topic, tp, datasource);
      } catch (e) {
        console.error(e);
      }
    });
    this.client.on('close', () => console.log('close'));
    };
  destroy() {
    this.client.unsubscribe(this.topic);
    this.client && this.client.end(true);
    this.option = null;
    this.client = null;
    this.topic = null;
    this.cb = null;
    this.path = null;
  }
}
export default MqttClient;