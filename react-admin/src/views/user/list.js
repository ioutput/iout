import React from 'react';
import { Table,Button,Popconfirm,Icon,Form,Input,Select,Modal,message } from 'antd';
import {Link} from 'react-router-dom'
import {list,del} from '../../api/user'
import Create from './create'
const { Option } = Select;
const { Item } = Form;

@Form.create() 
class List extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			dataSource:[],
			showcreate:false,
			pagination:{
				current:1,
				pageSize:10,
				total:0,
				showTotal:(total)=>'共'+total+'条',
				pageSizeOptions:['10','20','30','40'],
				showQuickJumper:true,
            	showSizeChanger:true,
            	onShowSizeChange:(page,size)=>{this.handleChange(page,size)},
            	onChange:(page,size)=>{this.handleChange(page,size)},
			}
		}
	}
	componentDidMount(){

		this.list()
	}
	//获取列表
	async list(params){
		let current = {page:this.state.pagination.current,page_size:this.state.pagination.pageSize}
		let res = await list({...current,...params})
		this.setState({dataSource:res.data,pagination:{...this.state.pagination,total:res.total_count}})
		
	}
	/**跳转分页或分页数改变 */
	handleChange(page,size){
      this.setState({pagination:{...this.state.pagination,current:page,pageSize:size}})
      this.list({page:page,page_size:size})
    }
    async handDelete(id){
    	let res = await del(id)
		if(res.status ===200){
			message.success(res.msg)
			this.list()
		}else{
			message.error(res.msg)
		}
    			
    }
    handleSubmit = (e) => {
    	e.preventDefault();
    	this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	values.page = 1//跳回第一页
	        this.list(values)
	      }
	    })
    }
    setCreateState(status){
    	this.setState({showcreate:status})
    }
    showCreate (){
   
    	return (
    		<Modal
	          title="添加"
	          visible={this.state.showcreate}
	          footer={null}
	          onCancel={()=>this.setState({showcreate:false})}
	        >
	          	<Create setCreateState={status=>{this.setCreateState(status)}} list={()=>this.list()}/>
	        </Modal>
    	)
    }
  render() {
  	let {dataSource,pagination} = this.state
  	const { getFieldDecorator } = this.props.form;
  	let columns = [
		{ title: '序号', dataIndex: '',align:'center',render: (text, record,index) =>index+1 },
		{ title: '用户名', dataIndex: 'username',align:'center' },
		{ title: '状态', dataIndex: 'status_name',align:'center'},
		{
			title: '操作', dataIndex: '',align:'center', render: (text, record) => (<span><Link to={'/user/update/'+record._id}><Button type="primary">编辑</Button></Link>
			<Popconfirm title="您确定要删除吗" onConfirm={()=>this.handDelete(record._id)} okText="确定" cancelText="取消" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
				<Button type="danger">删除</Button></Popconfirm></span>)
		},
	];
    return (
    	<div>
    		{/*搜索*/}
    		<Form layout="inline" onSubmit={this.handleSubmit}>
		        <Item>
		          {getFieldDecorator('username')(
		            <Input allowClear placeholder="用户名" />
		          )}
		        </Item>
		        <Item>
		          {getFieldDecorator('status')(
		            <Select allowClear placeholder="状态" style={{width:'80px'}}>
		              <Option value="1">启用</Option>
		              <Option value="0">禁用</Option>
		            </Select>
		          )}
		        </Item>
		        <Item>
		          <Button type="primary" htmlType="submit">搜索</Button>
		        </Item>
		        <Item style={{marginRight:0}}>
		          <Button onClick={()=>{this.setCreateState(true)}}>添加</Button>
		        </Item>
		    </Form>
		    {/*表格*/}
        	<Table dataSource={dataSource} columns={columns}  rowKey={'id'} pagination={pagination} />
        	{/*模型*/}
        	{this.showCreate()}
        </div>
    );
  }
}
export default List;
