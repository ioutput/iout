import React from 'react';
import { Table,Button,Form,Select,DatePicker} from 'antd';
import { list } from '../../api/log'
import { list as listUser } from '../../api/user'
const { Option } = Select;
const { Item } = Form;
const { RangePicker } = DatePicker;
@Form.create()
class List extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			dataSource:[],
			users:[],
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
		listUser({page_size:100}).then(res=>{
			this.setState({users:res.data})
		})
		this.list()
	}
	//获取列表
	async list(params){
		let current = {page:this.state.pagination.current,page_size:this.state.pagination.pageSize}
		let res = await list({...current,...params})
		this.setState({dataSource:res.data,pagination:{...this.state.pagination,total:res.total_count}})
		
	}
	//跳转分页或分页数改变
	handleChange(page,size){
      this.setState({pagination:{...this.state.pagination,current:page,pageSize:size}})
      this.list({page:page,page_size:size})
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
    
  render() {
  	let {dataSource,pagination,users} = this.state
  	const { getFieldDecorator } = this.props.form;
  	let columns = [
	  { title: '序号', dataIndex: '',align:'center' ,render: (text, record,index) =>index+1},
	  { title: '操作人', dataIndex: 'username',align:'center' },
	  { title: 'IP', dataIndex: 'ip',align:'center' },
	  { title: '操作', dataIndex: 'operation',align:'center' },
	  
	];
    return (
    	<div>
    		{/*搜索*/}
    		<Form layout="inline" onSubmit={this.handleSubmit}>
		        <Item>
		          {getFieldDecorator('user_id')(
		            <Select allowClear showSearch optionFilterProp="children" placeholder="操作人" style={{width:'80px'}}>
		              {users?users.map(v=>(<Option key={v.id} value={v.id}>{v.username}</Option>)
		              ):''}
		              
		            </Select>
		          )}
		        </Item>
		        <Item>
		        	{getFieldDecorator('created_at')(
		        	<RangePicker
				      
				      showTime
				      format="YYYY/MM/DD HH:mm:ss"
				      
				    />
				    )}
		        </Item>
		        <Item>
		          <Button type="primary" htmlType="submit">搜索</Button>
		        </Item>
		    </Form>
		    {/*表格*/}
        	<Table dataSource={dataSource} columns={columns}  rowKey={'_id'} pagination={pagination} />
        </div>
    );
  }
}
export default List;
