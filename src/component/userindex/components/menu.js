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
                        <li>首页</li>
                        <li>Java</li>
                        <li>web前端</li>
                        <li>动漫</li>
                        <li>生活</li>
                    </ul>
                </div>
            </div>
        )
    }

}
export default Menu