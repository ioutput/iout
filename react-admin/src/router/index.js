import React from 'react';
import { inject } from 'mobx-react'
import { Switch, Redirect,Route } from 'react-router-dom'
import Index from '../views/index'
import User from '../views/user'
import Munu from '../views/menu'
import Role from '../views/role'
import Log from '../views/log'

 @inject('appStore')
class Router extends React.Component {
  componentDidMount(){
    if(!this.props.appStore.isLogin){
      window.location.href = "/login"
    }
  }
  render() {
    
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Index}/>
          <Route path='/user' component={User}/>
          <Route path='/menu' component={Munu}/>
          <Route path='/role' component={Role}/>
          <Route path='/log' component={Log}/>
          <Redirect exact from='/' to='/'/>
        </Switch>
      </div>
    );
  }
}

export default Router;
