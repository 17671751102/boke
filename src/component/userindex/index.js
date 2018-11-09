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
// import Water from '../../water/water'
class Index extends React.Component {
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                {/* <Water/> */}
                <Menu/>
                <Switch>
                    <Route exact path='/' component={List} />
                    <Route exact path='/java' component={JavaList} />
                    <Route exact path='/web' component={WebList} />
                    <Route exact path='/bilibili' component={BilibiliList} />
                    <Route exact path='/live' component={LiveList} />
                </Switch>
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