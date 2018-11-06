import React from 'react';
import { BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import $ from 'jquery';
import { connect } from 'react-redux'
import List from '@js/userindex/components/list'
import Menu from '@js/userindex/components/menu'
class Index extends React.Component {
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <Menu/>
                <Switch>
                    <Route exact path='/:type' component={List} />
                    <Route exact path='/' component={List} />
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