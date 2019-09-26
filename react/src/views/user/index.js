import React from 'react';
import { Switch, Redirect,Route } from 'react-router-dom'
import List from './list'
import Update from './update'


class User extends React.Component {
  
  render() {
    
    return (
      <div>
        <Switch>
          <Route path='/user/list' component={List}/>
          <Route path='/user/update/:id' component={Update}/>
          <Redirect exact from='/user' to='/user/list'/>
        </Switch>
      </div>
    );
  }
}

export default User;


