import React from 'react';
import { Button,Form,Radio,Input,message,Select  } from 'antd';
import {view,update} from '../../api/user'
import {list} from '../../api/role'
const { Item } = Form;
const { Option } = Select;
@Form.create()
class Update extends React.Component {

	state={
		id:0,
		roles:[]
	}
	componentWillMount(){
		this.setState({id:this.props.match.params.id})
	}
	componentDidMount(){
		view(this.state.id).then(res=>{
			this.props.form.setFieldsValue(res)
		})
		list({page_size:100}).then(res=>{
			this.setState({roles:res.data})
		})
	}
	handleSubmit = (e) => {
    	e.preventDefault();
    	this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	values.id = this.state.id
	        update(values).then(res=>{
	        	message.success(res.msg)
	        })
	      }
	    })
    }
  	render() {
		const { getFieldDecorator } = this.props.form;
		const roles = this.state.roles
  		const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
    	return (
    		<div>
        		<Form {...formItemLayout} onSubmit={this.handleSubmit}>
			        <Item label="用户名">
			          {getFieldDecorator('username',{rules:[{required:true,message:'请输入用户名'}]})(
			            <Input allowClear placeholder="用户名" />
			          )}
			        </Item>
			        <Item label="状态">
			          {getFieldDecorator('status')(
			            <Radio.Group>
			              <Radio.Button value="1">启用</Radio.Button>
			              <Radio.Button value="0">禁用</Radio.Button>
			            </Radio.Group>
			          )}
			        </Item>
					<Item label="权限">
			          {getFieldDecorator('role_id')(
			            <Select>
							{
								roles.map(item=>{
									return <Option  value={item.id}>{item.name}</Option>
								})
							}
			              
			              
			            </Select >
			          )}
			        </Item>
			        <Item label="备注">
			          {getFieldDecorator('remark')(
			            <Input.TextArea rows={4} placeholder="请输入备注" />
			          )}
			        </Item>
			        <Item style={{textAlign:'center'}}>
			          <Button type="primary" htmlType="submit">保存</Button>
			        </Item>
			    </Form>
        	</div>
    	);
  	}
}

export default Update;