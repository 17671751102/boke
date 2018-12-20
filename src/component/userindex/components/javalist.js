import React from 'react';
import { Pagination } from 'antd';
import Breadcrumb from '@js/userindex/components/breadcrumb'
import MyLi from '@js/userindex/components/li'
import Rightmeg from '@js/userindex/components/rightmeg'
import { connect } from 'react-redux'
import axios from 'axios'
// 用来转换axios参数格式与ajax格式一致
import qs from 'qs'
import '@css/list.scss'
class JavaList extends React.Component {
    constructor(){
        super()
        this.state={
            div:[],
            page:1,
            pageSize:10,
            total:100
        }
    }
    componentDidMount(){
        this.Loadlist()
    }
    Loadlist=()=>{
        axios.post(this.props.baseurl+'Blog/showWenZhangList.form',qs.stringify({
            biaoQian:'java',
            dqy:this.state.page,
            pageSize:this.state.pageSize
        }))
        .then((json)=>{
            var op=[]
            if(json.data.wzlst.length>0){
                for(var i=0;i<json.data.wzlst.length;i++){
                    op.push(<MyLi value={json.data.wzlst[i]} key={i} message='java'/>)
                }
                op.push(
                    <Pagination current={this.state.page} 
                        onChange={this.onChange} 
                        total={json.data.num} 
                        pageSizeOptions={['10','15','20']} 
                        onShowSizeChange={this.onPageSize} 
                        showSizeChanger
                        showQuickJumper
                        hideOnSinglePage={true}
                        key='1'/>)
            }else{
                op.push(
                <div className="myli" key='1'>
                    <h1>暂无数据</h1>
                </div>)
            }
            this.setState({
                div:op,
                total:json.data.num
            })
        })
    }
    onChange = (page, pageSize) => {
        this.setState({
          page: page,
          pageSize:pageSize
        },()=>{this.Loadlist()});
    }
    onPageSize=(current, size)=>{
        this.setState({
            page:current,
            pageSize:size
        },()=>{this.Loadlist()})
    }
    render(){
        return(
            <div className="content">
                <Breadcrumb page='Java'/>
                <div className="list">
                    <div className="list_left">
                        {this.state.div}
                    </div>
                    <Rightmeg/>
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
      baseurl: state.baseurl
    }
}
JavaList = connect(mapStateToProps)(JavaList)
export default JavaList