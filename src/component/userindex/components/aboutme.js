import React from 'react';
import { Icon, Row, Col } from 'antd';
import '@css/aboutme.scss';
import Modallink from '@js/userindex/components/modallink'
import wechat from '@css/img/wechat.jpg'
import QQ from '@css/img/QQ.jpg'
import weibo from '@css/img/weibo.jpg'
import {Link} from 'react-router-dom'
import Edit from '@js/userindex/components/edit'
class Aboutme extends React.Component{
    render(){
        return(
            <div className='aboutme'>
                <div className='card'>
                    <h2>ABOUT ME {sessionStorage.getItem('logtoken')? <Edit />:''}</h2>
                    <p>Name：海底兄弟</p>
                    <p>Job：Web前端工程师</p>
                    <p>Wechat：haidixiongdi</p>
                    <p>Email：haidixiongdi@163.com</p>
                </div>
                <Row className='linkmore' type="flex" justify="space-around">
                    <Col span={4}>
                        <Link to={'/'} title='公告'>
                            <Icon type="home" />
                        </Link>                        
                    </Col>
                    <Col span={4}>
                        <Modallink type="wechat" url={wechat}/>                      
                    </Col>
                    <Col span={4}> 
                        <Modallink type="qq" url={QQ}/>                      
                    </Col>
                    <Col span={4}>
                        <Modallink type="weibo" url={weibo}/>      
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Aboutme;