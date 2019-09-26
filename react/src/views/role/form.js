import React from 'react';
import { Button,Form,Radio,Input } from 'antd';
import { view } from '../../api/role'
const { Item } = Form;

@Form.create()
class Forms extends React.Component {

	
	componentDidMount(){
		if(this.props.id){
			view(this.props.id).then(res=>{
				res.status = String(res.status)
				this.props.form.setFieldsValue(res)
			})
		}
		
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
    	return (
    		<div>
        		<Form {...formItemLayout} onSubmit={this.handleSubmit}>
			        <Item label="名称">
			          {getFieldDecorator('name',{rules:[{required:true,message:'请输入名称'}]})(
			            <Input allowClear placeholder="名称" />
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