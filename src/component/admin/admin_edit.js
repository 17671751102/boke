import React from 'react';
import { Modal, Button,message , Form, Input,Upload,Icon,Select,Radio,Tag, Tooltip } from 'antd';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux'
// import RadioButton from 'antd/lib/radio/radioButton';
// 富文本编辑器/资讯内容
import Wangeditor from '@js/wangedit/wangedit';
import axios from 'axios'
// 用来转换axios参数格式与ajax格式一致
import qs from 'qs'
import '@css/admin_edit.scss'
const FormItem = Form.Item;
const Option = Select.Option;
class Addconsult_new extends React.Component {
    constructor(){
        super()
        this.state={
            textstatus:'done',
            // 标签
            tags: [],
            inputVisible: false,
            inputValue: '',
            origin:'1',
        }
    }
    componentDidMount(){
        if(window.location.pathname!='/admin_edit/'){
            this.Loadlist();
        }
    }
    Loadlist=()=>{
        axios.post(this.props.baseurl+'Blog/selectWenZhangById.form',qs.stringify({
            wZId:window.location.pathname.split('/').pop(),
        }))
        .then((json)=>{
            let tags =[];
            tags =json.data[0].biaoQian.split(',');
            const div =document.getElementsByClassName('w-e-text')[0]
            div.innerHTML=json.data[0].wZText
            this.setState({
                inputValue:json.data[0],
                tags:tags,
                origin:json.data[0].YC
            })
        })
    }

    // 网站验证
    checkUrl(rule, value, callback){
        var re = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if(value==null||value===''||re.test(value)){
            callback()
        }else{
            callback('请输入正确的网站域名')
        }
    }
    // 标签的事件
    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });
    }
    
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }
    
    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }
    
    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        this.setState({
          tags,
          inputVisible: false,
          inputValue: '',

        });
    }
    
    saveInputRef = input => this.input = input
    // 表单提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                var content=document.getElementsByClassName('w-e-text')[0].innerHTML
                if(this.state.textstatus=='done'){
                    var a=window.location.pathname!='/admin_edit/'?'Blog/updateWenZhang.form':'Blog/insertWenZhang.form'
                    axios.post(this.props.baseurl+a,
                        qs.stringify({
                        wZTitle:values.titles,
                        WZJJ:values.Desc,
                        biaoQian:this.state.tags.join(","),
                        YC:values.kkkk,
                        wZurl:values.link,
                        wZText:content,
                        wZId:window.location.pathname!='/admin_edit/'?window.location.pathname.split('/').pop():''
                    }))
                    .then((json)=>{
                        if(json.data[0].status==1){
                            message.success(json.data[0].message)
                            this.props.history.push('/')
                        }else{
                            message.error(json.data[0].message)
                        }
                    })
                }else{message.error('文件还未上传完成')}
            }
        })
    }

    // 咨询来源
    onChange1(e){
        this.setState({
            origin:e.target.value
        })
    }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { tags, inputVisible, inputValue } = this.state;
    // const { goBack } = this.props.history
    return (
      <div className='addfrom'>
        <Form onSubmit={this.handleSubmit} className='k_biaodan'>
            <div className="addconsultbody">
                <FormItem label="资讯标题" >
                    {getFieldDecorator('titles', {
                        rules: [{ required: true, message: '请输入标题' },{ max: 50, message: '标题只能少于50字' }],
                        initialValue:this.state.inputValue.wZTitle
                    })(
                        <Input autoComplete="off" placeholder="请输入资讯标题 0/50字"/>
                    )}
                </FormItem>
                <FormItem label="资讯简介">
                	{getFieldDecorator('Desc', {
                        rules: [{ message: '请输入资讯简介'},{max:200,message:'最多只能输入200字'}],
                        initialValue:this.state.inputValue.WZJJ
                    })(
                        <textarea placeholder="请输入资讯简介 0/200字"/>
                    )}
                </FormItem>
                <FormItem label="资讯标签">
                   {getFieldDecorator('lable', {
                        rules: [{ message: ''}],
                        initialValue:this.state.tags
                    })(
                        <div className="Lable">
                                {tags.map((tag, index) => {
                                const isLongTag = tag.length > 8;
                                const tagElem = (
                                    <Tag key={tag} closable afterClose={() => this.handleClose(tag)}>
                                    {isLongTag ? `${tag.slice(0, 8)}...` : tag}
                                    </Tag>
                                );
                                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                                })}
                                {inputVisible && (
                                <Input
                                    ref={this.saveInputRef}
                                    type="text"
                                    size="small"
                                    style={{ width: 78 }}
                                    value={inputValue}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleInputConfirm}
                                    onPressEnter={this.handleInputConfirm}
                                />
                                )}
                                {!inputVisible && (
                                <Tag
                                    onClick={this.showInput}
                                    style={{ background: '#fff', borderStyle: 'dashed' }}
                                >
                                    <Icon type="plus" /> 新增
                                </Tag>
                                )}
                        </div>
                    )}
                </FormItem>
                <FormItem className="collection-create-form_last-form-item" label="资讯来源">
                    {getFieldDecorator('kkkk',{
                        initialValue:this.state.inputValue.YC+''
                        
                    })(
                        <Radio.Group onChange={this.onChange1.bind(this)}>
                            <Radio value='1'>原创</Radio>
                            <Radio value='2'>转载</Radio>
                            {/* <Radio value='2'>上传PDF文件</Radio> */}
                        </Radio.Group>
                    )}
                </FormItem>
                {this.state.origin==2?
                <div>
                    <FormItem label="资讯链接" >
                        {getFieldDecorator('link', {
                            rules: [{ required: true, message: '请输入网站域名' },{validator:this.checkUrl}],
                            initialValue:this.state.inputValue.wZurl
                        })(
                            <Input autoComplete="off" placeholder="http://xxxx or https://xxx"/>
                        )}
                    </FormItem>
                    <FormItem label="资讯内容">
                        {getFieldDecorator('title', {
                            rules: [{ message: '请输入资讯内容'}],
                        })(
                            <Wangeditor></Wangeditor>
                        )}
                    </FormItem>
                </div>:''}
                {this.state.origin==1?
                <div>
                    <FormItem label="资讯内容">
                        {getFieldDecorator('title', {
                            rules: [{ message: '请输入资讯内容'}],
                        })(
                            <Wangeditor></Wangeditor>
                        )}
                    </FormItem>
                </div>:''}
            </div>
            <div style={{textAlign:'center'}}>
                <Button type="primary" htmlType="submit" className="form-button-submit">提交</Button>
                {/* <Button type="primary" className="form-button-esc all-esc" onClick={goBack}>返回</Button> */}
            </div>
            
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      baseurl: state.baseurl
    }
}
Addconsult_new = connect(mapStateToProps)(Addconsult_new)
const Adminedit = Form.create()(Addconsult_new);
export default Adminedit