import React from 'react';
import { Pagination,Row,Col } from 'antd';
import Breadcrumb from '@js/userindex/components/breadcrumb'
import MyLi from '@js/userindex/components/li'
import { connect } from 'react-redux'
import axios from 'axios'
// 用来转换axios参数格式与ajax格式一致
import qs from 'qs'
import '@css/list.scss'
import Rightmeg from '@js/userindex/components/rightmeg'
import Javalistdetail from '@js/userindex/components/javalistdetail'
import Aboutme from '@js/userindex/components/aboutme';
class LiveList extends React.Component {
    constructor(){
        super()
        this.state={
            listData:[],
            page:1
        }
    }
    componentDidMount(){
        this.Loadlist()
    }
    Loadlist=()=>{
        axios.post(this.props.baseurl+'Blog/showWenZhangList.form',qs.stringify({
            biaoQian:'生活',
            dqy:this.state.page,
            pageSize:6,
        }))
        .then((json)=>{
            this.setState({listData:json.data.wzlst})
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
    handlepage=(e)=>{
        this.setState({page:e},()=>{
            this.Loadlist()
        })
    }
    componentWillReceiveProps(nextProps){
        if(this.props.listreload!=nextProps.listreload){
            this.Loadlist()
        }
    }
    render(){
        return(
            <Row className="content">
                <Breadcrumb page='生活' paths='/live'/>
                <Row className="list antd-list">
                    <Col lg={16} md={24} xs={24} className="list_left">
                        <Javalistdetail listData={this.state.listData} page={this.handlepage} type='live'>我是一个双标签</Javalistdetail>
                    </Col>
                    <Col lg={{span:7,offset:1}} md={0} xs={0}>
                        <Aboutme />
                    </Col>                   
                </Row>
            </Row>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      baseurl: state.baseurl,
      listreload: state.listreload
    }
}
LiveList = connect(mapStateToProps)(LiveList)
export default LiveList