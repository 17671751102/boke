import React from 'react';
import { Modal} from 'antd';

const confirm = Modal.confirm;
class Delete extends React.Component{
    showDeleteConfirm=()=> {      
    confirm({
        title: '是否确定删除此文章?',
        // content: 'Some descriptions',
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk() {
        console.log('OK');
        },
        onCancel() {
        console.log('Cancel');
        },
    });
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
export default Delete;
