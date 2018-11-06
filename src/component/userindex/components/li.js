import React from 'react';
import { NavLink,Link} from 'react-router-dom';
import '@css/li.scss'
class MyLi extends React.Component {
    render(){
        return(
            <div className="myli">
                <span className="time">2018-11-11</span>
                <div className="img">

                </div>
                <div className="content">
                    <h3>标题</h3>
                    <p>
                        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
                    </p>
                </div>
            </div>
        )
    }

}
export default MyLi