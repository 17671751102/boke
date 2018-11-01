import React from 'react';
import { NavLink} from 'react-router-dom';
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
                <List/>
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