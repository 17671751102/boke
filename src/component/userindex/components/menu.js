import React from 'react';
import { NavLink,Link} from 'react-router-dom';
import '@css/menu.scss'
class Menu extends React.Component {
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className="nav">
                <div className="nav_mid">
                    <span>博客LOG</span>
                    <ul>
                        <li><NavLink exact to={`/`}>首页</NavLink></li>
                        <li><NavLink to={`/${2}`}>Java</NavLink></li>
                        <li><NavLink to={`/${3}`}>web前端</NavLink></li>
                        <li><NavLink to={`/${4}`}>动漫</NavLink></li>
                        <li><NavLink to={`/${5}`}>生活</NavLink></li>
                    </ul>
                </div>
            </div>
        )
    }

}
export default Menu
