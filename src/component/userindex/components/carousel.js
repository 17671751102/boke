import React from 'react';
import { Carousel } from 'antd';
import '@css/carousel.scss';
import src1 from '@css/img/timg.jpg'
import src2 from '@css/img/timg1.jpg'
import src3 from '@css/img/timg (2).jpg'
class Carouseldiv extends React.Component{
    render(){
        return(
            <Carousel autoplay>
                <div> <img src={src1} style={{width:100+'%'}}/> </div>
                <div><img src={src2} style={{width:100+'%'}}/></div>
                <div><img src={src3} style={{width:100+'%'}}/></div>
            </Carousel>
        )
    }
}
export default Carouseldiv;