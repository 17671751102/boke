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
            axios.post(this.props.baseurl+'Blog/deleteWenZhangById.form',qs.stringify({
                wZId: this.props.id           
            }))
            .then((json)=>{
                console.log(json)
            },(json)=>{
                message.error('链接失败')
            })
        },
        onCancel:()=>{
        console.log('Cancel');
        },
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
      baseurl: state.baseurl
    }
}
Delete = connect(mapStateToProps)(Delete)
export default Delete;
