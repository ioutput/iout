import React from 'react'
import './index.less';
import { inject } from 'mobx-react'
import {Form, Icon, Input, Button,Message} from 'antd';
import {login} from '../../api/user';


@Form.create() @inject('appStore')
class Login extends React.Component{
	
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
			/* var formData = new FormData();
			formData.append('username',values.username);
			formData.append('password',values.password) */
	        login(values).then(res=>{
	        	if(res.status === 200){
					this.props.appStore.toggleLogin(true,res.data)
					this.props.appStore.setToken(res.data.token)
	        		this.props.history.push('/')
	        	}else{
					Message.error(res.data);
				}
	        })
	        
	      }
	    });
	  }
	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="container">
			    <div className="content">
			      <div className="top">
			        <div className="header">
			          <span className="title">
			            后台管理系统
			          </span>
			        </div>
			        <div className="desc">XXX有限公司</div>
			      </div>
			      <div className="login">
				<Form onSubmit={this.handleSubmit} className="login-form">
			        <Form.Item>
			          {getFieldDecorator('username', {initialValue:'admin',
			            rules: [{ required: true, message: '请输入账号!' }],
			          })(
			            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
			          )}
			        </Form.Item>
			        <Form.Item>
			          {getFieldDecorator('password', {initialValue:'123456',
			            rules: [{ required: true, message: '请输入密码!' }],
			          })(
			            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
			          )}
			        </Form.Item>
			        <Form.Item>
			          
			          <Button type="primary" htmlType="submit" className="login">
			            登录
			          </Button>
			          
			        </Form.Item>
		      </Form>
			  </div>
			 </div>
	    </div>
		)
	}
}
export default Login;
