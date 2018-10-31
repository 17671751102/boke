import React from 'react';
import { Modal, Button,message , Form, Input,Upload,Icon,Select,Radio,Tag, Tooltip } from 'antd';
import { NavLink} from 'react-router-dom';
import $ from 'jquery';
import { connect } from 'react-redux'
// import RadioButton from 'antd/lib/radio/radioButton';
// 富文本编辑器/资讯内容
import Wangeditor from '@js/wangedit/wangedit';
import '@css/admin_edit.scss'
const FormItem = Form.Item;
const Option = Select.Option;
class Addconsult_new extends React.Component {
    constructor(){
        super()
        this.state={
            //定义上传文件
            //fileList:[],  
            //文件上传或删除完成
            textstatus:'done',
            // 标签
            tags: [],
            inputVisible: false,
            inputValue: '',
            // // 真实名字
            // AttackmentName:'',
            // // 返回名字
            // Annex:'',
            //咨询来源
            origin:'3',
        }
    }
    // // 文件上传
    // beforeUpload(e,file, fileList){
    //     // // 限制文件大小
    //     if(e==0){
    //         if (fileList[0].size>10485760 || fileList[0].size<=0) {
    //             message.error('文件应在0-10M范围内')
    //             return false
    //         }
    //         var endpoint = fileList[0].name.lastIndexOf(".");
    //         var houzui = fileList[0].name.substring(endpoint, fileList[0].name.length).toLowerCase();
    //         if(houzui!='.pdf'){
    //             message.error('请按指定格式上传')
    //             return false
    //         }
    //     }
    // }
    // //上传
    // handleChange = (info) => {
    //     let fileList = info.fileList;
    //     // 只能上传一个文件
    //     fileList = fileList.slice(-1);
    //     // 限制文件大小
    //     fileList = fileList.filter((file) => {
    //         if (file.size>10485760 || file.size<=0) {
    //             return false
    //           }
    //       var endpoint = file.name.lastIndexOf(".");
	// 	    var houzui = file.name.substring(endpoint, file.name.length).toLowerCase();
    //       if(houzui!='.jpg'&&houzui!='.gif'&&houzui!='.png'&&houzui!='.jpeg'&&houzui!='.doc'&&houzui!='.docx'&&houzui!='.zip'&&houzui!='.pdf'){
    //         return false
    //       }
    //       this.setState({textstatus:fileList.length>0?fileList[0].status:'done'})
    //       return true;
    //     });
    //     this.setState({ 
    //         fileList
    //     })
    //     if(fileList.length>0){
    //         if(fileList[0].response){
    //             this.setState({Annex:fileList[0].response.message,AttackmentName:fileList[0].response.real_name})
    //         }
    //     }else{
    //         this.setState({Annex:''})
    //     }
    // }
    //    // 移除文件
    //    onRemove (e){
    //     if(e==0){
    //         this.setState({
    //             textstatus:'done'
    //         });
    //     } 
    // }

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
                var content=$('.w-e-text').html()
                if(this.state.textstatus=='done'){
                    $.ajax({
                        type:'post',
                        dataType:'json',
                        data:{title:values.titles, desc:values.Desc,
                        type:values.type,belong:values.belong,tag:this.state.tags.join(','),texttype:values.kkkk,link:values.link,
                        content:content,pdf:this.state.Annex,pdfname:this.state.AttackmentName,number:this.props.match.params.number},
                        url:'',
                        success:function(json){
                            if(json){
                                if(json.status==1){
                                    message.success(json.message)
                                    setTimeout(() => {
                                        window.location.href='/main/bulletin'
                                    }, 2000);
                                }else{
                                    message.error(json.message)
                                }
                            }
                        }.bind(this),
                        err:function(){
    
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
                        rules: [{ required: true, message: '请输入标题' },{ max: 50, message: '标题只能少于50字' }]
                    })(
                        <Input autoComplete="off" placeholder="请输入资讯标题 0/50字"/>
                    )}
                </FormItem>
                <FormItem label="资讯简介" className='k_textRight'>
                	{getFieldDecorator('Desc', {
                        rules: [{ message: '请输入资讯简介'},{max:200,message:'最多只能输入200字'}]
                    })(
                        <textarea placeholder="   请输入资讯简介 0/200字"/>
                    )}
                </FormItem>
                <FormItem label="资讯标签" className='k_textRight'>
                   {getFieldDecorator('lable', {
                        rules: [{ message: ''}],
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
                <FormItem className="collection-create-form_last-form-item" label="资讯来源" className='k_textRight'>
                    {getFieldDecorator('kkkk')(
                        <Radio.Group onChange={this.onChange1.bind(this)}>
                            <Radio value='3' checked='true'>原创</Radio>
                            <Radio value='4'>转载</Radio>
                            {/* <Radio value='2'>上传PDF文件</Radio> */}
                        </Radio.Group>
                    )}
                </FormItem>
                {this.state.origin==4?
                <div>
                    <FormItem label="资讯链接" >
                        {getFieldDecorator('link', {
                            rules: [{ required: true, message: '请输入网站域名' },{validator:this.checkUrl}]
                        })(
                            <Input autoComplete="off" placeholder="http://xxxx or https://xxx"/>
                        )}
                    </FormItem>
                    <FormItem label="资讯内容" className='k_textRight'>
                        {getFieldDecorator('title', {
                            rules: [{ message: '请输入资讯内容'}],
                        })(
                            <Wangeditor></Wangeditor>
                        )}
                    </FormItem>
                </div>:''}
                {this.state.origin==2?
                <div>
                    <FormItem extra="支持pdf格式，大小在10M以内的文件" label="PDF文件上传">
                        {getFieldDecorator('Annex')(
                            <Upload name="logo" action={this.props.baseurl+"index.php/Index/index/upload_file"} 
                            beforeUpload={this.beforeUpload.bind(this,'0')} onChange={this.handleChange} 
                            onRemove={this.onRemove.bind(this,'0')}
                            fileList={this.state.fileList} accept='.pdf'>
                                <Button>
                                    <Icon type="upload" /> 选择文件
                                </Button>
                            </Upload>
                        )}
                    </FormItem>
                </div>:''}
                {this.state.origin==3?
                <div>
                    <FormItem label="资讯内容" className='k_textRight'>
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
      baseurl: state.baseurl,
      eventleakurl:state.eventleakurl
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (a) => {
            dispatch({ type: 'CHANGE_COLOR', listreload: a })
        }
    }
}
Addconsult_new = connect(mapStateToProps,mapDispatchToProps)(Addconsult_new)
const Adminedit = Form.create()(Addconsult_new);
export default Adminedit