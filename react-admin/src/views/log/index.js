import React from 'react';
import { withRouter, Switch, Redirect,Route } from 'react-router-dom'
import List from './list'

@withRouter
class Log extends React.Component {
  
  render() {
    
    return (
      <div>
        <Switch>
          <Route path='/log/list' component={List}/>
          <Redirect exact from='/log' to='/log/list'/>
        </Switch>
      </div>
    );
  }
}

export default Log;

