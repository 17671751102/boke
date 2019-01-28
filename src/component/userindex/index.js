import React from 'react';
import { BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import $ from 'jquery';
import { connect } from 'react-redux'
import List from '@js/userindex/components/list'
import JavaList from '@js/userindex/components/javalist'
import WebList from '@js/userindex/components/weblist'
import BilibiliList from '@js/userindex/components/bilibililist'
import LiveList from '@js/userindex/components/livelist'
import Menu from '@js/userindex/components/menu'
import Detail from '@js/userindex/components/detail/detail'
import Notfound from '../../404'
import Footer from '@js/userindex/components/footer'
class Index extends React.Component {
    constructor(){
        super()
        this.state={

        }
    }
    componentDidMount(){
        window.onscroll=(e)=>{
            var a =document.body.scrollHeight-document.body.clientHeight-document.documentElement.scrollTop
            if(a==0){
                if(this.props.onSwitchColor){
                    this.props.onSwitchColor(true)
                }
            }else{
                if(this.props.onSwitchColor){
                    this.props.onSwitchColor(false)
                }
            }
            var list=document.getElementsByClassName('list')[0]
            var aboutme =document.getElementsByClassName('aboutme')[0]
            if(aboutme){
                if(list.offsetTop- document.documentElement.scrollTop<=100){
                    aboutme.setAttribute('class','aboutme aboutme_fixed')
                }else{
                    aboutme.className='aboutme'
                }
            }
            
        }
    }
    render(){
        return(
            <div style={{paddingTop:50}}>
                <Menu history={this.props.history}/>
                <Switch>
                    <Route exact path='/' component={List}/>
                    <Route exact path='/java' component={JavaList} />
                    <Route exact path='/web' component={WebList} />
                    <Route exact path='/bilibili' component={BilibiliList} />
                    <Route exact path='/live' component={LiveList} />
                    <Route exact path='/index/:id' render={()=><Detail message='首页'/>}/>
                    <Route exact path='/java/:id' render={()=><Detail message='Java'/>} />
                    <Route exact path='/web/:id' render={()=><Detail message='Web前端'/>} />
                    <Route exact path='/bilibili/:id' render={()=><Detail message='动漫'/>} />
                    <Route exact path='/live/:id' render={()=><Detail message='生活'/>} />
                    <Route component={Notfound}/>
                </Switch>
                <Footer />
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
      baseurl: state.baseurl,
      eventleakurl:state.eventleakurl,
      LoadMore:state.LoadMore
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (a) => {
            dispatch({ type: 'CHANGE_LIST', LoadMore: a })
        }
    }
}
Index = connect(mapStateToProps,mapDispatchToProps)(Index)
export default Index