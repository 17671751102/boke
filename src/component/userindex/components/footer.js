import React from 'react';
import { Link} from 'react-router-dom';
import '@css/footer.scss';
import Modalsubmit from './Modalsubmit';
import Modallink from '@js/userindex/components/modallink';
import QQ from '@css/img/QQ.jpg';
import weibo from '@css/img/weibo.jpg';
import wechat from '@css/img/wechat.jpg';
import { Col, Row} from 'antd';

class Footer extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        const linkLayout={
            xs:{span:18},
            sm:{span:0},
        }
        return(
            <div className='footer'>
                <Row className='footer-inner'>
                    <Col className='footer-left' xs={0} sm={14}>
                        <Link to ={`/`}>首页</Link>
                        <Link to ={`/java`}>Java</Link>
                        <Link to ={`/web`}>web前端</Link>
                        <Link to ={`/bilibili`}>动漫</Link>
                        <Link to ={`/live`}>生活</Link>                     
                    </Col>
                    <Col className='footer-right'{...linkLayout}>
                        <Modallink text='微博' url={weibo} />                     
                        <Modallink text='微信' url={wechat}/>  
                        <Modallink text='QQ' url={QQ}/>                         
                    </Col>
                    <Col style={{textAlign:'right'}} className='footer-right' xs={6} sm={{span:10}}>
                        <Modalsubmit />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Footer;