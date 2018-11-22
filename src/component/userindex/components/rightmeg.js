import React from 'react';
import src from '@css/img/01.png'
class Rightmeg extends React.Component {
    render(){
        return(
            <div className="list_right">
                <div className="blogger">
                    <img src={src} className="blogger_pot"/>
                    <div className="blogger_meg">
                        <h3>富婆快乐团</h3>
                        <p>
                            这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这
                        </p>
                    </div>
                    <img src={src} alt=""/>
                    <img src={src} alt=""/>
                    <img src={src} alt=""/>
                    <div className="terrace">
                        <span>QQ</span>
                        <span>微信</span>
                        <span>微博</span>
                    </div>
                </div>
            </div>
        )
    }

}
export default Rightmeg