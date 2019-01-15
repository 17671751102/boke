import React from 'react';
import { Icon } from 'antd';
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
                <ul className='linkmore'>
                    <li>
                        <Link to={'/'} title='公告'>
                            <Icon type="home" />
                        </Link>                        
                    </li>
                    <li>
                        <Modallink type="wechat" url={wechat}/>                      
                    </li>
                    <li> 
                        <Modallink type="qq" url={QQ}/>                      
                    </li>
                    <li>
                        <Modallink type="weibo" url={weibo}/>      
                    </li>
                </ul>
            </div>
        )
    }
}
export default Aboutme;