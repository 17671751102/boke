import React from 'react';
import { Input, Button,Avatar,Form,message} from 'antd';
import axios from 'axios'
// 用来转换axios参数格式与ajax格式一致
import qs from 'qs'
import { connect } from 'react-redux';
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
        // localStorage.removeItem(wzid);
        // localStorage.removeItem(wzid.wzid);
        let ip=document.getElementById('ywl_hide').innerHTML
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post(this.props.baseurl+'Blog/insertLiuYan.form',
                    qs.stringify({
                    fKName:values.userName||localStorage.getItem(wzid.wzid),
                    message:values.userMessage,
                    wZId:wzid,
                    email:values.email,
                    lYText:values.userMessage,
                    ip:ip,
                    
                }))
                .then((json)=>{
                    if(json){
                        if(json.data.state==1){
                            localStorage.setItem(wzid.wzid,values.userName)
                            message.success(json.data.message)
                        }else{
                            message.error(json.data.message)
                        }
                    }
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
                <div>
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名' }],
                        })(
                            <Input placeholder="请输入用户名" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: '请输入邮箱' },{
                                type: 'email', message: '请输入正确的邮箱地址',
                              }],
                        })(
                            <Input placeholder="请输入邮箱" />
                        )}
                    </Form.Item>
                </div>
                }
                <Form.Item>
                {getFieldDecorator('userMessage', {
                    rules: [{ required: true, message: '请留言' }],
                })(
                    <TextArea rows={4} />
                )}
                </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">留言</Button>
            </Form>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      baseurl:state.baseurl
    }
}
NormalLoginForm = connect(mapStateToProps)(NormalLoginForm)
const Commenttext = Form.create()(NormalLoginForm);
export default Commenttext