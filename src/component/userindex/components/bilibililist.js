import React from 'react';
import { Pagination,Row, Col } from 'antd';
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
class BilibiliList extends React.Component {
    constructor(){
        super()
        this.state={
            listData:[]
        }
    }
    componentDidMount(){
        this.Loadlist()
    }
    Loadlist=()=>{
        axios.post(this.props.baseurl+'Blog/showWenZhangList.form',qs.stringify({
            biaoQian:'动漫',
            dqy:this.page.state.page,
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
    render(){
        return(
            <Row className="content">
                <Breadcrumb page='动漫'/>
                <Row className="list antd-list">
                    <Col lg={16} md={24} xs={24} className="list_left">
                        <Javalistdetail listData={this.state.listData} ref={page=>this.page=page}/>
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
      baseurl: state.baseurl
    }
}
BilibiliList = connect(mapStateToProps)(BilibiliList)
export default BilibiliList