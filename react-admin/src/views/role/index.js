import React from 'react';
import { withRouter, Switch, Redirect,Route } from 'react-router-dom'
import List from './list'
import Update from './update'

@withRouter
class Role extends React.Component {
  
  render() {
    
    return (
      <div>
        <Switch>
          <Route path='/role/list' component={List}/>
          <Route path='/role/update/:id' component={Update}/>
          <Redirect exact from='/role' to='/role/list'/>
        </Switch>
      </div>
    );
  }
}

export default Role;
