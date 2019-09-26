import React from 'react'
import {Layout} from 'antd'
import SiderNav from '../../components/layout/left'
import Router from '../../router'
import HeaderBar from '../../components/layout/header'

const {Sider, Header, Content, Footer} = Layout


class Index extends React.Component{
  state = {
    collapsed: false
  }

  toggle = () => {
    // console.log(this)  状态提升后，到底是谁调用的它
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    // 设置Sider的minHeight可以使左右自适应对齐
    const collapsed = this.state.collapsed
    return (
      <div id='page'>
        <Layout>
          <Sider collapsible
                 trigger={null}
                 collapsed={collapsed}
                  style={{background:'#fff'}}
                 >
            <SiderNav/>
          </Sider>
          <Layout>
            <Header style={{background: '#fff', padding: '0 16px'}}>
              <HeaderBar collapsed={collapsed} onToggle={this.toggle}/>
            </Header>
            <Content>
              <Router/>
            </Content>
            <Footer style={{textAlign: 'center'}}>React-Admin ©2018 Created by 935436445@qq.com <a target='_blank' rel="noopener noreferrer" href='https://github.com/ioutput/react-admin'>github地址</a></Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default Index