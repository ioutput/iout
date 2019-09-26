import React from 'react';
import { Button,Form,Radio,Input,InputNumber,TreeSelect  } from 'antd';
import { view,levelmenu } from '../../api/menu'
const { Item } = Form;

@Form.create()
class Forms extends React.Component {
	state={
		menus:[]
	}
	
	componentDidMount(){
		if(this.props.id){
			view(this.props.id).then(res=>{
				this.props.form.setFieldsValue(res)
			})
		}
		levelmenu().then(res=>{
			this.setState({menus:res})
		})
	}
	handleSubmit = (e) => {
    	e.preventDefault();
    	this.props.form.validateFields((err, values) => {
	      if (!err) {
	        this.props.submit(values)
	      }
	    })
    }
  	render() {
  		const { getFieldDecorator } = this.props.form;
  		const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
		};
		let menus = this.state.menus
    	return (
    		<div>
        		<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<Item label="上级菜单">
			          {getFieldDecorator('pid',{rules:[{required:true,message:'请选择上级菜单'}]})(
			            <TreeSelect
							style={{ width: 300 }}
							dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
							treeData={menus}
							placeholder="Please select"
							treeDefaultExpandAll
						/>
			          )}
			        </Item>
			        <Item label="菜单名称">
			          {getFieldDecorator('name',{rules:[{required:true,message:'请输入菜单名称'}]})(
			            <Input allowClear placeholder="菜单名称" />
			          )}
			        </Item>
			        <Item label="路由">
			          {getFieldDecorator('url',{rules:[{required:true,message:'请输入路由'}]})(
			            <Input allowClear placeholder="路由" />
			          )}
			        </Item>
			        <Item label="状态">
			          {getFieldDecorator('status',{initialValue:'1'})(
			            <Radio.Group>
			              <Radio.Button value="1">启用</Radio.Button>
			              <Radio.Button value="0">禁用</Radio.Button>
			            </Radio.Group>
			          )}
			        </Item>
			        <Item label="是否菜单">
			          {getFieldDecorator('is_menu',{initialValue:'1'})(
			            <Radio.Group>
			              <Radio.Button value="1">是</Radio.Button>
			              <Radio.Button value="0">否</Radio.Button>
			            </Radio.Group>
			          )}
			        </Item>
					<Item label="排序">
			          {getFieldDecorator('sort',{initialValue:999})(
			            <InputNumber min={1} max={999}  />
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

export default Forms;