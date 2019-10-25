/**
 * @author:lpf
 * @flow
 *
 **/
import React, { Component } from 'react';
// import {bindActionCreators, compose} from 'redux';
// import injectReducer from '@alpha/utils/injectReducer';
// import {connect} from 'react-redux';
import { Row, Col, Input, Button, Upload, Icon } from 'antd';
import { SliderPicker } from 'react-color';
type Props = {
  config: {
    width: number,
    height: number,
    title: number,
    backgroundColor: string,
    backgroundImg: string,
  }
};
type State = {
  width: number,
  height: number,
  title: number,
  backgroundColor: string,
  backgroundImg: string,
  loading: boolean,
};
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
class index extends Component < Props, State > {
  static defaultProps = {
    config: {
      width: 1920,
      height: 1080,
      title: 'demo',
      backgroundColor: '',
      backgroundImg: '',
    }
  };
  constructor(props: Props) {
    super(props);
    this.state = { ...props.config, loading: false };
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, backgroundImg =>
        this.setState({
          backgroundImg,
          loading: false,
        }),
      );
    }
  };
  render() {
    const { width, height, title, backgroundColor, backgroundImg } = this.state;
    return (<div className="project-config-containers">
      <Row>
        <Col span={4}>
          标题:
        </Col>
        <Col span={20}>
          <Input value={title} onChange={e => this.setState({ title: e.target.value })}/>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          宽度:
        </Col>
        <Col span={8}>
          <Input value={width} onChange={e => this.setState({ width: e.target.value })}/>
        </Col>
        <Col span={4}>
          高度:
        </Col>
        <Col span={8}>
          <Input value={height} onChange={e => this.setState({ height: e.target.value })}/>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          背景色:
        </Col>
        <Col span={20}>
          <SliderPicker color={backgroundColor} onChangeComplete={color => this.setState({ backgroundColor: color.hex })} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          背景图片:
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={this.handleChange}
          >
            {backgroundImg ? <img src={backgroundImg} alt="avatar" style={{ width: '100%' }} /> :       <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div> }
          </Upload>
        </Col>
      </Row>
      <Button>更新</Button>
    </div>);
  }
}
export default index;