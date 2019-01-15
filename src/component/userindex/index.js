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
// import Water from '../../water/water'
class Index extends React.Component {
    constructor(){
        super()
        this.state={

        }
    }
    componentDidMount(){
        // var body=document.getElementsByTagName('body')[0]
        window.onscroll=(e)=>{
            var list=document.getElementsByClassName('list')[0]
            var aboutme =document.getElementsByClassName('aboutme')[0]
            if(list.offsetTop- document.documentElement.scrollTop<=100){
                aboutme.setAttribute('class','aboutme aboutme_fixed')
            }else{
                aboutme.className='aboutme'
            }
        }
    }
    render(){
        return(
            <div>
                {/* <Water/> */}
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
      eventleakurl:state.eventleakurl
    }
}
Index = connect(mapStateToProps)(Index)
export default Index