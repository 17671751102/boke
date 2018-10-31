import React from 'react';
import {Form, Input, Button,Spin,Icon} from 'antd';
import { connect } from 'react-redux'
import axios from 'axios'
// 用来转换axios参数格式与ajax格式一致
import qs from 'qs'
import '@css/login.scss'
const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
    constructor(){
        super()
        this.state={
            loading:false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                axios.post(this.props.baseurl+'Blog/usersLoad.form',qs.stringify({
                    zhangHao:values.username,
                    miMa:values.password
                }))
                .then((json)=>{
                    console.log('登陆成功')
                })
            }
        })
    }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Spin tip="Loading..." spinning={this.state.loading}>
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem>
                    <Icon type="user"/>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input autoComplete="off" autoFocus placeholder="请输入用户名"/>
                    )}
                </FormItem>
                <FormItem>
                    <Icon type="lock"/>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input type="password" autoComplete="off" placeholder="请输入密码"/>
                    )}
                </FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button" id="loginfrom">登录</Button>
            </Form>
        </Spin>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      baseurl: state.baseurl
    }
}
NormalLoginForm = connect(mapStateToProps)(NormalLoginForm)
const LoginForm = Form.create()(NormalLoginForm);
export default LoginForm