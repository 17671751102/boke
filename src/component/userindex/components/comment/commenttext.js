import React from 'react';
import { Input, Button,Avatar,Form} from 'antd';
import axios from 'axios'
// 用来转换axios参数格式与ajax格式一致
import qs from 'qs'
const TextArea = Input.TextArea;
const wzid=window.location.pathname.split('/').pop()
class NormalLoginForm extends React.Component{
    constructor(){
        super()
        this.state={
            message:false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post(this.props.baseurl+'',
                    qs.stringify({
                    auther:values.userName,
                    message:values.userMessage,
                    wZId:wzid
                }))
                .then((json)=>{
                    localStorage.setItem(wzid.wzid,values.userName)
                })
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
                {localStorage.getItem(wzid.wzid)?
                <span><Avatar icon="user" /><span style={{color:'blue'}}>{localStorage.getItem(wzid.wzid)}</span></span>:
                <Form.Item>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入用户名' }],
                })(
                    <Input placeholder="请输入用户名" />
                )}
                </Form.Item>}
                <Form.Item>
                {getFieldDecorator('userMessage', {
                    rules: [{ required: true, message: '请输入用户名' }],
                })(
                    <TextArea rows={4} />
                )}
                </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">留言</Button>
            </Form>
        )
    }
}
const Commenttext = Form.create()(NormalLoginForm);
export default Commenttext