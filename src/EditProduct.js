import React from 'react';
import {userData} from './common.js';
class EditProduct extends React.Component{

	constructor(props){
		super(props);
		localStorage.setItem('userData', JSON.stringify(userData))

		this.state={
			userData:JSON.parse(localStorage.getItem('userData')),
			newUser:{id:null,
				     name:'',
				     batch:'',
				     pqunty:0,
				     },
			editable:false,
		}
	}
//==================================================================================================
	handleChange=event=>{    //inputbox

		let newuser=this.state.newUser
		let id = JSON.parse(localStorage.getItem('userData'))
		newuser['id']= this.state.editable ? newuser['id']: 
		id.length+1;
		//const{name,value}=event.target;
		//newuser[name]=value
		newuser[event.target.name]=event.target.value
	}
//===================================================================================================
	handleSubmit=event=>{                     //form onsubmit click
		event.preventDefault();
		
		let newuser=this.state.newUser;

		if((newuser['name']||newuser['batch']||newuser['pqunty'])==='')
		{
			return
		}
			if(this.state.editable){
				console.log(newuser)
				let alluser=this.state.userData
				this.setState({
					userData:alluser
					},()=>console.log(userData))
			}else{
				this.setState({
					userData:[...this.state.userData,this.state.newUser],
					newUser: {id:null,
									 name:'',
									 batch:'',
									 pqunty:0,
									 }
				}, () => 
				localStorage.setItem('userData', JSON.stringify(
					this.state.userData))
				)
			}

				}
//===================================================================================================
	handleClick=(e,currentUser)=>{     //edit operation

		this.setState({
			newUser:currentUser,
			editable:true,
		})
	}

//======================================================================================================
	handleDelete=(e,id)=>{                           //delete record
		let users = this.state.userData
		let userData = users.filter(user => user['id'] !== id)
		this.setState({
			userData
		})
		
	}
//============================================================================================
handleProduct=(e,id)=>{
	let userData = this.state.userData
	userData.filter((item) => 
		{
			if (item.id == id) {
				item.pqunty = item.pqunty + 1

			}
		}
	)
	this.setState({
		userData
	})
	localStorage.setItem('userData', JSON.stringify(userData))
}
//=============================================================================
render(){
			console.log(this.state.userData)
		  	const{editable,newUser,userData}=this.state
			return(
					<div>
						<form onSubmit={this.handleSubmit}>
							<label>Name:</label>
							<input name="name" onChange={this.handleChange} 
							defaultValue={newUser.name}/><br/>
							
							<label>Batch:</label>
							<input name="batch" onChange={this.handleChange}
							 defaultValue={newUser.batch}/><br/>
							
							<label>Quantity:</label>
							<input name="pqunty" onChange={this.handleChange} 
							defaultValue={newUser.pqunty}/><br/>

							<div>
								{editable?
								<button>Update data</button>:
							    <button onClick={this.handleSubmit}>Add data</button>
							 		}
						 	</div>
						</form>
	<table style={{ border: '1px solid black', marginLeft: '10%'}} >
	<thead>
		<tr>
			<th>ID</th>
			<th>NAME</th>
			<th>Batch</th>
			<th>Quantity</th>
			<th>ACTIONS</th>
		</tr>
	</thead>

	<tbody>
			{userData.map((item,index)=>
			(
			  <tr key={item.id}>
			  <td>{item.id}</td>
			  <td>{item.name}</td>
			  <td>{item.batch}</td>
			 <td>{item.pqunty}</td>
			 <td><button onClick={(e,currentUser)=>this.handleClick(e,item)}>Edit</button></td>
			 
			 <td><button onClick={(e,id)=>this.handleDelete(e,item.id)}>Delete</button></td>
			  <td><button onClick={(e,id)=>this.handleProduct(e,item.id)}>ADD Quantity</button></td>
			  </tr>
		)	
		)}
	</tbody>
	</table>

				</div>
				)
		}
	}
export default EditProduct;