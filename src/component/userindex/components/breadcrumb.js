import React from 'react';
import { NavLink,Link} from 'react-router-dom';
import '@css/breadcrumb.scss'
class Breadcrumb extends React.Component {
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className="breadcrumb">
                当前位置：<span>首页</span>
            </div>
        )
    }

}
export default Breadcrumb