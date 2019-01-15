import React from 'react';
import { Row, Col } from 'antd';
import Carouseldiv from '@js/userindex/components/carousel';
import Bannerlist from '@js/userindex/components/bannerlist';
import Aboutme from '@js/userindex/components/aboutme';
import { connect } from 'react-redux'
// 用来转换axios参数格式与ajax格式一致
import qs from 'qs'
import '@css/list.scss'
class List extends React.Component {
    componentWillReceiveProps(nextProps){
        if(nextProps.value!=this.props.value){
            console.log(this.props)
            console.log(nextProps)
        }
    }
    render(){
        return(
            <div className="content">
                <Carouseldiv />
                {/* <Breadcrumb page='首页'/> */}
                <Row className="list antd-list">
                    <Col lg={16} md={24} xs={24} className="list_left">
                        <div className='left-title'>
                           <p>最新发布</p>
                           <div className='left-article'>
                               <Bannerlist/>
                            </div>                           
                        </div>                       
                    </Col>
                    <Col lg={{span:7,offset:1}} md={0} xs={0}>
                        <Aboutme />
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
List = connect(mapStateToProps)(List)
export default List