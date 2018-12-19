import React from 'react';
import Breadcrumb from '@js/userindex/components/breadcrumb'
import Rightmeg from '@js/userindex/components/rightmeg'
import { connect } from 'react-redux'
import axios from 'axios'
// 用来转换axios参数格式与ajax格式一致
import qs from 'qs'
import '@css/list.scss'
class Detail extends React.Component {
    constructor(){
        super()
        this.state={
            
        }
    }
    componentDidMount(){
        this.Loadlist()
    }
    Loadlist=()=>{
        axios.post(this.props.baseurl+'Blog/showWenZhangList.form',qs.stringify({
            biaoQian:'java',
            dqy:this.state.page,
            pageSize:this.state.pageSize
        }))
        .then((json)=>{
            
        })
    }
    onChange = (page, pageSize) => {
        this.setState({
          page: page,
          pageSize:pageSize
        },()=>{this.Loadlist()});
    }
    onPageSize=(current, size)=>{
        this.setState({
            page:current,
            pageSize:size
        },()=>{this.Loadlist()})
    }
    render(){
        return(
            <div className="content">
                <Breadcrumb page={this.props.message}/>
                <div className="list">
                    <div className="list_left">
                        
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
Detail = connect(mapStateToProps)(Detail)
export default Detail