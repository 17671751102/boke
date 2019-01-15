import React from 'react';
import { NavLink,Link} from 'react-router-dom';
import '@css/breadcrumb.scss'
class Breadcrumb extends React.Component {
    constructor(props){
        super(props)
        this.state={
            val:''
        }
    }
    // handleText=(e)=>{
    //     console.log(e.target.value)
    //     this.setState({val:e.target.value})
    // }
    // componentWillReceiveProps=(nextProps)=>{
    //     if(this.props.page!=nextProps.page){

    //     }
    // }
    // shouldComponentUpdate=(nextPorts,nextState)=>{
    //     if(this.props){}
    // }

    render(){
        return(
            <div className="breadcrumb">
                {/* <input  type="text" value={this.state.val} onChange={this.handleText}/>
                <span>当前输入：{this.state.val}</span><br/> */}
                当前位置：<span>{this.props.page}</span>
            </div>
        )
    }

}
export default Breadcrumb