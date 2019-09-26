import React from 'react'
import { Badge, Dropdown, Menu,Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'

//withRouter一定要写在前面，不然路由变化不会反映到props中去
@withRouter @inject('appStore') @observer
class HeaderBar extends React.Component {
  state = {
    icon: 'arrows-alt',
    count: 100,
    avatar: require('../../logo.svg')
  }



  toggle = () => {
    this.props.onToggle()
  }

  logout = () => {
    this.props.appStore.toggleLogin(false)
    this.props.history.push(this.props.location.pathname)
  }

  render () {
    const { count, avatar} = this.state
    const {appStore, collapsed} = this.props;
    const notLogin = (
      <div>
        <Link to={{pathname: '/login'}} style={{color: 'rgba(0, 0, 0, 0.65)'}}>登录</Link>&nbsp;
        <Icon type="smile" theme="twoTone" />
      </div>
    )
    const menu = (
      <Menu className='menu'>
        {/* <Menu.ItemGroup title='用户中心' className='menu-group'> */}
          <Menu.Item>账号：{appStore.userinfo.username}</Menu.Item>
          <Menu.Item>个人信息</Menu.Item>
          <Menu.Item><span onClick={this.logout}>退出登录</span></Menu.Item>
        {/* </Menu.ItemGroup> */}
      </Menu>
    )
    const login = (
      <Dropdown overlay={menu}>
        <img onClick={() => this.setState({visible: true})} src={avatar} alt=""/>
      </Dropdown>
    )
    return (
      <div id='headerbar'>
        <Icon
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          className='trigger'
          onClick={this.toggle}/>
        <div style={{lineHeight: '64px', float: 'right'}}>
          <ul className='header-ul'>

            <li onClick={() => this.setState({count: 0})}>
              <Badge count={appStore.isLogin ? count : 0} overflowCount={99} style={{marginRight: -17}}>
                <Icon type="notification"/>
              </Badge>
            </li>
            <li>
              {appStore.isLogin ? login : notLogin}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default HeaderBar