import React, { Component } from 'react';
import { inject } from 'mobx-react'
import {Route,Switch} from 'react-router-dom'
import Login from './views/login'
import Layout from './views/layout'

@inject('appStore')
class App extends Component {
	componentWillMount(){
		//防刷新页面初始化mobx数据
	    this.props.appStore.init()
	  }
  render() {
    return (
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route  path='/' component={Layout}/>
      </Switch>
      
    );
  }
}

export default App;
