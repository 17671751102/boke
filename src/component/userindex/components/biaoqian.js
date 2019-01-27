import React from 'react';
import '@css/biaoqian.scss'
import {Icon} from 'antd'
export default function Biaoqian (props){
    var a = props.value.split(';')
    var b=[]
    var d=['blue','red','yellow','pink']
    for(let i = 0 ;i<a.length;i++){
        var f= parseInt(d.length*Math.random()) 
        b.push(
            <span className='biaoqian_huyu' style={{backgroundColor:d[f]}} key={i}>{a[i]}</span>
        )
    }
    return(
        <div style={{marginBottom:10}}>
            <Icon type="menu-fold" style={{paddingRight:'5px'}} />标签：
            {b}
        </div>
    )
}