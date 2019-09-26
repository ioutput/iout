import React from 'react';
import { message } from 'antd';
import { update } from '../../api/role'
import Forms from './form'

class Update extends React.Component {

	state={
		id:0,
	}
	componentWillMount(){
		this.setState({id:this.props.match.params.id})
	}
	submit = async (data) => {
	      	data.id = this.state.id
	        let res = await update(data)
	        message.success(res.msg)
	        
    }
  	render() {
  		const { id } = this.state;
    	return (
    		<div>
    			<Forms id={id} submit={param=>{this.submit(param)}} />
        		
        	</div>
    	);
  	}
}

export default Update;