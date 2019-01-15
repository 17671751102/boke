import React from 'react';
import '@css/animation.scss'
import $ from 'jquery'; 
import { Link} from 'react-router-dom';

class MyAnimation extends React.Component{
    handleClick=()=>{
        $('.icon-mid').toggle();
        $('.icon-top').toggleClass('to-top re-top')
        $('.icon-btn').toggleClass('to-btn re-btn')
        $('.animation-box').slideToggle()
    }
    render() {
        return(
            <div className='animation-div'>
                 <div className='animation-icon' onClick={this.handleClick}>
                    <div className='icon-top re-top'></div>
                    <div className='icon-mid'></div>
                    <div className='icon-btn re-btn'></div>
                </div>
                <div className='animation-box'>
                    <p><Link onClick={this.handleClick} to ={`/`}>首页</Link></p>
                    <p><Link onClick={this.handleClick} to ={`/java`}>Java</Link></p>
                    <p><Link onClick={this.handleClick} to ={`/web`}>web前端</Link></p>
                    <p><Link onClick={this.handleClick} to ={`/bilibili`}>动漫</Link></p>
                    <p><Link onClick={this.handleClick} to ={`/live`}>生活</Link></p>
                </div>
            </div>
           
        )
    }
}
export default MyAnimation;