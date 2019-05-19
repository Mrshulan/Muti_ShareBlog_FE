import React, { Component } from 'react'
import { Upload, Icon, message } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"
import { actions as authActions } from '../../../../redux/modules/auth'

import './index.less'

const isPro = process.env.NODE_ENV === 'production'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024  < 2;
  if (!isLt2M) {
    message.error('请上传不大于2M的图片')
  }
  return isLt2M
}

class AvatarCol extends Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
      if(info.file.response.status === 200) {
        message.success(info.file.response.message)
      } else {
        message.error(info.file.response.message)       
      }
      this.props.updateAvatar(info.file.response.avatar)
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={isPro ? "http://mrshulan.xin/api/upload" : 'http://127.0.0.1:6001/upload'}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        withCredentials={true}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        <span>图片不大于2Mb</span>
      </Upload>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(authActions, dispatch)    
})

export default connect(null, mapDispatchToProps)(AvatarCol)