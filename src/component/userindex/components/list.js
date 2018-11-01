import React from 'react';
import { NavLink,Link} from 'react-router-dom';
import Breadcrumb from '@js/userindex/components/breadcrumb'
import '@css/list.scss'
class List extends React.Component {
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className="content">
                <Breadcrumb/>
                <div className="list">
                    <div className="list_left">

                    </div>
                    <div className="list_right">

                    </div>
                </div>
            </div>
        )
    }

}
export default List