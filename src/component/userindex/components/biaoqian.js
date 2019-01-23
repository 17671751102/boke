import React from 'react';
import '@css/biaoqian.scss'
import {Icon} from 'antd'
export default class Biaoqian extends React.Component{
    constructor(){
        super()
        this.state={
            div:[]
        }
    }
    componentDidMount(){
        var a = this.props.value.split(',')
        var b=[]
        var d=['blue','red','yellow','pink']
        for(let i = 0 ;i<a.length;i++){
            var f= parseInt(d.length*Math.random()) 
            b.push(
                <span className='biaoqian_huyu' style={{backgroundColor:d[f]}} key={i}>{a[i]}</span>
            )
        }
        this.setState({div:b})
    }
    render(){
        return(
            <div>
                <Icon type="menu-fold" style={{paddingRight:'5px'}} />标签：
                {this.state.div}
            </div>
        )
    }
}