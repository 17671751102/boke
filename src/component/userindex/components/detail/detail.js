import React from 'react';
import Breadcrumb from '@js/userindex/components/breadcrumb'
import Aboutme from '@js/userindex/components/aboutme'
import { connect } from 'react-redux'
import axios from 'axios'
// 用来转换axios参数格式与ajax格式一致
import qs from 'qs'
import '@css/detail.scss'
import { Row, Col } from 'antd';
class Detail extends React.Component {
    constructor(){
        super()
        this.state={
            op:[],
            message:''
        }
    }
    componentDidMount(){
        this.Loadlist()
        console.log(this)
    }
    Loadlist=()=>{
        axios.post(this.props.baseurl+'Blog/selectWenZhangById.form',qs.stringify({
            wZId:window.location.pathname.split('/').pop(),
        }))
        .then((json)=>{
            var op=[]
            if(json){
                op.push(
                    <div key='1' className="detail_content">
                        <h2>{json.data[0].wZTitle}</h2>
                        <span>{new Date().getFullYear(json.data[0].fBTime.time)+'-'+(json.data[0].fBTime.month+1)+'-'+json.data[0].fBTime.date}</span><br/>
                        <span>标签：{json.data[0].biaoQian}</span><br/>
                        <span>作者：{json.data[0].userss.name}</span><br/>
                        {json.data[0].wZurl?<span>转载：{json.data[0].wZurl}</span>:''}
                        <div id='detail_message'></div>
                    </div>
                )
                this.setState({
                    op:op,
                    message:json.data[0].wZText
                },()=>{
                    var message=document.getElementById('detail_message')
                    message.innerHTML=this.state.message
                })
            }
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
                <Breadcrumb page={this.props.message}/>
                <Row className="list antd-list">
                    <Col lg={16} md={24} xs={24} className="list_left">
                        {this.state.op}
                    </Col>
                    <Col lg={{span:7,offset:1}} md={0} xs={0}>
                        <Aboutme/>
                    </Col>   
                </Row>
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
      baseurl: state.baseurl
    }
}
Detail = connect(mapStateToProps)(Detail)
export default Detail