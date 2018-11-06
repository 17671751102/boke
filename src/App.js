import React, { Component } from 'react';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import axios from 'axios'
import Notfound from './404'
import LoginForm from '@js/admin/login'
import Adminedit from '@js/admin/admin_edit'
import Index from '@js/userindex/index'
// 自定义路由组件
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      sessionStorage.getItem('logtoken')?(
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/admin_login/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
class App extends Component {
  // componentDidMount(){
  //   console.log(1)
  //   axios.post('http://192.168.40.180:51666/con/index.php/Index/index/leak_do_list')
  //   .then(function(json){
  //     console.log(json)
  //   })
  // }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/:type' component={Index} />
          <Route exact path='/' component={Index} />
          <Route path='/admin_login/' component={LoginForm} />
          <Route path='/admin_edit/' component={Adminedit} />
          {/* <PrivateRoute path='/admin_edit/' component={Adminedit}/> */}
          <Route component={Notfound}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
