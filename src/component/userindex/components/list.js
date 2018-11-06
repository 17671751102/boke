import React from 'react';
import { NavLink,Link,BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import Breadcrumb from '@js/userindex/components/breadcrumb'
import MyLi from '@js/userindex/components/li'
import '@css/list.scss'
class List extends React.Component {
    constructor(){
        super()
        this.state={

        }
    }

    render(){
        let page=""
        if(this.props.match.params.type==undefined){
            page="首页"
        }else if(this.props.match.params.type==2){
            page="Java"
        }else if(this.props.match.params.type==3){
            page="Web前端"
        }else if(this.props.match.params.type==4){
            page="动漫"
        }else if(this.props.match.params.type==5){
            page="生活"
        }
        return(
            <div className="content">
                <Breadcrumb page={page}/>
                <div className="list">
                    <div className="list_left">
                        <MyLi/>
                    </div>
                    <div className="list_right">

                    </div>
                </div>
            </div>
        )
    }

}
export default List