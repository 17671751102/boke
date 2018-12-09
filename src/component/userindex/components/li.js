import React from 'react';
import { NavLink,Link} from 'react-router-dom';
import '@css/li.scss'
import src from '@css/img/01.png'
class MyLi extends React.Component {
    render(){
        var date=this.props.value.fBTime
        return(
            <div className="myli">
                <span className="time">{}</span>
                <div className="img">
                    <img src={src} alt=""/>
                </div>
                <div className="content">
                    <h3><Link to="">{this.props.value.wZTitle}</Link></h3>
                    <p>{this.props.value.WZJJ}</p>
                </div>
                <div className="both"></div>
            </div>
        )
    }
}
export default MyLi