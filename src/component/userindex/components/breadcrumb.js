import React from 'react';
import { NavLink,Link} from 'react-router-dom';
import '@css/breadcrumb.scss'
class Breadcrumb extends React.Component {
    render(){
        return(
            <div className="breadcrumb">
                当前位置：<span>{this.props.page}</span>
            </div>
        )
    }

}
export default Breadcrumb