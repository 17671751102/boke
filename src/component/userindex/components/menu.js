import React from 'react';
import { NavLink,Link} from 'react-router-dom';
import { connect } from 'react-redux'
import '@css/menu.scss'
class Menu extends React.Component {
    constructor(){
        super()
        this.state={

        }
    }
    handleLink=()=>{
        if(this.props.onSwitchColor){
            var a=this.props.listreload+1
            this.props.onSwitchColor(a)
        }
    }
    render(){
        return(
            <div className="nav">
                <div className="nav_mid">
                    <span>博客LOG</span>
                    <ul>
                        <li><NavLink exact to='/' onClick={this.handleLink}>首页</NavLink></li>
                        <li><NavLink to='/java' onClick={this.handleLink}>Java</NavLink></li>
                        <li><NavLink to='/web' onClick={this.handleLink}>web前端</NavLink></li>
                        <li><NavLink to='/bilibili' onClick={this.handleLink}>动漫</NavLink></li>
                        <li><NavLink to='/live' onClick={this.handleLink}>生活</NavLink></li>
                    </ul>
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
      listreload:state.listreload,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (a) => {
            dispatch({ type: 'CHANGE_COLOR', listreload: a })
        }
    }
}
Menu = connect(mapStateToProps,mapDispatchToProps)(Menu)
export default Menu
