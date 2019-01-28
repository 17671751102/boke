import React from 'react';
import { Modal,message} from 'antd';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';

const confirm = Modal.confirm;
class Delete extends React.Component{
    showDeleteConfirm=()=> {     
        confirm(this.a);
    }
    a={
        title: '是否确定删除此文章?',
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk:()=>{
            axios.post(this.props.baseurl+'Blog/deleteWenZhang.form',qs.stringify({
                wZId: this.props.id           
            }))
            .then((json)=>{
                if(json){
                    if(json.data[0].status==1){
                        message.success(json.data[0].message)
                        this.reloadlist()
                    }else{
                        message.error(json.data[0].message)
                    }
                }
            },(json)=>{
                message.error('链接失败')
            })
        },
        onCancel:()=>{

        },
    }
    reloadlist=()=>{
        if(this.props.onSwitchColor){
            let a=this.props.listreload
            a++
            this.props.onSwitchColor(a)
            console.log(this.props.listreload)
        }
    }
    render(){
        return(
           <div style={{display:'inline-block'}}>
                <a className='del' onClick={this.showDeleteConfirm} type="dashed">
                删除
                </a>
            </div> 
        )
    }    
}
const mapStateToProps = (state) => {
    return {
      baseurl: state.baseurl,
      listreload: state.listreload
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (a) => {
            dispatch({ type: 'CHANGE_COLOR', listreload: a })
        }
    }
}
Delete = connect(mapStateToProps,mapDispatchToProps)(Delete)
export default Delete;
