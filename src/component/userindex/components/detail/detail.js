import React from 'react';
import Breadcrumb from '@js/userindex/components/breadcrumb'
import Rightmeg from '@js/userindex/components/rightmeg'
import { connect } from 'react-redux'
import axios from 'axios'
// 用来转换axios参数格式与ajax格式一致
import qs from 'qs'
import '@css/detail.scss'
class Detail extends React.Component {
    constructor(){
        super()
        this.state={
            op:[],
            message:''
        }
    }
    componentDidMount(){
        this.Loadlist()
    }
    Loadlist=()=>{
        axios.post(this.props.baseurl+'Blog/selectWenZhangById.form',qs.stringify({
            wZId:window.location.pathname.split('/').pop(),
            // ip:'127.0.0.1'
        }))
        .then((json)=>{
            var op=[]
            if(json){
                op.push(
                    <div key='1' className="detail_content">
                        <h2>{json.data[0].wZTitle}</h2>
                        <div id='detail_message'></div>
                    </div>
                )
                this.setState({
                    op:op,
                    message:json.data[0].wZText
                },()=>{
                    var message=document.getElementById('detail_message')
                    message.innerHTML=this.state.message
                })
            }
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
                        {this.state.op}
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