import React from 'react';
import { NavLink,Link} from 'react-router-dom';
import $ from 'jquery'
import './water.css'
import WaterRippleEffect from './WaterRippleEffect'
class Water extends React.Component {
    componentDidMount(){
        document.getElementsByTagName( 'body' )[0].addEventListener( 'click', function( e ) {
            console.log(1)
        })
    }
    init(){
        var winw=document.body.offsetWidth
        var winh=document.body.offsetHeight
        //Settings - params for WaterRippleEffect
        var settings = {
            image: '',//image path
            rippleRadius: 3,//radius of the ripple
            width: winw,//width
            height: winh,//height
            delay: 1,//if auto param === true. 1 === 1 second delay for animation
            auto: true//if auto param === true, animation starts on it´s own
        };
        //init
        var waterRippleEffect = this.WaterRippleEffect( document.getElementsByTagName( 'waterbg' )[0], settings );
        document.getElementsByTagName( 'body' )[0].style.cursor = 'pointer';
        //on click
        document.getElementsByTagName( 'body' )[0].addEventListener( 'click', function( e ) {
            var mouseX = e.clientX;
            var mouseY = e.clientY;
            waterRippleEffect.disturb( mouseX, mouseY );
        } );
        //on mousemove
        document.getElementsByTagName( 'body' )[0].addEventListener( 'mousemove', function( e ) {
            var mouseX = e.clientX;
            var mouseY = e.clientY;
            waterRippleEffect.disturb( mouseX, mouseY );
        } );
    }
    render(){
        return(
            <div className="waterbg">

            </div>
        )
    }

}
export default Water