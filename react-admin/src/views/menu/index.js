import React from 'react';
import { withRouter, Switch, Redirect,Route } from 'react-router-dom'
import List from './list'
import Update from './update'

@withRouter
class Menu extends React.Component {
  
  render() {
    
    return (
      <div>
        <Switch>
          <Route path='/menu/list' component={List}/>
          <Route path='/menu/update/:id' component={Update}/>
          <Redirect exact from='/menu' to='/menu/list'/>
        </Switch>
      </div>
    );
  }
}

export default Menu;
