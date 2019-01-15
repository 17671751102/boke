import React from 'react';
import { Row, Col, Icon, BackTop} from 'antd';
import { NavLink,Link} from 'react-router-dom';
import { connect } from 'react-redux';
import MyAnimation from '@js/userindex/components/animation';
import '@css/menu.scss';
import qs from 'querystring'
import axios from 'axios';
// 用来转换axios参数格式与ajax格式一致
class Menu extends React.Component {
    handleLink=()=>{
        if(this.props.onSwitchColor){
            console.log(456)
            var a=this.props.listreload+1
            this.props.onSwitchColor(a)
        }
    }
    handleEnter=(e)=>{
        if(e.keyCode==13){
            if(e.target.value=='admin_login'){
                this.props.history.push('/admin_login')
            }else{
                var title=e.target.value
                axios.post(this.props.baseurl+'Blog/selectWenZhangMoHu.form',qs.stringify({
                    wZTitle:title,
                    dqy:1,
                    pageSize:3,
                }))
                .then((json)=>{
                    if(this.props.onChangeList){
                        var b=json.data.wzlst
                        this.props.onChangeList(b)
                    }
                    if(this.props.onChangeTitle){
                        var c=title
                        this.props.onChangeTitle(c)
                    }
                })
            }
        }
    }
    render(){
        return(
            <div className="nav">
                <Row className="nav_mid">
                    <Col xxl={{span:2,offset:2}} lg={{span:4,offset:2}} md={{span:8}} xs={12}><span>博客LOG</span></Col>
                    <Col className='title-nav' xxl={14} lg={11} md={0} xs={0}>
                        <Row className='title-row'>
                            <Col span={4}><NavLink exact to='/' onClick={this.handleLink}>首页</NavLink></Col>
                            <Col span={4}><NavLink to='/java' onClick={this.handleLink}>Java</NavLink></Col>
                            <Col span={4}><NavLink to='/web' onClick={this.handleLink}>web前端</NavLink></Col>
                            <Col span={4}><NavLink to='/bilibili' onClick={this.handleLink}>动漫</NavLink></Col>
                            <Col span={4}><NavLink to='/live' onClick={this.handleLink}>生活</NavLink></Col>
                        </Row>
                    </Col>                        
                    <Col className='search' xxl={{span:4,offset:0}} lg={{span:4,offset:0}} md={{span:8,offset:6}} xs={0}>
                        <div className='search-div'>
                            <input type='text' placeholder='请输入内容' onKeyDown={this.handleEnter}/>
                            <Icon type="search" />                       
                        </div>
                    </Col> 
                    <Col  xxl={0} lg={0} md={2} xs={12}><MyAnimation /> </Col>
                </Row>
                <BackTop className='back-top' visibilityHeight={400}/>                  
            </div>          
        )
    }

}
const mapStateToProps = (state) => {
    return {
      listreload:state.listreload,
      baseurl:state.baseurl
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (a) => {
            dispatch({ type: 'CHANGE_COLOR', listreload: a })
        },
        onChangeList:(b)=>{
            dispatch({type: 'CHANGE_HOMELIST', search:b})
        },
        onChangeTitle:(c)=>{
            dispatch({type: 'CHANGE_TITLE', wztitle:c})
        }
    }
}
Menu = connect(mapStateToProps,mapDispatchToProps)(Menu)
export default Menu
