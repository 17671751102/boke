import React from 'react';
import Breadcrumb from '@js/userindex/components/breadcrumb'
import Aboutme from '@js/userindex/components/aboutme'
import { connect } from 'react-redux'
import axios from 'axios'
// 用来转换axios参数格式与ajax格式一致
import qs from 'qs'
import '@css/detail.scss'
import { Row, Col, Icon} from 'antd';
import Biaoqian from '@js/userindex/components/biaoqian'
import CommentList from '@js/userindex/components/comment/commentlist'
const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
    );
class Detail extends React.Component {
    constructor(){
        super()
        this.state={
            op:[],
            message:'',
            status:false,
            ip:''
        }
    }
    componentDidMount(){
        this.loadIp()
    }
    loadIp=()=>{
        axios.get('http://pv.sohu.com/cityjson?ie=utf-8').then(
            (json)=>{
                if(json){
                    var data=json.data.split('"')
                    this.setState({ip:data[3]},()=>{
                        this.Loadlist()
                    })
                }
            }
        )
    }
    likeClick =(e)=>{
        axios.post(this.props.baseurl+this.state.status?'Blog/dianZanWenZhang.form':
        'Blog/quXiaodianZanWenZhang.form',qs.stringify({
          wZId: e,
          ip:this.state.ip   
        }))
        .then((json)=>{
            this.setState({status:!this.state.status})
            console.log(json)
        })
      }
    Loadlist=()=>{
        axios.post(this.props.baseurl+'Blog/selectWenZhangById.form',qs.stringify({
            wZId:window.location.pathname.split('/').pop(),
            ip:this.state.ip
        }))
        .then((json)=>{
            var op=[]
            if(json){
                op.push(
                    <div key='1' className="detail_content">
                        <h2>{json.data[0].wZTitle}</h2>
                        <Row>
                            <Col span={24}>
                                <Biaoqian value={json.data[0].biaoQian}/>
                                {/* <span><Icon type="menu-fold" style={{paddingRight:'5px'}} />标签：{json.data[0].biaoQian}</span> */}
                            </Col>
                            <Col md={{span:7}} sm={{span:12}}>
                                <span><Icon style={{paddingRight:'5px'}} type="clock-circle" />{new Date().getFullYear(json.data[0].fBTime.time)+'-'+(json.data[0].fBTime.month+1)+'-'+json.data[0].fBTime.date}</span>
                            </Col>               
                            <Col md={{span:7}} sm={{span:12}}>
                                <span><IconText type="user" />作者：{json.data[0].users.usName}</span>
                            </Col>
                            <Col md={{span:10}} sm={{span:12}}>
                                {json.data[0].wZurl?<span>转载：{json.data[0].wZurl}</span>:''}
                            </Col>
                        </Row>
                        <div id='detail_message' className='w-e-text' style={{marginBottom:15}}></div>
                        <Icon type="like-o"onClick={this.likeClick.bind(this,json.data[0].wZId)} /><span>{json.data[0].zan}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Icon type="message"/><span>{json.data[0].zan}</span>
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
                        
                        <CommentList />
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