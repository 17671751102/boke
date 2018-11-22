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
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path='/admin_edit/' component={Adminedit}/>
          <Route path='/admin_login/' component={LoginForm} />
          <Route path='/' component={Index} />
          <Route component={Notfound}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
