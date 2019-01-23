import React from 'react';
import '@css/edit.scss'
import {
    Form, Input,Modal, Icon, Upload, message
  } from 'antd';

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }
class RegistrationForm extends React.Component {
  state = { 
      visible: false,
      confirmDirty: false,
      autoCompleteResult: [],
      loading1: false,
      loading2: false,
      loading3: false,
      imageUrl1:null,
      imageUrl2:null,
      imageUrl3:null,
     }

  showModal = () => {
    this.setState({
      visible: true,
      loading1: false,
      loading2: false,
      loading3: false,
      imageUrl1:null,
      imageUrl2:null,
      imageUrl3:null,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  handleChange = (a,info) => {
    console.log(a)
    if(a==1){
      if (info.file.status === 'uploading') {
        this.setState({ loading1: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl1 => this.setState({
          imageUrl1,
          loading: false,
        }));
      }
    }else if(a==2){
      if (info.file.status === 'uploading') {
        this.setState({ loading2: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl2 => this.setState({
          imageUrl2,
          loading: false,
        }));
      }
    }else{
      if (info.file.status === 'uploading') {
        this.setState({ loading3: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl3 => this.setState({
          imageUrl3,
          loading: false,
        }));
      }
    }
    
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const uploadButton1 = (
      <div>
        <Icon type={this.state.loading1 ? 'loading' : 'plus'} />
        <div className="ant-upload-text">微信</div>
      </div>
    );
    const uploadButton2 = (
      <div>
        <Icon type={this.state.loading2 ? 'loading' : 'plus'} />
        <div className="ant-upload-text">QQ</div>
      </div>
    );
    const uploadButton3 = (
      <div>
        <Icon type={this.state.loading3 ? 'loading' : 'plus'} />
        <div className="ant-upload-text">微博</div>
      </div>
    );
    const imageUrl1 = this.state.imageUrl1;
    const imageUrl2 = this.state.imageUrl2;
    const imageUrl3 = this.state.imageUrl3;

    return (
      <div style={{display:'inline-block',cursor: 'pointer'}}>
        <Icon type="edit" onClick={this.showModal} />
        <Modal
          title="ABOUT ME"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          centered={true}
        >
        <Form onSubmit={this.handleSubmit}>           
            <Form.Item
                {...formItemLayout}
                label="Name"
            >
                {getFieldDecorator('name')(
                <Input />
            )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="Job"
            >
                {getFieldDecorator('job')(
                <Input />
            )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="Wechat"
            >
                {getFieldDecorator('Wechat')(
                <Input />
            )}
            </Form.Item>
            <Form.Item
                   {...formItemLayout}
                   label="E-mail"
               >
                   {getFieldDecorator('email', {
                       rules: [{
                       type: 'email', message: '请输入正确的E-mail地址',
                       }],
                   })(
                   <Input />
               )}
            </Form.Item>
        </Form>
          <Upload
            name="wechat"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="//jsonplaceholder.typicode.com/posts/"
            beforeUpload={beforeUpload}
            onChange={this.handleChange.bind(this,1)}
          >
            {imageUrl1 ? <img src={imageUrl1} style={{width:86,height:86}}/> : uploadButton1}
          </Upload>
          <Upload
            name="QQ"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="//jsonplaceholder.typicode.com/posts/"
            beforeUpload={beforeUpload}
            onChange={this.handleChange.bind(this,2)}
          >
            {imageUrl2 ? <img src={imageUrl2}  style={{width:86,height:86}}/> : uploadButton2}
          </Upload>
          <Upload
            name="weibo"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="//jsonplaceholder.typicode.com/posts/"
            beforeUpload={beforeUpload}
            onChange={this.handleChange.bind(this,3)}
          >
            {imageUrl3 ? <img src={imageUrl3} style={{width:86,height:86}} /> : uploadButton3}
          </Upload>
        </Modal>      
      </div>
    )
  }
}
const Edit = Form.create({ name: 'aboutme' })(RegistrationForm);
export default Edit;