import React from 'react';
import {
    Form, Input,Modal, Icon
  } from 'antd';

class RegistrationForm extends React.Component {
  state = { 
      visible: false,
      confirmDirty: false,
      autoCompleteResult: [],
     }

  showModal = () => {
    this.setState({
      visible: true,
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

    return (
      <div style={{display:'inline-block'}}>
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
                 {getFieldDecorator('Email')(
                 <Input />
                )}
            </Form.Item>
        </Form>
        </Modal>      
      </div>
    )
  }
}
const Edit = Form.create({ name: 'aboutme' })(RegistrationForm);
export default Edit;