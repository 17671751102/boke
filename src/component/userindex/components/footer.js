import React from 'react';
import { Link} from 'react-router-dom';
import '@css/footer.scss'
import Modalsubmit from './Modalsubmit';

class Footer extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className='footer'>
                <div className='footer-inner'>
                    <div className='footer-left'>
                        <Link to ={`/`}>首页</Link>
                        <Link to ={`/java`}>Java</Link>
                        <Link to ={`/web`}>web前端</Link>
                        <Link to ={`/bilibili`}>动漫</Link>
                        <Link to ={`/live`}>生活</Link>
                    </div>
                    <div className='footer-right'>
                        <Modalsubmit />
                    </div>
                    <div className='both'></div>
                </div>
            </div>
        )
    }
}
export default Footer;