import React from 'react';
import { NavLink,Link,BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import Breadcrumb from '@js/userindex/components/breadcrumb'
import MyLi from '@js/userindex/components/li'
import { connect } from 'react-redux'
import axios from 'axios'
// 用来转换axios参数格式与ajax格式一致
import qs from 'qs'
import '@css/list.scss'
import Rightmeg from '@js/userindex/components/rightmeg'
class WebList extends React.Component {
    constructor(){
        super()
        this.state={
            div:[]
        }
    }
    componentDidMount(){
        this.Loadlist()
    }
    Loadlist=()=>{
        axios.post(this.props.baseurl+'Blog/showWenZhangList.form',qs.stringify({
            biaoQian:'前端'
        }))
        .then((json)=>{
            var op=[]
            for(var i=0;i<json.data.length;i++){
                op.push(<MyLi value={json.data[i]} key={i}/>)
            }
            this.setState({
                div:op
            })
        })
    }
    render(){
        return(
            <div className="content">
                <Breadcrumb page='Web前端'/>
                <div className="list">
                    <div className="list_left">
                        {this.state.div}
                    </div>
                    <Rightmeg/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      baseurl: state.baseurl
    }
}
WebList = connect(mapStateToProps)(WebList)
export default WebList