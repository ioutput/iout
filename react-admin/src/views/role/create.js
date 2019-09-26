import React from 'react';
import { message } from 'antd';
import {create} from '../../api/role'
import Forms from './form'

class Create extends React.Component {

	submit = async (data) => {
	        let res = await create(data);
			if(res.status ===200){
				message.success(res.msg)
				this.props.setCreateState(false)
				this.props.list()
			}else{
				message.error(res.msg)
			}
    }
  	render() {
    	return (
    		<div>
    			<Forms  submit={param=>{this.submit(param)}} />
        		
        	</div>
    	);
  	}
}

export default Create;