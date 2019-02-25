import React from 'react';
import Breadcrumb from '@js/userindex/components/breadcrumb'
import Aboutme from '@js/userindex/components/aboutme'
import { connect } from 'react-redux'
import axios from 'axios'
// 用来转换axios参数格式与ajax格式一致
import qs from 'qs'
import '@css/detail.scss'
import { Row, Col, Icon,message} from 'antd';
import Biaoqian from '@js/userindex/components/biaoqian'
import CommentList from '@js/userindex/components/comment/commentlist'
import Commenttext from '@js/userindex/components/comment/commenttext'
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
            ip:'',
            action: localStorage.getItem(window.location.pathname.split('/').pop())?
                    localStorage.getItem(window.location.pathname.split('/').pop()):false,
            data:[]
        }
    }
    componentDidMount(){
        this.Loadlist()
    }
    likeClick =(e)=>{
        let ip=document.getElementById('ywl_hide').innerHTML
        axios.post(this.props.baseurl+(this.state.action?'Blog/quXiaodianZanWenZhang.form':
        'Blog/dianZanWenZhang.form'),qs.stringify({
          wZId: e,
          ip:ip
        }))
        .then((json)=>{
            this.setState({
                action:!this.state.action
            },()=>{
                this.Loadlist()
                this.reloadlist()
                localStorage.setItem(e,this.state.action)
            })
        })
    }
    reloadlist=()=>{
        if(this.props.onSwitchColor){
            let a=this.props.listreload
            a++
            this.props.onSwitchColor(a)
        }
    }
    Loadlist=()=>{
        axios.post(this.props.baseurl+'Blog/selectWenZhangById.form',qs.stringify({
            wZId:window.location.pathname.split('/').pop(),
            ip:document.getElementById('ywl_hide').innerHTML
        }))
        .then((json)=>{
            var op=[]
            if(json){
                op.push(
                    <div key='1' className="detail_content">
                        <h2>{json.data.dqwz.wZTitle}</h2>
                        <Row>
                            <Col span={24}>
                                <Biaoqian value={json.data.dqwz.biaoQian}/>
                            </Col>
                            <Col md={{span:7}} sm={{span:12}}>
                                <span><Icon style={{paddingRight:'5px'}} type="clock-circle" />{new Date().getFullYear(json.data.dqwz.fBTime.time)+'-'+(json.data.dqwz.fBTime.month+1)+'-'+json.data.dqwz.fBTime.date}</span>
                            </Col>               
                            <Col md={{span:7}} sm={{span:12}}>
                                <span><IconText type="user" />作者：{json.data.dqwz.users.usName}</span>
                            </Col>
                            <Col md={{span:10}} sm={{span:12}}>
                                {json.data.dqwz.wZurl?<span>转载：{json.data.dqwz.wZurl}</span>:''}
                            </Col>
                        </Row>
                        <div id='detail_message' className='w-e-text' style={{marginBottom:15}}></div>
                        <Icon type="like" 
                        theme={this.state.action ? 'filled' : 'outlined'}
                        onClick={this.likeClick.bind(this,json.data.dqwz.wZId)} style={{cursor:'pointer'}} />
                        <span>{json.data.dqwz.zan}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Icon type="message" 
                        style={{cursor:'pointer'}}/>
                        <span>{json.data.dqlyl.length}</span>
                    </div>
                )
                this.setState({
                    op:op,
                    message:json.data.dqwz.wZText,
                    data:json.data.dqlyl
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
                <Breadcrumb page={this.props.message} paths={this.props.paths}/>
                <Row className="list antd-list">
                    <Col lg={16} md={24} xs={24} className="list_left">
                        {this.state.op}
                        <Commenttext/>
                        <CommentList value={this.state.data}>
                            <CommentList value={this.state.data}></CommentList>
                        </CommentList>
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
Detail = connect(mapStateToProps,mapDispatchToProps)(Detail)
export default Detail